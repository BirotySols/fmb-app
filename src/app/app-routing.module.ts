import {NgModule} from '@angular/core';
import {NativeScriptRouterModule} from 'nativescript-angular/router';
import {Routes} from '@angular/router';
import { AuthComponent } from './auth/auth.component';


const routes:Routes=[
    {path:'',component:AuthComponent,pathMatch:'full'},
    {path:'challenges',loadChildren:()=>import('./challenges/challenges.module').then(c=>c.ChallengesModule)},
 ]
@NgModule(
    {
        imports:[NativeScriptRouterModule.forRoot(routes)],//,{enableTracing:true}
        exports:[NativeScriptRouterModule]
    }
)
export class AppRoutingModule{

}
