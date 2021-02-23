import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

import { by } from 'protractor';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddEditHouseComponent } from './add-edit-house.component';

describe('AddEditHouseComponent', () => {
  let component: AddEditHouseComponent;
  let fixture: ComponentFixture<AddEditHouseComponent>;
  let de: DebugElement;
  let el: HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditHouseComponent ],
      imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [FormBuilder, ],
    })
    .compileComponents().then( () => {

      fixture = TestBed.createComponent(AddEditHouseComponent);
      component = fixture.componentInstance;

      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;

    });
  }));

  it('should call the onSumit method', async(() => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  }));

  it('form shoul be invalid', async(() => {
    component.myForm.controls.name.setValue('');
    component.myForm.controls.pathPoster.setValue('');
    component.myForm.controls.price.setValue(64);
    expect(component.myForm.valid).toBeFalsy();
  }));



  it('form to be valid', async(() => {
    component.myForm.controls.name.setValue('la mejor ');
    component.myForm.controls.price.setValue(9874);
    component.myForm.controls.amountRoon.setValue(4);
    component.myForm.controls.condition.setValue(7);
    component.myForm.controls.location.setValue('av las americas');
    component.myForm.controls.summary.setValue('una casa en buena condicion');
    component.myForm.controls.pathPoster.setValue('dsa');

    expect(component.myForm.valid).toBeTruthy();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

