import { Component, OnInit } from '@angular/core';
import { GroupPowerApi } from '../../../../shared/sdk/services/custom';
import { environment } from '../../../../../environments/environment';
import { LoopBackConfig } from '../../../../shared/sdk';
import { GroupPower, Power } from '../../../../shared/sdk/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterClass } from '../../../../classes/filter.class';

@Component({
  templateUrl: 'power-group-list.component.html'
})
export class PowerGroupListComponent implements OnInit {
  groups: GroupPower[];
  formQuery: FormGroup;

  constructor(
    private groupPowerApi: GroupPowerApi,
    private fb: FormBuilder
  ) {
    LoopBackConfig.setBaseURL(environment.api.url);
    LoopBackConfig.setApiVersion(environment.api.version);

    this.formQuery = this.fb.group({
      where: this.fb.group({
        name: ['']
      }),
      order: this.fb.group({
        field: ['name'],
        direction: ['ASC']
      }),
      page: this.fb.group({
        limit: [10],
        num: [1],
        count: []
      }),
    });
  }

  ngOnInit(): void {
    this.search();
    this.searchCount();

    this.formChangeInit();
  }

  formChangeInit(): void {
    this.formQuery.get('where').valueChanges.subscribe(val => {
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
    this.groupPowerApi.find(this.prepareQueryFromForm()).subscribe((groups: GroupPower[]) => {
      this.groups = groups;
    }, (err: any) => {
    });
  }

  searchCount() {
    this.groupPowerApi.count(this.prepareQueryFromForm().where).subscribe((data: any) => {
      (<FormGroup>this.formQuery.controls['page']).controls['count'].setValue(data.count);
    }, (err: any) => {

    });
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
}
