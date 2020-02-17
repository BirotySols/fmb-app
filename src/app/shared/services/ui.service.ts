import {Injectable, ViewContainerRef} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class UIService{
    private _drawerState:BehaviorSubject<void>= new BehaviorSubject<void>(null);
    private _rootVCRef:ViewContainerRef
    public get drawerState(){
        return this._drawerState.asObservable();
    }
    setVCRef(vcRef:ViewContainerRef){
       this._rootVCRef= vcRef;
    }
    getVCRef(){
        return this._rootVCRef;
    }
    public toggleDrawer(){
        this._drawerState.next(null);
    }
}