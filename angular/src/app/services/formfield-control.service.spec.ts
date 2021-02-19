/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormfieldControlService } from './formfield-control.service';

describe('Service: FormfieldControl', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormfieldControlService]
    });
  });

  it('should ...', inject([FormfieldControlService], (service: FormfieldControlService) => {
    expect(service).toBeTruthy();
  }));
});
