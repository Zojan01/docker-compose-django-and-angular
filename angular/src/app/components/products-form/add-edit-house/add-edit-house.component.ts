import { ProductTypeModel } from './../../../models/product-type';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncsService } from 'src/app/services/funcs.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';


@Component({
  selector: 'app-add-edit-house',
  templateUrl: './add-edit-house.component.html',
  styleUrls: ['./add-edit-house.component.scss']
})
export class AddEditHouseComponent implements OnInit,OnDestroy {

  subscriptions: Subscription[] = [];
  objTypeProduct!: ProductTypeModel;
  myForm!: FormGroup;
  isLoading = true;
  isEdit = false;
  id!: string;




  constructor(
    private form: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public serviceProd: ProductService,
    public serviceFuncs: FuncsService,
    public router: Router ) { }

  gotToProducts(): void {
    const name = this.objTypeProduct.name;

    this.router.navigateByUrl('/products', { skipLocationChange: true }).then(() => {
      this.router.navigate(['./products', name.toLowerCase()]);
    });
  }

  restForm(): void{
    this.myForm.reset();
  }

  openDialog(): void{

    const typeAction = (this.isEdit) ? 'edited' : 'created';
    const dialogRef = this.dialog.open(
      DialogComponent,
     {data: {typeProduct: this.objTypeProduct.name, typeAction }}
     );

    const suscriRef = dialogRef.afterClosed()
    .subscribe(result => {
      console.log(result);
      if(result === 'true'){
        this.restForm();
      }else{
        this.gotToProducts();
      }

    });

    this.subscriptions.push(suscriRef);

  }

  save(): void{
    const objForm = this.myForm.getRawValue();

    this.subscriptions.push(
      this.serviceProd.postProduct(this.objTypeProduct, objForm)
      .subscribe(
        () => this.openDialog(),
        () => console.log('Could not save product'),
      )
    );
  }

  edit(): void{
    const objForm = this.myForm.getRawValue();

    this.subscriptions.push(
      this.serviceProd.updateProduct(this.objTypeProduct, objForm, this.id)
      .subscribe(
        () => this.openDialog(),
        () => console.log('Could not edit product'),
      )
    );
  }


  onSubmit(): void{
    if(this.myForm.invalid){
      console.log("invalid form");
    }else{

      console.log("paso")
      if (this.isEdit){ this.edit(); }
      else{this.save(); }
    }
  }


  ngOnInit(): void {

    const firstSub  = this.route.params
    .subscribe(
      () => {
        this.id = this.route.snapshot.params.id;
        if (this.id){this.isEdit = true; }else{ this.isEdit = false; }
      },
      (err) => console.log('Erro ' + err ),
    );


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
      const secondSub = this.serviceProd.getOneProduct(this.objTypeProduct, this.id)
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
      this.subscriptions.push(secondSub);
    }

    this.subscriptions.push(firstSub);
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }



}



