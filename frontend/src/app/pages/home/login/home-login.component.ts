import {Component, OnInit} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {LoopBackConfig, UserApi} from "../../../shared/sdk";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  templateUrl: "home-login.component.html"
})
export class HomeLoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userApi: UserApi,
    private router: Router
  ) {
    LoopBackConfig.setBaseURL(environment.api.url);
    LoopBackConfig.setApiVersion(environment.api.version);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
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

    //Logged user in
    this.userApi.login(form.value).subscribe((token: any) => {
      this.router.navigate(['home']);
    })
  }
}
