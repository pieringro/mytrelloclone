import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
import { BoardStoreService } from '../services/boardStore.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private boardStoreService: BoardStoreService) { }

  @Input()
  task: Task;

  _defaultClass: string = "root";
  _class: string = this._defaultClass;

  ngOnInit(): void {

  }

  dragStart(ev) {
    ev.stopPropagation();
    this._class += " dragging";
    ev.dataTransfer.setData("dragging_task", true);
    ev.dataTransfer.setData("taskId", this.task.id);
    ev.dataTransfer.setData("listId", this.task.listId);
  }
  
  dragEnd(ev) {
    this._class = this._defaultClass;
  }
}
