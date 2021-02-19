import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-box',
  styleUrls: ['./product-box.component.scss'],
  template: `
   <div class="container">

      <img src="{{product.api}}">
      <h3>{{product.name}}</h3>
      <p>Price:{{product.price}}</p>

   </div>
  `,

})
export class ProductBoxComponent{
  @Input() product: any;

  constructor() { }

}
