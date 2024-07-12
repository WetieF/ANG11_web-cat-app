import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../model/product.model';
import e from 'express';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from '../../state/product.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  //products!: Product[];    // Cas(1)
  // products :Products[] | null = null;  // Cas(2)
  products$: Observable<AppDataState<Product[]>> | null=null;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    
  }

  onGetAllProducts() {
    // Cas(1)
    /* this.productService.getAllProducts().subscribe({
      next: data => {
        this.products = data;
      },
      error: err => {
        console.log(err);
      }
    }); */

    // Cas(2) qd on met of cela veut dire observable.
    this.products$ = this.productService.getAllProducts()
    .pipe(
      map(listProduits => {
      //  return ({ dataState: DataStateEnum.LOADED, data : listProduits.filter((product : Product) => product.price < 5500) })
        return ({ dataState: DataStateEnum.LOADED, data : listProduits })
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState : DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  onGetSelectedProducts() {
    this.products$ = this.productService.getSelectedProducts()
    .pipe(
      map(listProduits => {
       return ({ dataState: DataStateEnum.LOADED, data : listProduits })
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState : DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  onGetAvailableProducts() {
    this.products$ = this.productService.getAvailableProducts()
    .pipe(
      map(listProduits => {
       return ({ dataState: DataStateEnum.LOADED, data : listProduits })
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState : DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  onSearch(dataForm: any) {
    this.products$ = this.productService.searchProducts(dataForm.keyword)
    .pipe(
      map(listProduits => {
       return ({ dataState: DataStateEnum.LOADED, data : listProduits })
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState : DataStateEnum.ERROR, errorMessage: err.message}))
    );
  }

  onSelect(product: Product) {
    this.productService.select(product).subscribe({
      next: (data) => {
        product.selected = data.selected;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onDelete(product: Product) {

    let v = confirm("Are you sure, you one to delete?");

    if(v == true) 

    this.productService.deleteProduct(product).subscribe({
      next: (data) => {
        this.onGetAllProducts();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onNewProduct() {
    this.router.navigateByUrl("/add-product");
  }

  onEditProduct(p: Product) {
    this.router.navigateByUrl("/edit-product/" + p.id);
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionsTypes.GET_ALL_PRODUCTS : this.onGetAllProducts(); break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS : this.onGetSelectedProducts(); break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS : this.onGetAvailableProducts(); break;
      case ProductActionsTypes.GET_SEARCH_PRODUCTS : this.onSearch($event.payload); break;
      case ProductActionsTypes.NEW_PRODUCT : this.onNewProduct(); break;

      case ProductActionsTypes.SELECT_PRODUCT : this.onSelect($event.payload); break;
      case ProductActionsTypes.DELETE_PRODUCT : this.onDelete($event.payload); break;
      case ProductActionsTypes.EDIT_PRODUCT : this.onEditProduct($event.payload); break;
    }
  }

}
