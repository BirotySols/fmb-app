import {NgModule} from '@angular/core';
import {NativeScriptRouterModule} from 'nativescript-angular/router';
import {Routes} from '@angular/router';

import { ErrorComponent } from './shared/ui/error.component';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';


const routes:Routes=[
    {path:'challenges',loadChildren:()=>import('./challenges/challenges.module').then(c=>c.ChallengesModule),canLoad:[AuthGuard]},
    {path:'auth',loadChildren:()=>import('./auth/auth.module').then(auth=>AuthModule)},
    {path:'error',component:ErrorComponent},
    {path:'',redirectTo:'/challenges/tabs',pathMatch:'full'}
 ]
@NgModule(
    {
        imports:[NativeScriptRouterModule.forRoot(routes)],//,{enableTracing:true}
        providers:[AuthGuard],
        exports:[NativeScriptRouterModule]
    }
)
export class AppRoutingModule{

}
