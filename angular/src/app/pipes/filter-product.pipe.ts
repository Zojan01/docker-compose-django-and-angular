import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter-product'
})
export class FilterProductPipe implements PipeTransform {

  transform(items: any[], field: string, value: string ): any[] {

    if(!items){
      return [];
    }
    // tslint:disable-next-line: curly
    if (!value || !field) {
      return items;
    }

    return items.filter((singleItem) =>{
      singleItem[field].includes(value.toLowerCase())
    }
    );
  }






}
