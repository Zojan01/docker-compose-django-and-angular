import { ProductTypeModel } from './../models/product-type';
import { Apollo, gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductModel } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class FuncsService {

    constructor(public apollo: Apollo) { }

    typeProductList: ProductTypeModel[] = [

     new ProductTypeModel({
        id: 2,
        name:'Novel',
        fieldsName:'id name price author summary ageLimit pathPoster',
        fieldsType: `[{"controlType":"textbox","key":"name","label":"Ingrese el titulo","required":true,"order":1},
        {"controlType":"textbox","key":"author","label":"Insert the name of the autor","required":true,"order":2},
        {"controlType":"number","key":"price","label":"Insert the price","required":true,"order":3},
        {"controlType":"number","key":"price","label":"Limit age to read this book","type":"number","order":4},
        {"controlType":"textarea","key":"pathPoster","label":"Insert link of the image","type":"textarea","order":5},
        {"controlType":"textarea","key":"summary","label":"Sumary","type":"textarea","order":6}]`
      }),
      new ProductTypeModel({
        id: 1,
        name:'House',
        fieldsName:'id name price condition location summary pathPoster amountRoon',
        fieldsType: `[{"controlType":"textbox","key":"name","label":"Insert the title","required":true,"order":1},
        {"controlType":"number","key":"price","label":"Insert the price","required":true,"order":2},
        {"controlType":"number","key":"amountRoon","label":"Amount of rooms","required":"true","order":7},
        {"controlType":"textarea","key":"location","label":"Where is?","type":"textarea","order":3},
        {"controlType":"textarea","key":"pathPoster","label":"Insert link of the image","type":"textarea","order":4},
        {"controlType":"textarea","key":"summary","label":"Sumary","type":"textarea","order":5}]`
      }),
    ];

    getProductTypeObj(nameP: string): ProductTypeModel{

      return this.typeProductList.find(pr => (pr.name).toLowerCase() === nameP.toLowerCase());
    }

}
