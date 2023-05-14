import {CommonModule} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {Router} from '@angular/router';
import {LoggedUserService} from 'app/services/auth/logged-user-service/logged-user.service';
import {IRoadMap} from 'app/services/http/road-map-http/road-map';
import {RoadMapHttpService} from 'app/services/http/road-map-http/road-map-http.service';
import {SharedModule} from 'app/shared/shared.module';
import {ConfirmDialogComponent} from 'app/shared/ui/confirm-dialog/confirm-dialog.component';
import {IConfirmDialogData} from 'app/shared/ui/confirm-dialog/confirm-dialog-data';
import {EMPTY, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-road-map',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './road-map.component.html',
  styleUrls: ['./road-map.component.scss'],
})
export class RoadMapComponent {
  @Input({required: true}) public roadMap!: IRoadMap;
  @Input({required: true}) public isOwnerRoadMap?: boolean = false;
  public mode: 'idle' | 'edit' = 'idle';
  public loading: boolean = false;
  public roadMapFormGroup: FormGroup<{
    name: FormControl<string>;
    shortDescription: FormControl<string>;
  }>;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private roadMapHttpService: RoadMapHttpService
  ) {
    this.roadMapFormGroup = this.fb.nonNullable.group({
      name: ['', [Validators.required]],
      shortDescription: ['', [Validators.required]],
    });
  }

  toggleMode() {
    if (this.mode === 'idle') {
      this.roadMapFormGroup.controls.name.setValue(this.roadMap.name);
      this.roadMapFormGroup.controls.shortDescription.setValue(
        this.roadMap.shortDescription
      );
      this.mode = 'edit';
    } else if (this.mode === 'edit') {
      this.loading = true;
      this.roadMapHttpService
        .updateRoadMap(this.roadMap.id, this.roadMapFormGroup.value)
        .subscribe(roadMap => {
          this.roadMap = roadMap;
          this.loading = false;
          this.mode = 'idle';
        });
    }
  }

  deleteRoadMap() {
    const dialogRef = this.dialog.open<
      ConfirmDialogComponent,
      IConfirmDialogData,
      boolean
    >(ConfirmDialogComponent, {
      data: {
        title: 'Удаление дорожной карты',
        content: `Вы действительно хотите удалить дорожную карту «${this.roadMap.name}»?`,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(
        switchMap(result =>
          result
            ? this.roadMapHttpService.deleteRoadMap(this.roadMap.id)
            : EMPTY
        )
      )
      .subscribe(() => {
        this.router.navigateByUrl('/maps');
      });
  }
}
