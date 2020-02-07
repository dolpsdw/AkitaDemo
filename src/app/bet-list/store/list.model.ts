
import { BetLine } from '../../bet-line/store/betLine.model';
import {EntityState} from '@datorama/akita';

export interface ListState extends EntityState<ListItem> {
  // Here goes common propertys for all the list
  /*export interface EntityState<T> {
  entities: HashMap<T>;
  ids: ID[];
  loading: boolean;
  error: any;
  ...customListProperty outside of list entitites.
}*/
  title: '';
  sumary: '';

}
export interface ListItem {
  betLineId: BetLine['id']; // Reference to acces Data of the line entity
  // Data of the Line in the context of being in a list (ListItem)
  risk: number;
  win: number;
  freeplay: boolean;
  error: string;
}

export function createListItem(params: Partial<ListItem>) {
  return {
    risk: 0,
    win: 0,
    freeplay: false,
    error: '',
    ...params
  } as ListItem;
}
