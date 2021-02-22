import { ProductTypeModel } from './../../../models/product-type';
import { FuncsService } from './../../../services/funcs.service';
import { ProductService } from './../../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-novel',
  templateUrl: './add-edit-novel.component.html',
  styleUrls: ['./add-edit-novel.component.scss']
})
export class AddEditNovelComponent implements OnInit {

  objTypeProduct: ProductTypeModel;
  myForm!: FormGroup;
  isLoading = true;
  id!: string;
  isEdit = false;
  subRoute!: any;

  constructor(
    private form: FormBuilder,
    private route: ActivatedRoute,
    public serviceProd: ProductService,
    public serviceFuncs: FuncsService ) { }


  save(): void{
    const objForm = this.myForm.getRawValue();
    this.serviceProd.postProduct(this.objTypeProduct, objForm)
    .subscribe(
      () => console.log('Saved'),
      () => console.log('Could not save product'),
    );
  }

  edit(): void{
    const objForm = this.myForm.getRawValue();
    this.serviceProd.updateProduct(this.objTypeProduct, objForm, this.id)
    .subscribe(
      () => console.log('Edited'),
      () => console.log('Could not edit product'),
    );
  }


  onSubmit(){
    if (this.isEdit === true){
      this.edit();
    }else{
      this.save();
    }
  }


  ngOnInit(): void {
    this.subRoute = this.route.params
    .subscribe(
      () => this.id = this.route.snapshot.params.id,
      (err) => console.log('Erro ' + err ),

    );
    if (this.id){this.isEdit = true; }else{this.isEdit = false; }

    this.objTypeProduct = this.serviceFuncs.getProductTypeObj('novel');

    this.myForm = this.form.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      author: ['', Validators.required],
      summary: ['', Validators.required],
      ageLimit: ['', Validators.required],
      pathPoster: ['', Validators.required],
    });

    if (this.isEdit){
      this.serviceProd.getOneProduct(this.objTypeProduct, this.id)
      .subscribe(
        (response) => {
          const data = response.novel;
          console.log(data);

          this.myForm.controls.name.setValue(data.name);
          this.myForm.controls.price.setValue(data.price);
          this.myForm.controls.author.setValue(data.author);
          this.myForm.controls.summary.setValue(data.summary);
          this.myForm.controls.ageLimit.setValue(data.ageLimit);
          this.myForm.controls.pathPoster.setValue(data.pathPoster);
        },
        (err) => console.log('Error' + err),
        () => this.isLoading = false,
      );
    }else{
      this.isLoading = false;
    }



  }
}
