import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from "../../shared/shared.module";

import { HomeComponent } from "./home.component";
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import {HomeLoginComponent} from "./login/home-login.component";
import {AuthGuard} from "../../guard/auth.guard";

const HOME_ROUTE = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: HomeLoginComponent}
];

@NgModule({
  declarations: [
    HomeComponent,
    HomeLoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    RouterModule.forChild(HOME_ROUTE),
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ]
})

export class HomeModule {
}
