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
      <button (click)="goToEditProduct()">Delete</button>
   </div>
  `,

})
export class ProductBoxComponent{
  @Input() product: ProductModel;

  constructor(public router: Router) { }


  deleteProduct():void{
      console.log('product id' + this.product.pathPoster + 'type product' + this.product.typeProduct['name']);
  }

  goToEditProduct(): void{
   this.router.navigate(['./product' ,this.product.typeProduct['name'],this.product.id],);
  }


}
