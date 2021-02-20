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


  typeProducts: ProductTypeModel[];


  constructor(public apollo: Apollo) { }


  queryAllProducts(tyP: string): any{
    const products = this.createQueryAll(tyP+ 's');

    return this.apollo.query<any>({
      query:  gql(products)
    }).pipe(map(response =>
      response.data['novel' +'s'].map(
        pr => new ProductModel(pr)))
      );

  }

  getTypesProuct(): any{
    return this.apollo.query<any>({
      query: gql `
      {
        typeProducts{
          id
          name
          fieldsType
          fieldsName
        }
      }
    `}).pipe(map(
      response => {
        this.typeProducts = response.data.typeProducts
        .map(pt => new ProductTypeModel(pt));

        return this.typeProducts;
      }));
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
      }`;
    return query;
  }

  createQueryOne(type,id,campos): string{

    const query = `
    {
      ${type}(id: ${id}){
        ${campos}
        typeProduct {
          id
          name
        }
      }
    }`;
    return query;

  }



  createQueryUpdate():void{

  }

  getOne(id: number, valores): void{
    const newLocal = `novel(id:id){
      id
      name
      price
      author
      summary
      ageLimit
      pathPoster

      typeProduct{
        id
        name
        fieldsType
        }
      }
    }`;
  }









}
