import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { List } from '../model/list';
import { Task } from '../model/task';

@Injectable()
export class BoardHttpService {
    constructor(private http: HttpClient) {
        const lastTaskId = localStorage.getItem('lastTaskId');
        if (!lastTaskId) {
            this.lastTaskId = this.startLastTaskId;
        }

        const lastListId = localStorage.getItem('lastListId');
        if (!lastListId) {
            this.lastListId = this.startLastListId;
        }
    }

    // simulazione di storage remoto
    private readonly startLastTaskId = 2;
    public get lastTaskId(): number {
        return Number.parseInt(localStorage.getItem('lastTaskId'));
    }
    public set lastTaskId(v: number) {
        localStorage.setItem('lastTaskId', v.toString());
    }

    private readonly startLastListId = 2;
    public get lastListId(): number {
        return Number.parseInt(localStorage.getItem('lastListId'));
    }
    public set lastListId(v: number) {
        localStorage.setItem('lastListId', v.toString());
    }


    getAllLists(): Observable<List[]> {

        return of([
            {
                id: 1,
                seqNum: 1,
                name: "In Progress",
                tasks: [
                    {
                        id: 2,
                        name: "nome task 3",
                        description: "descrizione task 3",
                        listId: 1
                    }
                ]
            },
            {
                id: 2,
                seqNum: 2,
                name: "Done",
                tasks: []
            },
            {
                id: 0,
                seqNum: 0,
                name: "To Do",
                tasks: [
                    {
                        id: 0,
                        name: "nome task 1",
                        description: "descrizione task 1",
                        listId: 0
                    },
                    {
                        id: 1,
                        name: "nome task 2",
                        description: "descrizione task 2",
                        listId: 0
                    },
                ]
            }
        ])

        // return this.http.get('/api/courses')
        //     .pipe(
        //         map(res => res['payload'])
        //     );
    }


    addNewTask(task: Task): Observable<Task> {
        task.id = this.lastTaskId + 1;
        this.lastTaskId++;
        return of(task);
    }

    addNewList(list: List): Observable<List> {
        list.id = this.lastListId + 1;
        list.seqNum = this.lastListId + 1;
        this.lastListId++;
        return of(list);
    }

}