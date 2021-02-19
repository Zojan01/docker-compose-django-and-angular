import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(public apollo: Apollo) { }

  entry = `
  {
    books{
       id
      titule
      summary
    }
  }`;


  typeProduct = gql`
  {
    typeProduct{
      id
      fieldsType
      fieldsName
    }
  }
`;

  query(): void{
  }

  mutation(): void{
  }

  getTypesProuct(): void{
     this.apollo.query<any>({
      query:  gql`
      {
        novels {
          name
          id
        }
      }
    `,
    }).subscribe(data => console.log(data));
  }


}
