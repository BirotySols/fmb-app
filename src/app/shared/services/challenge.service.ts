import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from "rxjs";
import { Challenge } from "~/app/challenges/model/challenge.model";
import { DayStatus, Day } from "~/app/challenges/model/day.model";
import {take, tap} from 'rxjs/operators';
import { environment } from "~/environments/environment";
@Injectable({providedIn:'root'})
export class ChallengeService{
    private uri=environment.endpoint+'challenge.json';
    constructor(private http:HttpClient){}
    private _currentChallenge= new BehaviorSubject<Challenge>(null);

    public get currentChallenge(){
        return this._currentChallenge.asObservable();
    }

    public fetchChallenge(){
        return this.http.get<{
            title,description,year,month,_days:Day[]
        }>(this.uri).pipe(tap(resData=>{
            
            if(resData)
                this._currentChallenge.next(
                new Challenge(resData.title,resData.description,
                    resData.year,resData.month,resData._days))
            }
        ))
    }
    public createChallenge(challenge:Challenge){
        this.sendToServer(challenge);
        this._currentChallenge.next(challenge);
    }

    updateDayStatus(dayInMonth:number,status:DayStatus,dayMenu:string){
        this._currentChallenge.pipe(take(1)).subscribe(challenge=>{
            if(!challenge || challenge.days.length<dayInMonth)
                return;
            const dayIndex=challenge.days.findIndex(d=>d.dayInMonth===dayInMonth)
            challenge.days[dayIndex].status=status;
            challenge.days[dayIndex].dayMenu=dayMenu;
            this.sendToServer(challenge);
            this._currentChallenge.next(challenge);
        })
    }

    private  sendToServer(challenge:Challenge){
        
         this.http.put(this.uri,challenge).subscribe();
        
    }

}