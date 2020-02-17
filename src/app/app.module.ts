import { AdminModule } from './admin/admin.module';
import { FlightModule } from './flight/flight.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import * as fromAppReducer from './store/app.reducer';
import {environment} from '../environments/environment';
import { AuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { provideConfig } from './home/login/login.component';
import { ServiceWorkerModule } from '@angular/service-worker';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(fromAppReducer.appReducer),
    StoreDevtoolsModule.instrument({logOnly : environment.production}),
    BrowserAnimationsModule,
    HttpClientModule,
    FlightModule,
    AdminModule,
    SocialLoginModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
