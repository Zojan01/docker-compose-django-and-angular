import { ProductTypeModel } from 'src/app/models/product-type';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FuncsService } from './funcs.service';

describe('Service: Funcs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FuncsService]
    });
  });

  it('It should return novel if it passes novel in the method', inject([FuncsService],(service: FuncsService) =>{
    let typeproduct:ProductTypeModel = service.getProductTypeObj('novel');
    expect(typeproduct.name.toLowerCase()).toEqual('novel');
  }));



  it('should ...', inject([FuncsService], (service: FuncsService) => {
    expect(service).toBeTruthy();
  }));
});
