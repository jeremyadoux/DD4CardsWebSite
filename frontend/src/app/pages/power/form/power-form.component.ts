import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PowerApi } from '../../../shared/sdk/services/custom';
import { environment } from '../../../../environments/environment';
import { LoopBackConfig } from '../../../shared/sdk';
import { Power } from '../../../shared/sdk/models';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  templateUrl: 'power-form.component.html',
  styleUrls: ['power-form.component.scss']
})
export class PowerFormComponent implements OnInit {
  power: Power;
  form: FormGroup;
  formOptions = {
    originName: [],
    originType: [],
    frequency: [],
    typeAction: [],
    typeAttaque: [],
    scope: []
  };
  formOptionsBook = {
    name: []
  };
  formShowSelect = {
    originName: true,
    originType: true,
    frequency: true,
    typeAction: true,
    typeAttaque: true,
    scope: true,
    book: {
      name: true
    }
  };

  constructor(
    private fb: FormBuilder,
    private powerApi: PowerApi,
    private route: ActivatedRoute,
    private router: Router
  ) {
    LoopBackConfig.setBaseURL(environment.api.url);
    LoopBackConfig.setApiVersion(environment.api.version);

    this.initOptionsLoad();
    this.initOptionsBookLoad();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      textType: ['', Validators.required],
      originName: ['', Validators.required],
      originType: ['', Validators.required],
      level: [''],
      description: [''],
      type: [''],
      frequency: [''],
      keywordsStr: [''],
      typeAction: [''],
      typeAttaque: [''],
      scope: [''],
      text: [''],
      book: this.fb.group({
        name: [''],
        page: ['']
      })
    });

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.get('id')) {
          return this.powerApi.findById(params.get('id'));
        }
        return [];
      })
      .subscribe((power: Power) => {
        this.power = power;
        this.form.patchValue(this.power);

        this.form.patchValue({keywordsStr: this.power.keywords.join(',')});
      });
  }

  initOptionsLoad(): void {
    for (let key in this.formOptions) {
      let field = key;
      this.powerApi.groupBy({groupBy: key}).subscribe((data: any) => {
        for (let result of data) {
          this.formOptions[field].push(result[field]);
        }
      });
    }
  }

  initOptionsBookLoad(): void {
    for (let key in this.formOptionsBook) {
      let field = key;
      this.powerApi.groupBy({groupBy: 'book.'+key}).subscribe((data: any) => {
        for (let result of data) {
          this.formOptionsBook[field].push(result.book[field]);
        }
      });
    }
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

    if(!this.power) {
      let power = new Power(form.value);
      if(form.value.keywordsStr) {
        power.keywords = form.value.keywordsStr.split(',');
      } else {
        power.keywords = [];
      }

      this.powerApi.create(power).subscribe((data: Power) => {
        this.router.navigate(['power/list']);
      });
    } else {
      let obj = form.value;
      if(form.value.keywordsStr) {
        obj.keywords = form.value.keywordsStr.split(',');
      } else {
        obj.keywords = [];
      }
      delete obj.keywordsStr;

      this.powerApi.patchAttributes(this.power.id, obj).subscribe((data: Power) => {
        this.router.navigate(['power/list']);
      });
    }
  }
}
