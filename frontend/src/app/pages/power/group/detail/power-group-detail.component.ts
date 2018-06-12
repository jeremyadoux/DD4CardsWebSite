import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { LoopBackConfig } from '../../../../shared/sdk';
import { GroupPowerApi } from '../../../../shared/sdk/services/custom';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GroupPower, Power } from '../../../../shared/sdk/models';

@Component({
  templateUrl: 'power-group-detail.component.html',
  styleUrls: ['power-group-detail.component.scss']
})
export class PowerGroupDetailComponent implements OnInit {
  groupPower: GroupPower = new GroupPower();

  constructor(
    private groupPowerApi: GroupPowerApi,
    private route: ActivatedRoute,
    private router: Router
  ) {
    LoopBackConfig.setBaseURL(environment.api.url);
    LoopBackConfig.setApiVersion(environment.api.version);

    this.groupPower.powers = [];
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.groupPowerApi.findById(params.get('id'), {include: ['powers']});
        }
        return [];
      })
      .subscribe((groupPower: GroupPower) => {
        this.groupPower = groupPower;
      });
  }

  reloadGroupPower() {
    this.groupPowerApi.findById(this.groupPower.id, {include: ['powers']}).subscribe((groupPower: GroupPower) => {
      this.groupPower = groupPower;
    });
  }

  addPowerToGroup(power: Power){
    this.groupPowerApi.linkPowers(this.groupPower.id, power.id).subscribe((data: any) => {
      this.reloadGroupPower();
    });
  }

  removeToGroup(power: Power) {
    this.groupPowerApi.unlinkPowers(this.groupPower.id, power.id).subscribe( (data: any ) => {
      this.reloadGroupPower();
    })
  }
}
