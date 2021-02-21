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
    const products = tyP+'s';
    const queryProducts = this.createQueryAll(products);

    return this.apollo.query<any>({
      query:  gql(queryProducts)
    }).pipe(map(response => {
      response = response.data;
      return response[products].map( pr => new ProductModel(pr));
    }))

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
          pathPoster
          typeProduct {
            id
            name
          }
        }
      }`;
    return query;
  }

  createQueryOne(type, id, campos): string{
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

  mutationSave(type: string, campos: string, values: string ): void{
    const product = this.createMutationSave(type, campos, values );
    console.log(product);
  }




  createMutationSave(type: string, campos: string, values: any, ): string{
    type = 'save' + type;
    const query = `
    {
      ${type}(${JSON.parse(JSON.stringify(values))}){
        ${campos}
        typeProduct {
          id
          name
        }
      }
    }`;
    return query;

  }









}
