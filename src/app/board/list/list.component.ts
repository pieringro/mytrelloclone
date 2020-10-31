import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../model/list';
import { Task } from '../model/task';
import { BoardStoreService } from '../services/boardStore.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(
    private boardStore: BoardStoreService
  ) { }

  @Input()
  listId: number;

  list$: Observable<List>;

  listSeqNum: number;

  _defaultClass: string = "card";
  _class: string;

  ngOnInit(): void {
    this.list$ = this.boardStore.getList(this.listId);
    this.list$
      .subscribe(list => this.listSeqNum = list.seqNum);

    this._class = this._defaultClass;
  }


  allowDrop($event) {
    $event.preventDefault();
  }


  drop($event) {
    $event.preventDefault();

    if ($event.dataTransfer.getData("dragging_task")) {
      const listIdSource = $event.dataTransfer.getData("listId");

      if (listIdSource != this.listId) {
        const taskId = $event.dataTransfer.getData("taskId");

        this.boardStore.getTask(listIdSource, taskId)
          .subscribe(task => {
            this.boardStore.addTaskToList(this.listId, task);
            this.boardStore.removeTaskFromList(listIdSource, taskId);
          });
      }
    }
  }

  dragStart(ev) {
    this._class += " dragging";
    ev.dataTransfer.setData("dragging_list", true);
    ev.dataTransfer.setData("listId", this.listId);
    ev.dataTransfer.setData("listSeqNum", this.listSeqNum);
  }

  dragEnd(ev) {
    this._class = this._defaultClass;
  }
}
