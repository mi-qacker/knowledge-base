import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {JoinPipe} from './pipe/join/join.pipe';
import {ConfirmDialogComponent} from './ui/confirm-dialog/confirm-dialog.component';
import {SpinnerComponent} from './ui/spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent, JoinPipe, ConfirmDialogComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [CommonModule, FormsModule, SpinnerComponent, JoinPipe],
})
export class SharedModule {}
