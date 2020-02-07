import { Injectable } from '@angular/core';
import { ListStore } from './list.store';
import { ListState} from './list.model';
import { combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { QueryEntity } from '@datorama/akita';
//import { ProductsQuery } from '../../products/state/products.query';
// Querys can acces protected store, and apply Joins logic to serve fully working view Models. distinct from Data Layer models.
@Injectable({ providedIn: 'root' })
export class ListQuery extends QueryEntity<ListState> { // Query que recuperara los datos con el modelo ListState
  constructor(protected store: ListStore, /*private productsQuery: ProductsQuery*/) {
    super(store);
  }
  // public stream exposed in the ListQuery class.
  selectItems$ = combineLatest( // When any observable emits a value, emit the last emitted value from each
    this.selectAll(), // The latest emission from this store
    this.betLinesQuery.selectAll({ asObject: true })) // The latest emission from betLine store
  .pipe(
    map(joinItems), // Join them to build usefull viewModel
    shareReplay({ bufferSize: 1, refCount: true }) // like a behavior subject.
  );

  selectTotal$ = this.selectItems$.pipe(map(items => items.reduce((acc, item) => acc + item.total, 0)));
}
// join the two entitys to give a final view model to the query consumer (component).
function joinItems([listItems, betLines]) {
  return listItems.map(listItem => {
    const betLine = betLines[listItem.betLineId];
    return {
      ...listItem,
      ...betLine, // You can calculate stuff and return the final ViewModel with proper Output Formatting etc...
      sumary: listItem.risk // * betLine.price
    };
  });
}
