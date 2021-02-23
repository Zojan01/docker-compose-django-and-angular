/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductService } from './product.service';

describe('Service: Product', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService]
    });
  });

  it('should ...', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));

  it('should convert a objeto to string', inject([ProductService], (service: ProductService) => {
    const obj = {name: 'manuel', lastName: 'Nunun', Id: 1};

    const stringObj = service.objToString(obj);

    expect(typeof stringObj).toBe('string');
  }));



});
