import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'apollo-angular';
import { ProductTypeModel } from 'src/app/models/product-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{


  constructor() { }

}
