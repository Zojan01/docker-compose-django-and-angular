import { ProductTypeModel } from './../../models/product-type';
import { ProductService } from './../../services/product.service';
import { ProductModel } from './../../models/product';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-box',
  styleUrls: ['./product-box.component.scss'],
  template: `
   <div class="container">
      <img src="{{product.pathPoster}}" height="200" width="250">
      <h3>{{product.name}}</h3>
      <p>Price:{{product.price}}</p>
      <button (click)="deleteProduct()">Edit</button>
      <button (click)="deleteProduct()">Delete</button>
   </div>
  `,

})
export class ProductBoxComponent{
  @Input() product: ProductModel;

  constructor(public router: Router, public serviceProd: ProductService) { }


  deleteProduct():void{

    const typeP = new ProductTypeModel(this.product.typeProduct);

    this.serviceProd.delteProduct(typeP, this.product.id )
    .subscribe(
      () =>  '' ,
      (err) => console.log('Error '+err),
      () => console.log('Product Delete')
    );
  }

  goToEditProduct(): void{
   const typeProduct = new ProductTypeModel(this.product.typeProduct);

   this.router.navigate(['./product' ,(typeProduct.name).toLowerCase(),this.product.id],);
  }


}
