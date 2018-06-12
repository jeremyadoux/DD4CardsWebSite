import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table-pagination',
  templateUrl: 'table-pagination.component.html',
  styleUrls: ['table-pagination.component.css']
})
export class TablePaginationComponent implements OnInit {
  @Input()
    formQuery: FormGroup;


  @Output()
    paginationChange: EventEmitter<any> = new EventEmitter<any>();


  //temporary here but need a real service
  pagination: number[];

  ngOnInit(): void {
    (<FormGroup>this.formQuery.controls['page']).get('limit').valueChanges.subscribe(val => {
      this.setCurrentPage(1);
    });

    (<FormGroup>this.formQuery.controls['page']).get('count').valueChanges.subscribe(val => {
      this.paginate();
    });

    (<FormGroup>this.formQuery.controls['page']).get('num').valueChanges.subscribe(val => {
      this.paginate();
    });
  }

  paginate() {
    let valuePage = {...this.formQuery.getRawValue().page};
    let total = valuePage.count;
    let pageLimit = valuePage.limit;

    let current = valuePage.num,
      last = Math.ceil(total / pageLimit),
      delta = 2,
      left = current - delta,
      right = current + delta + 1,
      range = [],
      rangeWithDots = [],
      l;

    for (let i = 1; i <= last; i++) {
      if (i >= left && i < right) {
        range.push(i);
      }
    }

    this.pagination = range;
  }

  setCurrentPage(num:number) {
    let valuePage = {...this.formQuery.getRawValue().page};
    let total = valuePage.count;
    let pageLimit = valuePage.limit;
    let last = Math.ceil(total / pageLimit);


    if(num > last) {
      num = last;
    }

    if(num < 1) {
      num = 1;
    }

    (<FormGroup>this.formQuery.controls['page']).controls['num'].setValue(num);
  }
}
