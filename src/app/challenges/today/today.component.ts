import {Component, OnInit, OnDestroy} from '@angular/core'
import { Day, DayStatus } from '../model/day.model';
import { ChallengeService } from '~/app/shared/services/challenge.service';
import { Subscription } from 'rxjs';
@Component({
    selector:'ns-today',
    templateUrl:'./today.component.html',
    styleUrls:['./today.component.scss']
})
export class TodayComponent implements OnInit, OnDestroy{
    currentDay:Day;
    private curDaySub:Subscription;
    constructor(private challengeService:ChallengeService){}
    ngOnInit(){
        this.curDaySub=this.challengeService.currentChallenge.subscribe(
            challenge=>{
                if(challenge) 
                    this.currentDay=challenge.currentDay
            }
        )
    }
    ngOnDestroy(){
        if(this.curDaySub)
            this.curDaySub.unsubscribe();
    }
    onHandleInput(action:DayStatus){
        let dayToSave:Day={...this.currentDay};
        dayToSave.status=action;
        //Object.assign(dayToSave,{status:action,...this.currentDay});
        this.challengeService.updateDay(dayToSave);
    }
}