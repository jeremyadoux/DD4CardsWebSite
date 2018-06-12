import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupPowerApi } from '../../../../shared/sdk/services/custom';
import { environment } from '../../../../../environments/environment';
import { LoopBackConfig } from '../../../../shared/sdk';
import { GroupPower } from '../../../../shared/sdk/models';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'power-group-form.component.html'
})
export class PowerGroupFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private groupPowerApi: GroupPowerApi,
    private router: Router
  ) {
    LoopBackConfig.setBaseURL(environment.api.url);
    LoopBackConfig.setApiVersion(environment.api.version);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  submitForm(form): void {
    //validations
    form.updateValueAndValidity();

    if (form.invalid) {
      Object.keys(form.controls).forEach(key => {
        form.get(key).markAsDirty();
      });
      return;
    }

    this.groupPowerApi.create(form.value).subscribe((data: GroupPower) => {
      this.router.navigate(['power/groups']);
    })
  }
}
