import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormfieldControlService } from 'src/app/services/formfield-control.service';
import { FormField } from '../model/form-field';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() formFields: FormField<string>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private formfieldService: FormfieldControlService) { }

  ngOnInit(): void {
    this.form = this.formfieldService.toFormGroup(this.formFields);
  }

  onSubmit(): void {
    this.payLoad = JSON.stringify(this.form.getRawValue());
  }

}
