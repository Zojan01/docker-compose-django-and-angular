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

  listSubcrip: Subscription[] = [];
  //listProductType!: ProductTypeModel[];
  listProduct!: ProductModel[];
  typeProduct!: string;
  isLoading = true;

  constructor(private route: ActivatedRoute,
              private service: ProductService,
              public router: Router) { }

  /*
  goRouteProducts(typeP): void{
    this.router.navigate(['./products', typeP.toLowerCase()]);
  }

  goRouteAddProduct(): void{
    this.router.navigate(['./product', this.typeProduct.toLowerCase()]);
  }*/


  /*
  getListTypeProduct(): Subscription{
    return this.service.getTypesProuct()
      .subscribe(
        (response) => {this.listProductType = response;},
        (err) => console.log('Error ' + err),
        () => console.log('listi product' + this.listProductType)
    );
  }*/

  getListProduct(): Subscription{
    return this.service.getAllProducts(this.typeProduct).subscribe(
      response => this.listProduct = response,
      (err) => console.log ('Error' + err),
      () => this.isLoading = false
    );
  }

  onChange(): void{
    this.listSubcrip.push(
      this.getListProduct()
    );

  }

  ngOnInit(): void {

    this.listSubcrip.push(
      this.route.params.subscribe(
      data => {
        this.typeProduct = data.type;
        this.onChange();
      },
      (err) => 'Error' +err,
      )
    );

    /*this.listSubcrip.push(
      this.getListTypeProduct()
    );*/

    this.listSubcrip.push(
      this.getListProduct()
    );

  }

  ngOnDestroy(): void{
    this.listSubcrip.forEach(subcription => subcription.unsubscribe());
  }
}
