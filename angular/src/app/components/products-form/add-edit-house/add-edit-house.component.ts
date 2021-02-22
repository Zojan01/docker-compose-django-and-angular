import { ProductTypeModel } from './../../../models/product-type';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuncsService } from 'src/app/services/funcs.service';

@Component({
  selector: 'app-add-edit-house',
  templateUrl: './add-edit-house.component.html',
  styleUrls: ['./add-edit-house.component.scss']
})
export class AddEditHouseComponent implements OnInit {

  objTypeProduct!: ProductTypeModel;
  myForm!: FormGroup;
  isLoading = true;
  isEdit = false;
  id!: string;

  constructor(
    private form: FormBuilder,
    private route: ActivatedRoute,
    public serviceProd: ProductService,
    public serviceFuncs: FuncsService ) { }


  save(): void{
    const objForm = this.myForm.getRawValue();
    console.log(objForm);

    this.serviceProd.postProduct(this.objTypeProduct, objForm)
    .subscribe(
      () => console.log('saved'),
      () => console.log('Could not save product'),
    );
  }

  edit(): void{
    const objForm = this.myForm.getRawValue();
    this.serviceProd.updateProduct(this.objTypeProduct, objForm, this.id)
    .subscribe(
      () => console.log('edited'),
      () => console.log('Could not edit product'),
    );
  }


  onSubmit(){

    if(this.isEdit === true){
      this.edit();
    }else{
      this.save();
    }
  }



  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    if (this.id){this.isEdit = true;}

    this.objTypeProduct = this.serviceFuncs.getProductTypeObj('house');

    this.myForm = this.form.group({
      name:       ['', Validators.required],
      price:      ['', Validators.required],
      amountRoon: ['', Validators.required],
      condition:  ['', Validators.required],
      location:   ['', Validators.required],
      summary:    ['', Validators.required],
      pathPoster: ['', Validators.required],
    });

    if (this.isEdit){
      this.serviceProd.getOneProduct(this.objTypeProduct, this.id)
      .subscribe(
        (response) => {
          const  data = response.house;
          this.myForm.controls.name.setValue(data.name);
          this.myForm.controls.price.setValue(data.price);
          this.myForm.controls.amountRoon.setValue(data.amountRoom);
          this.myForm.controls.condition.setValue(data.condition);
          this.myForm.controls.location.setValue(data.location);
          this.myForm.controls.summary.setValue(data.summary);
          this.myForm.controls.pathPoster.setValue(data.pathPoster);
        },
        (err) => console.log('Error'+ err),
        () => this.isLoading = false
      );
    }





  }



}



