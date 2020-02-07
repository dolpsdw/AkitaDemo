import { Injectable } from '@angular/core';
import { ListState} from './list.model';
import { EntityStore, StoreConfig } from '@datorama/akita';
import {BetLine} from '../../bet-line/store/betLine.model';


// Store definition + basic setters that will be used on list.service. APP will access list.service but not store. Querys can protected inject the store.
@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'list', // Name of the store
  idKey: 'betLineId' // unique Key of the entitys array. to be stored on ids[]
})
export class ListStore extends EntityStore<ListState> {
  constructor() {
    super();
  }
// All methods that update the state of the store should be defined here. (pure function setters)
  updateRisk(betId: BetLine['id'], riskValue = 0) {
    this.update(betId, entity => {
      //const newQuantity = entity.quantity + operand;
      return {
        ...entity,
        risk: riskValue
      };
    });
  }
  updateWin(betId: BetLine['id'], winValue = 0) {
    this.update(betId, entity => {
      //const newQuantity = entity.quantity + operand;
      return {
        ...entity,
        win: winValue
      };
    });
  }
  updateFreeplay(betId: BetLine['id'], freeplayValue = 0) {
    this.update(betId, entity => {
      //const newQuantity = entity.quantity + operand;
      return {
        ...entity,
        freeplay: freeplayValue
      };
    });
  }
  updateError(betId: BetLine['id'], errorValue = 0) {
    this.update(betId, entity => {
      //const newQuantity = entity.quantity + operand;
      return {
        ...entity,
        error: errorValue
      };
    });
  }

  // This pure setters all called via more logic / validation service exposed as public way to write to the store. (list.service.ts)
}
