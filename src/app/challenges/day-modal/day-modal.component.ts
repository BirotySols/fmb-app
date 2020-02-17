import {Component,OnInit} from '@angular/core';
import {ModalDialogParams} from 'nativescript-angular/modal-dialog';
import {DayStatus, Day} from '../model/day.model';
import { FormControl, Validators } from '@angular/forms';
@Component({
    selector:'ns-day-modal',
    templateUrl:'./day-modal.component.html',
    styleUrls:['./day-modal.component.scss']
})
export class DayModalComponent implements OnInit {
    constructor(private modalParams:ModalDialogParams){}
    loadedDate:Date;
    status:DayStatus;
    private menu:string;
    dayMenu:FormControl= new FormControl(null,{updateOn:'change',validators:[Validators.required]})
    ngOnInit(){
        const parseParams=(this.modalParams.context  as {date,status,menu})
       this.loadedDate= parseParams.date;
       this.status=parseParams.status;
       this.menu=parseParams.menu;
       this.dayMenu.setValue(this.menu);
    }
    updateMenu(){
        if(this.dayMenu.valid){
            this.modalParams.closeCallback({action:DayStatus.Open,menu:this.dayMenu.value});
        }
    }
    onHandleInput(action:DayStatus){
        const updatedMenu=this.dayMenu.value===''?this.menu:this.dayMenu;
        this.modalParams.closeCallback({action,menu:updatedMenu});
    }

}