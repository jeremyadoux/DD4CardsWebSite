import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PowerFormComponent } from './form/power-form.component';
import { PowerGroupFormComponent } from './group/form/power-group-form.component';
import { PowerGroupListComponent } from './group/list/power-group-list.component';
import { PowerListComponent } from './list/power-list.component';
import { PowerListPageComponent } from './list/page/power-list-page.component';
import { PowerGroupDetailComponent } from './group/detail/power-group-detail.component';

const ROUTE = [
  {path: '', component: PowerListPageComponent},
  {path: 'list', component: PowerListPageComponent},
  {path: 'create', component: PowerFormComponent},
  {path: 'edit/:id', component: PowerFormComponent},
  {path: 'groups', component: PowerGroupListComponent},
  {path: 'group/create', component: PowerGroupFormComponent},
  {path: 'group/edit/:id', component: PowerGroupFormComponent},
  {path: 'group/:id', component: PowerGroupDetailComponent}

];

@NgModule({
  declarations: [
    PowerFormComponent,
    PowerGroupFormComponent,
    PowerGroupListComponent,
    PowerListComponent,
    PowerListPageComponent,
    PowerGroupDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    RouterModule.forChild(ROUTE),
    ReactiveFormsModule
  ]
})
export class PowerModule {

}
