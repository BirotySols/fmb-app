import { NgModule, NO_ERRORS_SCHEMA,ErrorHandler } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import {NativeScriptUISideDrawerModule} from 'nativescript-ui-sidedrawer/angular';
import {enable as enableTrace} from 'tns-core-modules/trace';

import { AppComponent } from './app.component';

import { AuthComponent } from './auth/auth.component';

import { AppRoutingModule } from './app-routing.module';


import { DayModalComponent } from './challenges/day-modal/day-modal.component';
import { SharedModule } from './shared/shared.module';
import { ChallengeActionsModule } from './challenges/challenge-actions/challenge-actions.module';
import { ReactiveFormsModule } from '@angular/forms';


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

export class ErrorHandle implements ErrorHandler{
  handleError(error){
    console.log(`error in application : ${error}`);
  }
}
//enableTrace();

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, NativeScriptUISideDrawerModule,NativeScriptFormsModule,
    ReactiveFormsModule,NativeScriptHttpClientModule,SharedModule,ChallengeActionsModule,
    AppRoutingModule],
  declarations: [AppComponent, AuthComponent,DayModalComponent],
  providers: [{provide:ErrorHandler,useClass:ErrorHandle}],
  entryComponents:[DayModalComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
