import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightServiceService {

  public operation = new Subject<string>();
  public enableoperations = new Subject<boolean>();
  constructor() { }
}
