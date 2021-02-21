import { Router, ActivatedRoute } from '@angular/router';
import { ProductTypeModel } from './../../../models/product-type';
import { ProductService } from './../../../services/product.service';
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
  @Input() productType: ProductTypeModel;
  @Input() isEdit = false;
  form: FormGroup;

  subRoute!: any;
  payLoad = 'Verifique que todo este correcto';
  idProduct!: string;


  constructor(
    private route: ActivatedRoute,
    public service: ProductService,
    private formfieldService: FormfieldControlService) { }

  save(): void{
    const values  = this.form.getRawValue();
    this.service.mutationSave(this.productType.name, this.productType.fieldsName,  this.objToString(values));
  }

  edit(): void{
    const values  = this.form.getRawValue();
    this.service.mutationSave(this.productType.name, this.productType.fieldsName,  this.objToString(values));
  }

  objToString (obj) {
    let str = '';
    if (typeof obj === 'object'){
      for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + ':' + this.objToString (obj[p]) + ', ';
        }
      }
    }else{
      if (typeof obj === 'string'){return '"' + obj + '"'; }
      else{return obj + ''; }
    }
    return str.substring(0, str.length - 1) + '';
  }

  onSubmit(): void {
    console.log(this.form.getRawValue());
    this.save();
  }

  ngOnInit(): void {
    this.form = this.formfieldService.toFormGroup(this.formFields);

  }


}
