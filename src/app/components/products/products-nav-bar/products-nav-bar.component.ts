import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionEvent, ProductActionsTypes } from '../../../state/product.state';
//import { EventEmitter } from 'stream';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrl: './products-nav-bar.component.css'
})
export class ProductsNavBarComponent implements OnInit {

  @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    
  }

  onGetAllProducts() {
    this.productEventEmitter.emit({type: ProductActionsTypes.GET_ALL_PRODUCTS, payload: null});
  }

  onGetSelectedProducts() {
    this.productEventEmitter.emit({type: ProductActionsTypes.GET_SELECTED_PRODUCTS, payload: null});
  }

  onGetAvailableProducts() {
    this.productEventEmitter.emit({type: ProductActionsTypes.GET_AVAILABLE_PRODUCTS, payload: null});
  }

  onNewProduct() {
    this.productEventEmitter.emit({type: ProductActionsTypes.NEW_PRODUCT, payload: null});
  }

  onSearch(dataForm: any) {
    this.productEventEmitter.emit({type: ProductActionsTypes.GET_SEARCH_PRODUCTS, payload: dataForm});
  }

}
