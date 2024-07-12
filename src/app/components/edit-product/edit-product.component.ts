import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../model/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  productId!: number;
  productFormGroup!: FormGroup;
  submitted: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, 
              private productService: ProductsService,
            private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];

    this.productService.getProduct(this.productId).subscribe({
      next: (data: Product) => {
        this.productFormGroup = this.fb.group({
          id: [data.id, Validators.required],
          name:      [data.name, Validators.required],
          price:     [data.price, Validators.required],
          quantity:  [data.quantity, Validators.required],
          selected: [data.selected, Validators.required],
          available: [data.available, Validators.required]
        })
      },
      error: err => {
        console.log(err);
      }
    })
  }

  onUpdateProduct() {
    this.productService.updateProduct(this.productFormGroup.value).subscribe({
      next: () => {
        alert('Success');
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
