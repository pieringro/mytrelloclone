import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { List } from '../model/list';
import { BoardStoreService } from '../services/boardStore.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent implements OnInit {

  mode: 'hide' | 'expand';

  form: FormGroup;

  newList: List;

  constructor(
    private boardStore: BoardStoreService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.mode = 'hide';
  }



  addListClick() {
    if (this.mode == 'hide') {
      this.mode = 'expand';
      const formControls = {
        id: null,
        name: ['', Validators.required],
        tasks: [],
        seqNum: null
      }
      this.form = this.formBuilder.group(formControls);
    }
    else {
      this.mode = 'hide';
    }
  }

  newListClick() {
    this.newList = this.form.value;
    if (this.form.valid) {
      this.boardStore.addNewList(this.newList);
      this.mode = 'hide';
    }
  }


}
