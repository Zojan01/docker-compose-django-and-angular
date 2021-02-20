import { Apollo } from 'apollo-angular';
import { ProductService } from './../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit, OnDestroy {


  subRoute!: any;
  typeProduct!: string;
  idProduct!: string;

  isLoading = true;

  method():void{



  }


 //aqui es que yo tengo que agarrar y pasar el el los controles el generador de forms;


  constructor(private route: ActivatedRoute, private service: ProductService,public apollo:Apollo ){ }



  ngOnInit(): void {

    this.subRoute = this.route.params.
    subscribe(data => {

      this.idProduct = data.id;
      this.typeProduct = data.type;

    });

  }

  ngOnDestroy(): void{
    this.subRoute.unsubscribe();
  }

}
