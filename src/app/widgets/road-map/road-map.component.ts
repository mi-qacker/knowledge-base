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
import {RoadMapHttpService} from 'app/services/http/road-map-http/road-map-http.service';

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
  @Input({required: true}) public roadMap: IRoadMap | null = null;
  mode: 'idle' | 'edit' = 'idle';
  loading: boolean = false;
  roadMapFormGroup: FormGroup<{
    name: FormControl<string>;
    shortDescription: FormControl<string>;
  }>;

  constructor(
    private fb: FormBuilder,
    private roadMapHttpService: RoadMapHttpService
  ) {
    this.roadMapFormGroup = this.fb.nonNullable.group({
      name: ['', [Validators.required]],
      shortDescription: ['', [Validators.required]],
    });
  }

  toggleMode(roadMap: IRoadMap) {
    if (this.mode === 'idle') {
      this.roadMapFormGroup.controls.name.setValue(this.roadMap?.name ?? '');
      this.roadMapFormGroup.controls.shortDescription.setValue(
        this.roadMap?.shortDescription ?? ''
      );
      this.mode = 'edit';
    } else if (this.mode === 'edit') {
      const fromValues = this.roadMapFormGroup.value;
      this.loading = true;
      this.roadMapHttpService
        .updateRoadMap(roadMap.id, fromValues)
        .subscribe(roadMap => {
          this.roadMap = roadMap;
          this.loading = false;
          this.mode = 'idle';
        });
    }
  }
}
