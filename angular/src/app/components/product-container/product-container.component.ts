import { ProductModel } from './../../models/product';
import { map } from 'rxjs/operators';
import { ProductService } from './../../services/product.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductTypeModel } from 'src/app/models/product-type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.scss']
})
export class ProductContainerComponent implements OnInit, OnDestroy {

  typeProduct!: string;
  subscriptions: Subscription[] = [];
  listProductType!: ProductTypeModel[];
  listProduct!: ProductModel[];
  isLoading = true;

  constructor(private route: ActivatedRoute,
              private service: ProductService,
              public router: Router) { }


  goRouteProducts(typeP): void{
    this.router.navigate(['./products', typeP]);
  }

  goRouteAddProduct(): void{
    this.router.navigate(['./product', this.typeProduct]);
  }

  ngOnInit(): void {

    this.subscriptions.push(
      this.route.params.subscribe(
      data => this.typeProduct = data.type,
      (err) => 'Error' +err,
      )
    );

    this.subscriptions.push(
      this.service.getTypesProuct()
      .subscribe(
        (response) => {this.listProductType = response;},
        (err) => console.log('Error ' + err),
        () => console.log('listi product' + this.listProductType)
      )
    );

    this.subscriptions.push(
      this.service.getAllProducts(this.typeProduct).subscribe(
        response => this.listProduct = response,
        (err) => console.log ('Error' + err),
        () => this.isLoading = false
      )
    );
  }

  ngOnDestroy(): void{

    this.subscriptions.forEach(subcription => subcription.unsubscribe());

  }
}
