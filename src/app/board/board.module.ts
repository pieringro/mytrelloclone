import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddListComponent } from './add-list/add-list.component';
import { BoardComponent } from './board/board.component';
import { ListComponent } from './list/list.component';
import { TaskComponent } from './task/task.component';
import { StoreModule } from '@ngrx/store';
import { AppActions } from './action-types';
import * as fromBoard from './board.reducer';
import { BoardEffects } from './board.effects';
import { EffectsModule } from '@ngrx/effects';
import { BoardHttpService } from './services/boardHttp.service';
import { HttpClientModule } from '@angular/common/http';
import { AddTaskComponent } from './add-task/add-task.component';
import { BoardStoreService } from './services/boardStore.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddListComponent,
    BoardComponent,
    ListComponent,
    TaskComponent,
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature('board', fromBoard.listReducer),
    EffectsModule.forFeature([BoardEffects])
  ],
  exports: [
    BoardComponent
  ],
  providers: [
    BoardHttpService,
    BoardStoreService
  ]
})
export class BoardModule {
  static forRoot(): ModuleWithProviders<BoardModule> {
    return {
      ngModule: BoardModule,
      providers: [
        BoardHttpService
      ]
    }
  }

}
