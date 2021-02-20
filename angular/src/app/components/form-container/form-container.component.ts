import { ProductService } from './../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit, OnDestroy {

  typeProduct!: any;
  subRoute!: any;
  listProductTypes = [];
  listProduct = [];
  isLoading = true;

  constructor(private route: ActivatedRoute, private service: ProductService){ }


  ngOnInit(): void {
    this.subRoute = this.route.params.subscribe(data => console.log(data));
    console.log('form-container' + this.subRoute);
  }

  ngOnDestroy(): void{
    this.subRoute.unsubscribe();
  }

}
