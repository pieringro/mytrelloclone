import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { AppActions } from './action-types';
import { List } from './model/list';
import { Task } from './model/task';

export interface BoardState {
    lists: List[]
}



export const initialAppState: BoardState = {
    lists: undefined
}

export const listReducer = createReducer(
    initialAppState,
    on(AppActions.allListsLoaded, (state, action) => {
        return {
            lists: action.lists
        }
    }),
    on(AppActions.addTaskToList, (state, action) => {
        let newState: BoardState = addAnyTaskToList(state, action);
        return newState;
    }),
    on(AppActions.removeTaskFromList, (state, action) => {
        let newState: BoardState = JSON.parse(JSON.stringify(state)); //deep copy
        const list: List = newState.lists.find(list => list.id == action.listId);
        list.tasks = list.tasks.filter(task => task.id != action.taskId);
        return newState;
    }),
    on(AppActions.addNewTaskToList, (state, action) => {
        let newState: BoardState = addAnyTaskToList(state, action);
        return newState;
    }),
    on(AppActions.changeListsOrder, (state, action) => {
        let newState: BoardState = JSON.parse(JSON.stringify(state));
        const list: List = newState.lists.find(list => list.id == action.listId);
        list.seqNum = action.listSeqNum;
        return newState;
    }),
    on(AppActions.addNewList, (state, action) => {
        let newState: BoardState = JSON.parse(JSON.stringify(state));
        newState.lists.push(action.list);
        return newState;
    })
);

function addAnyTaskToList(state, action) {
    let newState: BoardState = JSON.parse(JSON.stringify(state)); //deep copy
    const list: List = newState.lists.find(list => list.id == action.listId);

    const task: Task = Object.assign({}, action.task);
    task.listId = action.listId;

    if (list.tasks) {
        list.tasks.push(task);
    }
    else {
        list.tasks = [task];
    }

    return newState;
}