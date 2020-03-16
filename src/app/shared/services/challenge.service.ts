import { Injectable, OnDestroy } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, of, Subscription } from "rxjs";
import { Challenge } from "~/app/challenges/model/challenge.model";
import { DayStatus, Day } from "~/app/challenges/model/day.model";
import {take, tap, switchMap} from 'rxjs/operators';
import { environment } from "~/environments/environment";
import { AuthService } from "~/app/auth/auth.service";
@Injectable({providedIn:'root'})
export class ChallengeService implements OnDestroy{
   
    constructor(private http:HttpClient,private authService:AuthService){
        this.subs=this.authService.User.subscribe(user=>{
            if(!user)
                this._currentChallenge.next(null);
        })
    }
    private _currentChallenge= new BehaviorSubject<Challenge>(null);
    private subs:Subscription;
    public get currentChallenge(){
        return this._currentChallenge.asObservable();
    }

    public fetchChallenge(){
        console.log('here');
        return this.authService.User.pipe(
            take(1),
            switchMap(currentUser=>{
            if(!currentUser || !currentUser.isAuth)
               return of(null);
            return this.http.get<{
                title,description,year,month,_days:Day[]
            }>(`${environment.endpoint}challenge/${currentUser.id}.json?auth=${currentUser.token}`)
        }),tap(resData=>{
            if(resData){
                if(resData.month>= new Date().getMonth())
                this._currentChallenge.next(
                    new Challenge(resData.title,resData.description,
                        resData.year,resData.month,resData._days));
            }
                
            }
        ))
        
    }
    public createChallenge(challenge:Challenge){
        this.sendToServer(challenge);
        this._currentChallenge.next(challenge);
    }

    updateDay(day:Day){
        this._currentChallenge.pipe(take(1)).subscribe(challenge=>{
            if(!challenge || challenge.days.length<day.dayInMonth)
                return;
            const dayIndex=challenge.days.findIndex(d=>d.dayInMonth===day.dayInMonth)
           challenge.days[dayIndex].dayMenu=day.dayMenu;
           challenge.days[dayIndex].status=day.status;
           challenge.days[dayIndex].message=day.message;
            this.sendToServer(challenge);
            this._currentChallenge.next(challenge);
        })
    }
    ngOnDestroy(){
        if(this.subs)
            this.subs.unsubscribe();
    }
    private  sendToServer(challenge:Challenge){
         this.authService.User.pipe(take(1),switchMap(currentUser=>{
            if(!currentUser || !currentUser.isAuth)
                return of(null);
             return this.http.put(`${environment.endpoint}challenge/${currentUser.id}.json?auth=${currentUser.token}`,challenge)
        }))
         .subscribe();
        
    }

}