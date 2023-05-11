import {CommonModule} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {IRoadMap} from 'app/services/http/road-map-http/road-map';

@Component({
  selector: 'app-road-map',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './road-map.component.html',
  styleUrls: ['./road-map.component.scss'],
})
export class RoadMapComponent {
  mode: 'idle' | 'edit' = 'idle';
  name = new FormControl('', [Validators.required]);
  shortDescription = new FormControl('', [Validators.required]);

  @Input({required: true}) public roadMap: IRoadMap | null = null;

  toggleMode() {
    if (this.mode === 'idle') {
      this.name.setValue(this.roadMap?.name ?? null);
      this.shortDescription.setValue(this.roadMap?.shortDescription ?? null);
      this.mode = 'edit';
    } else if (this.mode === 'edit') {
      this.mode = 'idle';
    }
  }
}
