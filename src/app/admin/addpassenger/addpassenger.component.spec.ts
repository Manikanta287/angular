import { DatabaseService } from './../../sharedservices/database.service';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularMaterialModule } from './../../sharedmodules/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpassengerComponent } from './addpassenger.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AddpassengerComponent', () => {
  let component: AddpassengerComponent;
  let fixture: ComponentFixture<AddpassengerComponent>;

  beforeEach(async(() => {
    const data = {flightId: 1};
    TestBed.configureTestingModule({
      declarations: [ AddpassengerComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        AngularMaterialModule
      ],
      providers: [
        {provide: MatDialogRef},
        {provide: HttpClient},
        {provide: Store},
        {provide: MAT_DIALOG_DATA, useValue: data}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpassengerComponent);
    component = fixture.componentInstance;
    const flighservice = fixture.debugElement.injector.get(DatabaseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
