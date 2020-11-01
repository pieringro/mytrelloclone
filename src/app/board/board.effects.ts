import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { AppActions } from './action-types';
import { allListsLoaded } from './board.actions';
import { List } from './model/list';
import { Task } from './model/task';
import { BoardHttpService } from './services/boardHttp.service';

@Injectable()
export class BoardEffects {

    loadLists$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AppActions.loadLists),
                concatMap(action => this.boardHttpService.getAllLists()),
                map(lists => allListsLoaded({ lists }))
            )
    );

    allListsLoaded$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AppActions.allListsLoaded),
                tap(action => {
                    console.log("Effect! Action=", action);
                    localStorage.setItem('lists', JSON.stringify(action.lists));
                })
            ),
        { dispatch: false }
    );


    addTaskToList$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AppActions.addTaskToList),
                tap(action => {
                    this.addAnyTaskToList(action);
                })
            ),
        { dispatch: false }
    );


    removeTaskFromList$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AppActions.removeTaskFromList),
                tap(action => {
                    const listsStorage: List[] = JSON.parse(localStorage.getItem('lists'));
                    const list: List = listsStorage.find(list => list.id == action.listId);
                    list.tasks = list.tasks.filter(task => task.id != action.taskId);

                    localStorage.setItem('lists', JSON.stringify(listsStorage));
                })
            ),
        { dispatch: false }
    );


    addNewTaskToList$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AppActions.addNewTaskToList),
                tap(action => {
                    this.addAnyTaskToList(action);
                })
            ),
        { dispatch: false }
    );

    addNewList$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AppActions.addNewList),
                tap(action => {
                    const listsStorage: List[] = JSON.parse(localStorage.getItem('lists'));
                    listsStorage.push(action.list);

                    localStorage.setItem('lists', JSON.stringify(listsStorage));
                })
            ),
        { dispatch: false }
    );

    changeListOrder$ = createEffect(() =>
        this.actions$.pipe(ofType(AppActions.changeListsOrder),
            tap(action => {
                const listsStorage: List[] = JSON.parse(localStorage.getItem('lists'));
                const list: List = listsStorage.find(list => list.id == action.listId);
                list.seqNum = action.listSeqNum;

                localStorage.setItem('lists', JSON.stringify(listsStorage));
            })
        ),
        { dispatch: false }
    );


    private addAnyTaskToList(action) {
        const listsStorage: List[] = JSON.parse(localStorage.getItem('lists'));
        const list: List = listsStorage.find(list => list.id == action.listId);
        const task: Task = Object.assign({}, action.task);
        task.listId = action.listId;
        if (list.tasks) {
            list.tasks.push(task);
        }
        else {
            list.tasks = [task];
        }

        localStorage.setItem('lists', JSON.stringify(listsStorage));
    }

    constructor(private actions$: Actions,
        private boardHttpService: BoardHttpService) {

    }

}