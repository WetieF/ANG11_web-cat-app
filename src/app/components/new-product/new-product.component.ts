import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit {

  productFormGroup!: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private productService: ProductsService) {}

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: ["", Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      selected: [true, Validators.required],
      available: [true, Validators.required]
    });   
  }

  onSave() {
    this.submitted = true;

    if (this.productFormGroup.invalid) return;

    this.productService.save(this.productFormGroup.value).subscribe({
      next: (data: Product) => {
        alert("Success Saved!")
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
