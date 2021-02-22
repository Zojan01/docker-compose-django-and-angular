import { ProductService } from './../../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-novel',
  templateUrl: './add-edit-novel.component.html',
  styleUrls: ['./add-edit-novel.component.scss']
})
export class AddEditNovelComponent implements OnInit {

  myForm: FormGroup;
  isLoading = false;
  id: string;
  isEdit = false;


  constructor(private form: FormBuilder, private route: ActivatedRoute, private service: ProductService ) { }


  onSubmit(){
    console.log(this.myForm.getRawValue())
  }


  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;
    if (this.id){this.isEdit = true;}

    this.myForm = this.form.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      author: ['', Validators.required],
      summary: ['', Validators.required],
      ageLimit: ['', Validators.required],
      pathPoster: ['', Validators.required],
    });

    /*
    if (this.isEdit){
      this.service.getUser(this.id).subscribe(
        data =>{
          this.myForm.controls.name.setValue(data.name);
          this.myForm.controls.price.setValue(data.price);
          this.myForm.controls.details.setValue(data.details);
          this.myForm.controls.date.setValue(data.date);
          }
      );
    */


    this.isLoading = true;
  }
}
