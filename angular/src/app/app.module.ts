import { AddEditHouseComponent } from './components/products-form/add-edit-house/add-edit-house.component';
import { AddEditNovelComponent } from './components/products-form/add-edit-novel/add-edit-novel.component';
import { DynamicFormInputComponent } from './components/dynamic/dynamic-form-input/dynamic-form-input.component';
import { DynamicFormComponent } from './components/dynamic/dynamic-form/dynamic-form.component';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductContainerComponent } from './components/product-container/product-container.component';
import { FormContainerComponent } from './components/form-container/form-container.component';
import { Route } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF, CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'products',          component: ProductContainerComponent},
  {path: 'products/:type',    component: ProductContainerComponent},
  {path: 'product/house',     component: AddEditHouseComponent},
  {path: 'product/house/:id',     component: AddEditHouseComponent},
  {path: 'product/novel', component: AddEditNovelComponent},
  {path: 'product/novel/:id', component: AddEditNovelComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    ProductBoxComponent,
    ProductContainerComponent,
    DynamicFormComponent,
    FormContainerComponent,
    DynamicFormInputComponent,
    DynamicFormComponent,
    DynamicFormInputComponent,
    AddEditHouseComponent,
    AddEditNovelComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    FormBuilder,
    {provide: LocationStrategy, useClass: HashLocationStrategy },
    {provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
