import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { first, map, scan, switchMap } from 'rxjs/operators';
import { AppActions } from '../action-types';
import { BoardState } from '../board.reducer';
import { selectList, selectLists, selectTask } from '../board.selectors';
import { List } from '../model/list';
import { Task } from '../model/task';
import { BoardHttpService } from './boardHttp.service';

@Injectable()
export class BoardStoreService {
    constructor(
        private store: Store<BoardState>,
        private boardHttp: BoardHttpService
    ) {

    }

    loadLists() {
        const lists = localStorage.getItem('lists');
        if (lists) {
            this.store.dispatch(AppActions.allListsLoaded({ lists: JSON.parse(lists) }));
        }
        else {
            this.store.dispatch(AppActions.loadLists());
        }
    }

    getAllData(): Observable<List[]> {
        return this.store
            .pipe(
                select(selectLists)
            );
    }

    getList(listId: number): Observable<List> {
        return this.store
            .pipe(
                select(selectList, { listId })
            );
    }

    getTask(listId: number, taskId: number): Observable<Task> {
        return this.store
            .pipe(
                select(selectTask, { listId, taskId }),
                first(),
            );
    }

    addTaskToList(listId: number, task: Task) {
        this.store.dispatch(AppActions.addTaskToList({ listId, task }));
    }

    removeTaskFromList(listId: number, taskId: number) {
        this.store.dispatch(AppActions.removeTaskFromList({ listId, taskId }));
    }

    addNewTaskToList(task: Task, listId: number) {
        // pessimistic
        this.boardHttp.addNewTask(task).subscribe(task => {
            this.store.dispatch(AppActions.addNewTaskToList({ task, listId }));
        })
    }

    changeListsOrder(listId: number, listSeqNum: number) {
        this.store.dispatch(AppActions.changeListsOrder({ listId, listSeqNum }));
    }

    addNewList(list: List) {
        // pessimistic
        this.boardHttp.addNewList(list).subscribe(task => {
            this.store.dispatch(AppActions.addNewList({ list }));
        });
    }
}