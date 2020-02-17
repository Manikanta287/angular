import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularMaterialModule } from './../../sharedmodules/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePassengerDetailsComponent } from './update-passenger-details.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UpdatePassengerDetailsComponent', () => {
  let component: UpdatePassengerDetailsComponent;
  let fixture: ComponentFixture<UpdatePassengerDetailsComponent>;

  beforeEach(async(() => {
    // tslint:disable-next-line: max-line-length
    const data = {Index: 1, User: {passengername: '', Address: '', passportNumber: '', ancillaryservices: {meal: '', additionalbaggage: 1}}};
    TestBed.configureTestingModule({
      declarations: [ UpdatePassengerDetailsComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        AngularMaterialModule,

      ],
      providers: [
        {provide: MatDialogRef},
        {provide: MAT_DIALOG_DATA, useValue: data},
        {provide: HttpClient},
        {provide: Store}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePassengerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
