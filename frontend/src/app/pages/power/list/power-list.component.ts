import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Power } from '../../../shared/sdk/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PowerApi } from '../../../shared/sdk/services/custom';
import { FilterClass } from '../../../classes/filter.class';
import { environment } from '../../../../environments/environment';
import { LoopBackConfig } from '../../../shared/sdk';

@Component({
  templateUrl: 'power-list.component.html',
  styleUrls: ['power-list.component.scss'],
  selector: 'app-power-list'
})
export class PowerListComponent implements OnInit {
  @Input()
    isAddedMode = false;
  @Output()
    addedAction: EventEmitter<Power> = new EventEmitter<Power>();


  powers: Power[];
  formQuery: FormGroup;


  groupByField = {
    originType: [],
    originName: []
  };

  constructor(
    private powerApi: PowerApi,
    private fb: FormBuilder
  ) {
    LoopBackConfig.setBaseURL(environment.api.url);
    LoopBackConfig.setApiVersion(environment.api.version);

    this.formQuery = this.fb.group({
      where: this.fb.group({
        name: [''],
        level: [''],
        originType: [''],
        originName: [''],
        text: ['']
      }),
      order: this.fb.group({
        field: ['level'],
        direction: ['ASC']
      }),
      page: this.fb.group({
        limit: [10],
        num: [1],
        count: []
      }),
    });
  }

  ngOnInit() {
    this.search();
    this.searchCount();

    this.initTransversalData();

    this.formChangeInit();
  }

  formChangeInit(): void {
    this.formQuery.get('where').valueChanges.debounceTime(500).subscribe(val => {
      (<FormGroup>this.formQuery.controls['page']).controls['num'].setValue(1);
      this.search();
      this.searchCount();
    });

    (<FormGroup>this.formQuery.controls['page']).get('limit').valueChanges.subscribe(val => {
      this.search();
    });

    (<FormGroup>this.formQuery.controls['page']).get('num').valueChanges.subscribe(val => {
      this.search();
    });
  }

  search() {
    this.powerApi.find(this.prepareQueryFromForm()).subscribe((powers: Power[]) => {
      this.powers = powers;
    }, (err: any) => {
    });
  }

  searchCount() {
    this.powerApi.count(this.prepareQueryFromForm().where).subscribe((data: any) => {
      (<FormGroup>this.formQuery.controls['page']).controls['count'].setValue(data.count);
    }, (err: any) => {

    });
  }

  initTransversalData() {
    this.powerApi.groupBy({"groupBy": "originType"}).subscribe((data: any[]) => {
      this.groupByField.originType = [];
      for(let val of data) {
        this.groupByField.originType.push(val.originType);
      }
    });

    this.powerApi.groupBy({"groupBy": "originName"}).subscribe((data: any[]) => {
      this.groupByField.originName = [];
      for(let val of data) {
        this.groupByField.originName.push(val.originName);
      }
    })
  }

  private reducePrepareDataWhere(action, value) {
    switch(action) {
      case 'name':
        return { like: value, options: 'i' };
      default :
        return value;
    }
  }

  private prepareQueryFromForm() {
    let values = {...this.formQuery.getRawValue()};
    let objQuery:FilterClass = new FilterClass();

    //Add where and ignore all field null or ''
    objQuery.where = Object.keys(values.where).reduce(function(r, e) {
      if (values.where[e] != '') {
        r[e] = values.where[e];
      }
      return r;
    }, {});

    for(let key in objQuery.where ) {
      if(objQuery.where.hasOwnProperty(key)) {
        objQuery.where[key] = this.reducePrepareDataWhere(key,objQuery.where[key]);
      }
    }

    //Calcul skip from page
    objQuery.limit = values.page.limit;
    objQuery.skip = (values.page.num - 1) * values.page.limit;

    //Calcul Order from direction and field
    objQuery.order = values.order.field+' '+values.order.direction;

    //Add relation
    objQuery.include = [];

    return objQuery;
  }

  addToOutput(power: Power) {
    this.addedAction.emit(power);
  }
}
