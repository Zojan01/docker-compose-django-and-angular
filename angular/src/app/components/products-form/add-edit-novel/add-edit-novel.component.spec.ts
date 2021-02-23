import { FormBuilder } from '@angular/forms';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddEditNovelComponent } from './add-edit-novel.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddEditNovelComponent', () => {
  let component: AddEditNovelComponent;
  let fixture: ComponentFixture<AddEditNovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditNovelComponent ],
      imports:[RouterTestingModule],
      providers:[FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditNovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
