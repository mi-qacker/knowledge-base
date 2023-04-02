import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {JoinPipe} from './pipe/join/join.pipe';
import {SpinnerComponent} from './ui/spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent, JoinPipe],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [CommonModule, FormsModule, SpinnerComponent, JoinPipe],
})
export class SharedModule {}
