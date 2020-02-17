import { DatabaseService } from './../../sharedservices/database.service';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialModule } from './../../sharedmodules/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerListComponent } from './passenger-list.component';
import { of } from 'rxjs';

describe('PassengerListComponent', () => {
  let component: PassengerListComponent;
  let fixture: ComponentFixture<PassengerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerListComponent ],
      imports : [
        ReactiveFormsModule,
        AngularMaterialModule,
        RouterTestingModule,
      ],
      providers: [
        {provide: HttpClient},
        {provide: Store}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerListComponent);
    component = fixture.componentInstance;
    const service = fixture.debugElement.injector.get(DatabaseService);
    spyOn(service, 'getAllFlights').and.returnValue(of(''));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
