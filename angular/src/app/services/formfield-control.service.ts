import { FormField } from './../components/dynamic/model/form-field';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { of } from 'rxjs';
//import { FormField } from '../components/dynamic/model/form-field';



@Injectable({
  providedIn: 'root'
})
export class FormfieldControlService {

  constructor() { }

  toFormGroup(inputs: FormField<string>[]): FormGroup {
    const group: any = {};
    inputs.forEach(input => {
      const validator: ValidatorFn[] = input.required ? [Validators.required] : [];
      switch (input.validator) {
        case 'email':
          validator.push(Validators.email);
          break;
        default:
          break;
      }
      group[input.key] = validator.length > 0 ? new FormControl(input.value || '', validator)
                              : new FormControl(input.value || '');
    });

    return new FormGroup(group);
  }

  getFormFields(objList) {

    let listTest = [{

      controlType: 'textbox',
      key: 'name',
      label: 'Insert the title',
      required: true,
      order: 1
    },{

      controlType: 'textbox',
      key: 'asfasdf',
      label: 'Condition of the place',
      required: true,
      order: 2
    },{

      controlType: 'textbox',
      key: 'condition',
      label: 'Condition of the place',
      required: true,
      order: 2
    },{

        controlType: 'textbox',
        key: 'asfa',
        label: 'Insert the title',
        required: true,
        order: 1
      }];

    const inputs: FormField<string>[] = objList.map(obj => new FormField<string>(obj));
    return of(inputs.sort((a, b) => a.order - b.order));
  }





}
