import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import { AddEditHouseComponent } from './components/products-form/add-edit-house/add-edit-house.component';
import { AddEditNovelComponent } from './components/products-form/add-edit-novel/add-edit-novel.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductContainerComponent } from './components/product-container/product-container.component';
import { Route } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF, CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogComponent } from './components/dialog/dialog.component';



const routes: Routes = [
  {path: '', redirectTo: 'products/novel', pathMatch: 'full'},
  {path: 'products',          component: ProductContainerComponent},
  {path: 'products/:type',    component: ProductContainerComponent},
  {path: 'product/house',     component: AddEditHouseComponent},
  {path: 'product/house/:id',     component: AddEditHouseComponent},
  {path: 'product/novel', component: AddEditNovelComponent},
  {path: 'product/novel/:id', component: AddEditNovelComponent},
];

const material = [MatDialogModule, MatButtonModule];



@NgModule({
  declarations: [
    AppComponent,
    ProductBoxComponent,
    ProductContainerComponent,
    AddEditHouseComponent,
    AddEditNovelComponent,
    DialogComponent,
    HeaderComponent
   ],
  imports: [
    BrowserModule,
    CommonModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    material,
    BrowserAnimationsModule
  ],
  entryComponents: [DialogComponent ],
  providers: [
    FormBuilder,
    {provide: LocationStrategy, useClass: HashLocationStrategy },
    {provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
