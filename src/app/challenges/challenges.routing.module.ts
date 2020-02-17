import { NgModule,NO_ERRORS_SCHEMA } from "@angular/core"
import { NativeScriptRouterModule, } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { ChallengesTabComponent } from "./challenges-tab/challenges-tab.component";
import { TodayComponent } from "./today/today.component";
import { CurrentChallengeComponent } from "./current-challenge/current-challenge.component";

const routes:Routes=[
    {path:'tabs',component:ChallengesTabComponent
        ,children:[
            {path:'today',component:TodayComponent,outlet:'today'},
            {path:'current-challenge',component:CurrentChallengeComponent,outlet:'currentChallenge'},
        ]},
        {path:':mode',loadChildren:()=>import('./challenge-edit/challenge-edit.module').then(ce=>ce.ChallangeEditModule)},
        {path:'',redirectTo:'/challenges/tabs',pathMatch:'full'}
]
@NgModule({
    imports:[NativeScriptRouterModule.forChild(routes)],
    exports:[NativeScriptRouterModule],
    schemas:[NO_ERRORS_SCHEMA]
})
export class ChallengesRoutingModule{

}