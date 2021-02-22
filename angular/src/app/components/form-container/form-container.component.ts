import { FormField } from './../dynamic/model/form-field';
import { ProductTypeModel } from './../../models/product-type';
import { Apollo } from 'apollo-angular';
import { ProductService } from './../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormfieldControlService } from 'src/app/services/formfield-control.service';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit, OnDestroy {

  listProductType!: ProductTypeModel[];
  typeProductName!: string;
  typeProductObj: ProductTypeModel;
  idProduct!: string;
  isEdit = false;

  formFields: Observable<FormField<any>[]>;

  subRoute!: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private serviceP: ProductService,
    private formService: FormfieldControlService){
   }

  setProductTypeObj(): void{
    this.typeProductObj = this.listProductType.find(pr => (pr.name).toLowerCase() === this.typeProductName.toLowerCase());
  }

  listInputsJson(): any{
    const textListInputConf = this.typeProductObj.fieldsType;
    return JSON.parse(textListInputConf);
  }

  ngOnInit(): void {

    this.subRoute = this.route.params
    .subscribe(
      (data) => { console.log(this.idProduct = data.id); console.log(this.typeProductName = data.type);},
      (err) => console.log('Error rute '+ err),
      () => {}
    );

    this.serviceP.getTypesProuct()
    .subscribe(
      (response) => this.listProductType = response,
      (err) => console.log('Error ' + err),
      () =>{
        this.setProductTypeObj();
        this.formFields = this.formService.getFormFields(this.listInputsJson());
        this.isLoading = false;


        if(this.idProduct === 'undefine' ){
          this.isEdit = false;

        }else{
          this.isEdit = true;
          console.log('no es igual a undifined')
        }
        console.log( "is edit"+ this.isEdit);

      }
    );

  }

  ngOnDestroy(): void{
    this.subRoute.unsubscribe();
  }

}
