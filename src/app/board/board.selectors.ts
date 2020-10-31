import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardState } from './board.reducer';
import { List } from './model/list';
import { Task } from './model/task';

export const selectAppState = createFeatureSelector<BoardState>("board");

export const selectLists = createSelector(
    selectAppState,
    state => state.lists
);

export const selectList = createSelector(
    selectLists,
    (lists, prop) => lists.find(list => list["id"] == prop["listId"])
);

interface SelectTaskProperties {
    taskId: number,
    listId: number
}

export const selectTask = createSelector<BoardState, SelectTaskProperties, List[], Task>(
    selectLists,
    (lists, prop) => {
        const list = lists.find(list => list.id == prop.listId);
        return list.tasks.find(task => task.id == prop.taskId);
    }
);
