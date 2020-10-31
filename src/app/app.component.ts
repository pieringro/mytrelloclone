import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { allListsLoaded, loadLists } from './board/board.actions';
import { AppState } from './app.reducer';
import { BoardState } from './board/board.reducer';
import { BoardStoreService } from './board/services/boardStore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MyTrello';


  constructor(
    private boardStore: BoardStoreService
  ) { }

  ngOnInit(): void {
    this.boardStore.loadLists();
  }
}
