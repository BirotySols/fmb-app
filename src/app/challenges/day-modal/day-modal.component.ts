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
    menu:string[]=null;
    dayMenu:string;//:FormControl= new FormControl(null,{validators:[Validators.required]})
    ngOnInit(){
        const parseParams=(this.modalParams.context  as {date,status,menu})
       this.loadedDate= parseParams.date;
       this.status=parseParams.status;
       this.menu=parseParams.menu;
    }
    updateMenu(){
        if(this.dayMenu.length>0){
            this.menu=this.dayMenu.split(' ');
            this.modalParams.closeCallback({action:this.status,menu:this.menu});
        }
    }
    onHandleInput(action:DayStatus){
        //const updatedMenu=this.dayMenu.value===''?this.menu:this.dayMenu;
        if(action!==DayStatus.Open)
            this.modalParams.closeCallback({action,menu:this.menu});
        else
            this.modalParams.closeCallback(null)
    }

}