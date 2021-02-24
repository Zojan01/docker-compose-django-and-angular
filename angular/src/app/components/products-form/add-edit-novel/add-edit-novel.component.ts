import { ProductTypeModel } from './../../../models/product-type';
import { FuncsService } from './../../../services/funcs.service';
import { ProductService } from './../../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-add-edit-novel',
  templateUrl: './add-edit-novel.component.html',
  styleUrls: ['./add-edit-novel.component.scss']
})
export class AddEditNovelComponent implements OnInit, OnDestroy {

  objTypeProduct: ProductTypeModel;
  subscriptions: Subscription[] = [];
  myForm!: FormGroup;
  isLoading = true;
  id!: string;
  isEdit = false;

  constructor(
    public dialog: MatDialog,
    private form: FormBuilder,
    private route: ActivatedRoute,
    public serviceProd: ProductService,
    public serviceFuncs: FuncsService,
    public router: Router
    ) { }


  gotToProducts(): void{
    const name = this.objTypeProduct.name;

    this.router.navigateByUrl('/products', { skipLocationChange: true }).then(() => {
      this.router.navigate(['./products', name.toLowerCase()]);
    });

  }

  restForm(): void{

    this.myForm.reset();

  }

  save(): void{
    const objForm = this.myForm.getRawValue();
    const suscriRef = this.serviceProd.postProduct(this.objTypeProduct, objForm)
      .subscribe(
      () => this.openDialog(),
      () => console.log('Could not save product'),
      );

    this.subscriptions.push(suscriRef);
  }

  edit(): void{
    const objForm = this.myForm.getRawValue();
    const suscriRef = this.serviceProd.updateProduct(this.objTypeProduct, objForm, this.id)
      .subscribe(
        () => this.openDialog(),
        () => console.log('Could not edit product'),
      );

    this.subscriptions.push(suscriRef);
  }

  onSubmit(): void{

    if(this.myForm.invalid){

    }else{
      if (this.isEdit){ this.edit() }
      else{this.save() };
    }
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


  ngOnInit(): void {

    const firstSub  = this.route.params
    .subscribe(
      () => {
        this.id = this.route.snapshot.params.id;
        if (this.id){this.isEdit = true; }else{this.isEdit = false; }
      },
      (err) => console.log('Erro ' + err ),
    );


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
      let secondSub = this.serviceProd.getOneProduct(this.objTypeProduct, this.id)
      .subscribe(
        (response) => {
          const data = response.novel;
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
      this.subscriptions.push(secondSub);

    }else{
      this.isLoading = false;
    }

    this.subscriptions.push(firstSub);
  }


  ngOnDestroy(): void{
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
