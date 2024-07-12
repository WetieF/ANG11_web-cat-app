import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AppDataState, DataStateEnum, ActionEvent, ProductActionsTypes } from '../../../state/product.state';
import { Product } from '../../../model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  @Input() productsInput$: Observable<AppDataState<Product[]>> | null=null;
  @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter();

  readonly DataStateEnum = DataStateEnum;

  constructor() {}

  ngOnInit(): void {

  }

  onSelect(p: Product) {
    this.productEventEmitter.emit({type: ProductActionsTypes.SELECT_PRODUCT, payload: p});
  }

  onDelete(p: Product) {
    this.productEventEmitter.emit({type: ProductActionsTypes.DELETE_PRODUCT, payload: p});
  }

  onEditProduct(p: Product) {
    this.productEventEmitter.emit({type: ProductActionsTypes.EDIT_PRODUCT, payload: p});
  }
   
  onActionEvent($event: ActionEvent) {
    this.productEventEmitter.emit($event);
  }

}
