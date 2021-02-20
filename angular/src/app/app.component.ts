import { ProductService } from './services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular';
  tyProductObs!: any;

  constructor( public service: ProductService){}


  ngOnInit(): void {
    this.tyProductObs = this.service.getTypesProuct();
  }

  ngOnDestroy(): void {
    this.tyProductObs.unsubscribe();
  }


}
