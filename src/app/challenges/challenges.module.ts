import { NgModule,NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {NativeScriptCommonModule} from 'nativescript-angular/common';
import { SharedModule } from "../shared/shared.module";
import {ChallengeActionsModule}  from './challenge-actions/challenge-actions.module';
import { ChallengesTabComponent } from "./challenges-tab/challenges-tab.component";
import { CurrentChallengeComponent } from "./current-challenge/current-challenge.component";
import { ChallengesRoutingModule } from "./challenges.routing.module";
import { TodayComponent } from "./today/today.component";

@NgModule({
    imports :[NativeScriptCommonModule,NativeScriptRouterModule,SharedModule,ChallengeActionsModule,ChallengesRoutingModule],
    declarations:[ChallengesTabComponent,CurrentChallengeComponent,TodayComponent],
    schemas:[NO_ERRORS_SCHEMA]
})
export class ChallengesModule{

}