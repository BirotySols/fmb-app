import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import {ModalDialogService, ModalDialogParams} from 'nativescript-angular/modal-dialog'
import { UIService } from '~/app/shared/services/ui.service';
import {DayModalComponent} from '../day-modal/day-modal.component';
import { ChallengeService } from '~/app/shared/services/challenge.service';
import { Challenge } from '../model/challenge.model';
import { Day, DayStatus } from '../model/day.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challenge.component.html',
  styleUrls: ['./current-challenge.component.scss'],
  moduleId: module.id
})
export class CurrentChallengeComponent implements OnInit,OnDestroy  {
  weekDays:string[]=['S','M','T','W','T','F','S'];
  currentChallenge:Challenge;
  currentMonth=new Date().getMonth();
  currentYear= new Date().getFullYear();
  firstDayOfMonth= new Date(this.currentYear,this.currentMonth,1).getDay();
  challengeSub:Subscription;
  constructor(private modalService:ModalDialogService,
    private challengeService:ChallengeService,
    private vcRef:ViewContainerRef,
    private uiService:UIService){}
    ngOnInit(){
      this.challengeSub=this.challengeService.currentChallenge.subscribe(
        challenge=>this.currentChallenge = challenge
      )
     }

     ngOnDestroy(){
       if(this.challengeSub)
        this.challengeSub.unsubscribe();
     }

    getRow(index,day:Day){
      const row=1;
      const addRow=Math.floor(index/7);
      const addNextRow= day.dayInWeek<this.firstDayOfMonth?1:0;
      return row+addRow+addNextRow;
    }
    
  onChangeStatus(day:Day){
    if(!this.isSettable(day.dayInMonth))
      return;

    this.modalService.showModal(DayModalComponent,{
      fullscreen:true,
      context:{date:day.date,status:day.status,menu:day.dayMenu},
      viewContainerRef:this.uiService.getVCRef()? this.uiService.getVCRef():this.vcRef 
    }).then((modRes:{action:DayStatus,menu:string})=>{
      if(modRes.action!==DayStatus.Open)
        this.challengeService.updateDayStatus(day.dayInMonth,modRes.action,modRes.menu);
    });
  }

  isSettable(dayInMonth:number){
    return dayInMonth>= new Date().getDate();
  }

 
}
