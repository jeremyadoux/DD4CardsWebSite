import { Component, OnInit, TemplateRef } from '@angular/core';
import { LoopBackConfig } from '../../shared/sdk';
import { environment } from '../../../environments/environment';
import { PowerApi } from '../../shared/sdk/services/custom';
import { Power } from '../../shared/sdk/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterClass } from '../../classes/filter.class';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  constructor(
  ) {
  }
}
