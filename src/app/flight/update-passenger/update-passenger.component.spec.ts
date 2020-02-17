import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './../../sharedmodules/angular-material/angular-material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePassengerComponent } from './update-passenger.component';

describe('UpdatePassengerComponent', () => {
  let component: UpdatePassengerComponent;
  let fixture: ComponentFixture<UpdatePassengerComponent>;

  beforeEach(async(() => {
    const data = {Index: 1, User: {passengername: '',
     Address: '', passportNumber: '', ancillaryservices: {meal: '', additionalbaggage: 1}}};
    TestBed.configureTestingModule({
      declarations: [ UpdatePassengerComponent ],
      imports: [
        NoopAnimationsModule,
        AngularMaterialModule,
        ReactiveFormsModule
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
    fixture = TestBed.createComponent(UpdatePassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
