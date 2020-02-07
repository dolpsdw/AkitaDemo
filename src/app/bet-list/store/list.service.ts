import { Injectable } from '@angular/core';
import { ListStore } from './list.store';
import { ListQuery } from './list.query';
import { createListItem } from './list.model';
import { ID } from '@datorama/akita';
import { BetLine } from '../../bet-line/store/betLine.model';
// This service digest all the write requests to the store, and apply validation/ formatting of the input data to the DataModel scheme.
@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(private listStore: ListStore, private listQuery: ListQuery) {}
  // Service write operations with Validation || Formating || Busines, logic
  addBetLineToList(betLineId: BetLine['id']) {
    const findItem = this.listQuery.getEntity(betLineId); // This goes to listQuery store and from the entity[] get the one wich id [idkey:betLineId] is betLineId;
    if (!!findItem) { // If item is already on list.
      return; // this.listStore.updateQuantity(productId); the examples add to the cart another item
    }
    // If element not in the list.
    const item = createListItem({ // Create an empty one overwritting the default createListItem with the betLineId value
      betLineId
    });

    return this.listStore.add(item); // This will create a Store Event and will notify all Store-Query subs.
  }

  updateRisk(betLineId: BetLine['id'], riskValue) {
    const findItem = this.listQuery.getEntity(betLineId);
    if (!findItem) { // If item is no already on list.
      return; // Or throw error...
    }
    // You can do more condition requeriments before update. Like isLoading or isError ...
    // Also you can call calculate Win api , wait for response and update the store with the new values.
    this.listStore.updateRisk(betLineId, riskValue);
    return;
  }

  remove(betLineId: ID) { // Also you can call calculate parlay with the removed Line and then when you have the final value in to store you setLoading false
    this.listStore.remove(betLineId); // Call Store to remove the betLineId entity from store.entity[] array. and Notify Store-Query subs.
  }
}
