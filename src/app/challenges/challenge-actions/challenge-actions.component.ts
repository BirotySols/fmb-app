import {Component,Output,Input,EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { DayStatus } from '../model/day.model';
@Component({
    selector:"ns-challenge-actions",
    templateUrl:"./challenge-actions.component.html",
    styleUrls:["./challenge-actions.component.scss"]
})
export class ChallengeActionsComponent implements OnChanges {
    @Input() resetText:string="Cancel";
    @Output() actionSelected= new EventEmitter<DayStatus>();
    @Input() actionStatus:DayStatus
    @Input() disableAction:boolean;
    status:DayStatus=DayStatus.Open;
    done:boolean=false;
    
    ngOnChanges(changes:SimpleChanges){
        if(changes.actionStatus){
            this.status=changes.actionStatus.currentValue;
            if(this.status=== DayStatus.Open)
                this.done=false;
        }
        if(changes.disableAction){
            this.done=changes.disableAction.currentValue;
        }
    }
    onStatusChange(action:'complete'|'fail'|'cancel'){
        let status=DayStatus.Open;
        this.done=true;
        if(action ==='complete')
            status=DayStatus.Completed;
        else if (action==='fail')
            status=DayStatus.Failed; 
         else
            this.done=false;
        this.actionSelected.emit(status);
    }

}
