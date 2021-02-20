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
  {path: '', redirectTo: 'form', pathMatch: 'full'},
  {path: 'products',          component: ProductContainerComponent},
  {path: 'products/:type',    component: ProductContainerComponent},
  {path: 'product/:type',     component: FormContainerComponent},
  {path: 'product/:id/:type', component: FormContainerComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    ProductBoxComponent,
    ProductContainerComponent,
    DynamicFormComponent,
    FormContainerComponent,
    DynamicFormInputComponent,
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
