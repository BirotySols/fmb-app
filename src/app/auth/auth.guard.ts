import { Injectable } from "@angular/core";
import {CanLoad,Route,UrlSegment, RouteReuseStrategy} from '@angular/router'
import {Observable,of} from 'rxjs';
import { AuthService } from "./auth.service";
import { RouterExtensions } from "nativescript-angular/router";
import { take, switchMap,tap } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanLoad{
    constructor(private authService:AuthService,private router:RouterExtensions){}
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean{
        return this.authService.User.pipe(take(1),switchMap(currentUser=>{
            if(!currentUser || !currentUser.token)
                return this.authService.autoLogin()
            return of(true);
        }),tap(auth=>{
            if(!auth)
                this.router.navigate(['/auth']);
        }))
    }
}