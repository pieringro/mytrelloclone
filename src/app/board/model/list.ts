import { Task } from './task';

export interface List {
    id: number,
    name: string;
    taskCount?: number;
    tasks: Task[];
    seqNum: number;
}