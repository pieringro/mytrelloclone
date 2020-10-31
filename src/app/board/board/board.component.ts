import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { BoardState } from '../board.reducer';
import { selectLists } from '../board.selectors';
import { from, Observable } from 'rxjs';
import { List } from '../model/list';
import { BoardStoreService } from '../services/boardStore.service';
import { Task } from '../model/task';
import { concatMap, finalize, first, map, scan, subscribeOn, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(
    private boardStore: BoardStoreService
  ) { }

  lists$: Observable<List[]>;

  allTasks$: Observable<Task[]>;

  listCopy: List[];

  ngOnInit(): void {
    this.lists$ = this.boardStore.getAllData()
      .pipe(
        map(lists => [...lists].sort((a, b) => a.seqNum - b.seqNum))
      );

    this.lists$
      .subscribe(lists => {
        this.listCopy = lists;//.sort((a, b) => a.seqNum - b.seqNum)
      });
  }


  allowDrop($event, i) {
    $event.preventDefault();
  }


  drop($event, i) {
    $event.preventDefault();
    if ($event.dataTransfer.getData("dragging_list")) {
      const listId = $event.dataTransfer.getData("listId");
      const listSeqNum = $event.dataTransfer.getData("listSeqNum");

      const oldList = this.listCopy.find(list => list.seqNum == i);
      const newList = this.listCopy.find(list => list.id == listId);

      if (oldList.id != newList.id) {
        this.boardStore.changeListsOrder(oldList.id, newList.seqNum);
        this.boardStore.changeListsOrder(listId, i);
      }
    }
  }

}
