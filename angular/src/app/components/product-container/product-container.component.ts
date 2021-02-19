import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.scss']
})
export class ProductContainerComponent implements OnInit, OnDestroy {

  subRoute!: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subRoute = this.route.params.subscribe(data => console.log(data));
    console.log(this.subRoute);
  }

  ngOnDestroy(): void{
    this.subRoute.unsubscribe();
  }
}
