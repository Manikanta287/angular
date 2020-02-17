import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class AdminService {
    addpassenger: EventEmitter<string> = new EventEmitter();
}
