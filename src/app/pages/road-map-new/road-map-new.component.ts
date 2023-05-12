import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
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
import {Router} from '@angular/router';
import {LoggedUserService} from 'app/services/auth/logged-user-service/logged-user.service';
import {
  ICreateRoadMapDto,
  IRoadMap,
} from 'app/services/http/road-map-http/road-map';
import {RoadMapHttpService} from 'app/services/http/road-map-http/road-map-http.service';
import {EMPTY} from 'rxjs';
import {first, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-road-map-new',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './road-map-new.component.html',
  styleUrls: ['./road-map-new.component.scss'],
})
export class RoadMapNewComponent {
  public loading = false;
  public newRoadMapFormGroup: FormGroup<{
    name: FormControl<string>;
    shortDescription: FormControl<string>;
  }>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loggedUserService: LoggedUserService,
    private roadMapHttpService: RoadMapHttpService
  ) {
    this.newRoadMapFormGroup = this.fb.nonNullable.group({
      name: ['', Validators.required],
      shortDescription: ['', Validators.required],
    });
  }

  createButtonClick() {
    this.loading = true;
    this.loggedUserService.user$
      .pipe(
        first(),
        switchMap(user => {
          const {name, shortDescription} = this.newRoadMapFormGroup.value;
          if (!user) throw Error('Не найдено ID пользователя или ');
          if (!name)
            throw Error('Название дорожной карты должно иметь значения');
          if (!shortDescription)
            throw Error('Короткое описание должно иметь значение');

          const newRoadMap: ICreateRoadMapDto = {
            author: user._id,
            name,
            shortDescription,
          };
          return this.roadMapHttpService.createRoadMap(newRoadMap);
        })
      )
      .subscribe(roadMap => {
        this.loading = false;
        this.router.navigate(['/maps', roadMap.id]);
      });
  }
}
