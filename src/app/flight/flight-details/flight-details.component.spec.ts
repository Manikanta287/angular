import { DatabaseService } from './../../sharedservices/database.service';
import { AngularMaterialModule } from './../../sharedmodules/angular-material/angular-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDetailsComponent } from './flight-details.component';
import { of } from 'rxjs/internal/observable/of';

describe('FlightDetailsComponent', () => {
  let component: FlightDetailsComponent;
  let fixture: ComponentFixture<FlightDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightDetailsComponent],
      imports: [
        RouterTestingModule,
        AngularMaterialModule
      ],
      providers: [
        {provide: HttpClient},
      {provide: Store}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightDetailsComponent);
    component = fixture.componentInstance;
    const service = fixture.debugElement.injector.get(DatabaseService);
    spyOn(service, 'getAllFlights').and.returnValue(of(''));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
