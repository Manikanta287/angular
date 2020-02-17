import { Router } from '@angular/router';
import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { Store, StoreModule } from '@ngrx/store';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule,
      ],
      providers: [AuthGuard,
        { provide: Store, useValue: {} },
      {provide: Router, useValue: {}}]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
