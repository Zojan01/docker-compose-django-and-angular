import { ProductTypeModel } from './../models/product-type';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { first, map } from 'rxjs/operators';
import { ProductModel } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  typeProduct = `
  {
    typeProducts{
      id
      name
      fieldsType
      fieldsName
    }
  }
`;


constructor(public apollo: Apollo) { }


  queryAllProducts(tyP: string): any{
    const products = this.createQuery(tyP+ 's');

    return this.apollo.query<any>({
      query:  gql(products)
    }).pipe(map(response => response.data));

  }

  getTypesProuct(): any{
    return this.apollo.query<ProductTypeModel>({
      query: gql(this.typeProduct),
    });
  }



  createQueryAll(typeProduct: string): string{
    const query = `
      {
        ${typeProduct}{
          id
          name
          price
          typeProduct {
            id
            name
          }
        }
      }
    `;
    return query;
  }

  createQueryOne(type):string{

    const query = `
      {
        ${type}
          id
          name
          price
          typeProduct {
            id
            name
          }
        }
      }
    `;
    return query;

  }

  createQueryDelete():void{

  }

  createQueryUpdate():void{

  }

}
