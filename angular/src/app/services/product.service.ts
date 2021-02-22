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


  constructor(public apollo: Apollo) { }

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
        return response.data.typeProducts
        .map(pt => new ProductTypeModel(pt));
      }));
  }

  getAllProducts(tyP: string): any{
    const products = tyP+'s';
    const queryProducts = this.CreateQueryAll(products);

    return this.apollo.query<any>({
      query:  gql(queryProducts)
    }).pipe(map(response => {
      response = response.data;
      return response[products].map( pr => new ProductModel(pr));
    }))

  }

  getOneProduct(objTypeProduct:ProductTypeModel ,id): any{

    const query = this.CreateQueryOne(objTypeProduct, id);
    console.log(id);
    console.log(query);

    return this.apollo.query<any>({
      query: gql(query)
    }).pipe(map(
      response => {
        return response.data;
      }));
  }

  postProduct(objTypeProduct: ProductTypeModel, valuesForm: any): any{

    const query = this.createMutationSave(objTypeProduct,valuesForm);
    console.log(query);

    return this.apollo.mutate({
      mutation: gql(query)
    }).pipe(map(response => response.data));

  }

  updateProduct(objTypeProduct: ProductTypeModel, valuesForm, id){
    const query = this.createMutationUpdate(objTypeProduct,valuesForm,id);
    console.log(query);

    return this.apollo.mutate({
      mutation: gql(query)
    }).pipe(map(response => response.data));
  }

  delteProduct(objTypeProduct: ProductTypeModel, id){
    const query = this.createMutationDelete(objTypeProduct,id);
    console.log(query);

    return this.apollo.mutate({
      mutation: gql(query)
    }).pipe(map(response => response.data));
  }







  CreateQueryOne(objTypeProduct: ProductTypeModel, id: string): string{

    const campos = objTypeProduct.fieldsName;
    const type = objTypeProduct.name.toLowerCase();

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

  CreateQueryAll(typeProduct: string): string{
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

  createMutationSave(objTypeProduct: ProductTypeModel, valuesForm: any ): string{

    const action = 'create' + objTypeProduct.name;
    const campos = objTypeProduct.fieldsName;
    const values = this.objToString(valuesForm) + `typeProduct:${objTypeProduct.id}`;

    const query = `
    mutation createProduct{
      ${action}(${values}){
        ${objTypeProduct.name.toLowerCase()}{
          ${campos}
          typeProduct {
            id
            name
          }
        }
      }
    }`;
    return query;

  }

  createMutationUpdate(objTypeProduct: ProductTypeModel, valuesForm, id): string{
    const action = 'update' + objTypeProduct.name;
    const campos = objTypeProduct.fieldsName;
    const values = this.objToString(valuesForm) + `id:${id}, ` + `typeProduct:${objTypeProduct.id}`;

    const query = `
    mutation updateProduct{
      ${action}(${values}){
        ${objTypeProduct.name.toLowerCase()}{
          ${campos}
          typeProduct {
            id
            name
          }
        }
      }
    }`;
    return query;

  }

  createMutationDelete(objTypeProduct: ProductTypeModel,id): string{
    const action = 'delete' + objTypeProduct.name;
    const values = `id:${id}`;

    const query = `
    mutation deleteProduct{
      ${action}(${values}){
        ${objTypeProduct.name.toLowerCase()}{
          id
          typeProduct {
            id
            name
          }
        }
      }
    }`;
    return query;
  }


  objToString (obj): string {
    let str = '';
    if (typeof obj === 'object'){
      for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + ':' + this.objToString (obj[p]) + ', ';
        }
      }
    }else{
      if (typeof obj === 'string'){return '"' + obj + '"'; }
      else{return obj + ''; }
    }
    return str.substring(0, str.length - 1) + '';
  }

















}
