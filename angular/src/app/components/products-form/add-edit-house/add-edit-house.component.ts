import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-house',
  templateUrl: './add-edit-house.component.html',
  styleUrls: ['./add-edit-house.component.scss']
})
export class AddEditHouseComponent implements OnInit {

  myForm: FormGroup;
  isLoading = true;
  isEdit = false;
  id: string;

  constructor(private form: FormBuilder, private route: ActivatedRoute, private service: ProductService ) { }

  onSubmit():void{
    console.log(this.myForm.getRawValue())
  }



  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;
    if (this.id){this.isEdit = true;}

    this.myForm = this.form.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      amountRoon: ['', Validators.required],
      condition: ['', Validators.required],
      location: ['', Validators.required],
      summary: ['', Validators.required],
      pathPoster: ['', Validators.required],
    });


   /* if (this.isEdit){
      this.service.getUser(this.id).subscribe(
        data =>{
          this.myForm.controls.name.setValue(data.name);
          this.myForm.controls.price.setValue(data.price);
          this.myForm.controls.details.setValue(data.details);
          this.myForm.controls.date.setValue(data.date);
          }
      );
    */

    this.isLoading = false;
  }



}



