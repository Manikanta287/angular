import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './../../sharedmodules/angular-material/angular-material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerDetailsComponent } from './passenger-details.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('PassengerDetailsComponent', () => {
  let component: PassengerDetailsComponent;
  let fixture: ComponentFixture<PassengerDetailsComponent>;

  beforeEach(async(() => {
    const data = {ancillaryservices: {meal: []}};
    TestBed.configureTestingModule({
      declarations: [ PassengerDetailsComponent ],
      imports: [AngularMaterialModule,
      ReactiveFormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: {} }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerDetailsComponent);
    component = fixture.componentInstance;
    const matdialog = fixture.debugElement.injector.get(MatDialogRef);
    expect(component.data).toBeTruthy();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
