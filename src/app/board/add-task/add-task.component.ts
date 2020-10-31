import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../model/task';
import { BoardStoreService } from '../services/boardStore.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  @Input()
  listId: number;

  form: FormGroup;

  newTask: Task;

  mode: 'hide' | 'expand';

  constructor(
    private boardStore: BoardStoreService,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.mode = 'hide';
  }

  addTaskClick() {
    if (this.mode == 'hide') {
      this.mode = 'expand';
      const formControls = {
        id: null,
        name: ['', Validators.required],
        description: '',
        listId: null,
      }
      this.form = this.formBuilder.group(formControls);
    }
    else {
      this.mode = 'hide';
    }
  }

  newTaskClick() {
    this.newTask = this.form.value;
    if (this.form.valid) {
      this.boardStore.addNewTaskToList(this.newTask, this.listId);
      this.mode = 'hide';
    }
  }
}
