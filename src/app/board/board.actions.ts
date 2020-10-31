import { createAction, props } from '@ngrx/store';
import { List } from './model/list';
import { Task } from './model/task';

export const loadLists = createAction(
    "[Board component] Load Lists"
);

export const allListsLoaded = createAction(
    "[Board component] All Lists Loaded",
    props<{ lists: List[] }>()
);

export const addTaskToList = createAction(
    "[List Component] Add Task To List",
    props<{ listId: number, task: Task }>()
);

export const removeTaskFromList = createAction(
    "[List Component] Remove Task From List",
    props<{ listId: number, taskId: number }>()
);

export const addNewTaskToList = createAction(
    "[Add Task Component] Add New Task",
    props<{ task: Task, listId: number }>()
);

export const changeListsOrder = createAction(
    "[Board Component] Change Lists Order",
    props<{ listId: number, listSeqNum: number }>()
);

export const addNewList = createAction(
    "[Add List Component] Add New List",
    props<{ list: List }>()
);
