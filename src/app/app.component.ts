import { Component, OnInit, ViewContainerRef } from "@angular/core";
import * as app from 'tns-core-modules/application';
import { UIService } from "./shared/services/ui.service";
import { Subscription } from "rxjs";

import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
    subs:Subscription;
   constructor(private uiService:UIService,private vcRef:ViewContainerRef){

   }
   ngOnInit(){
       this.subs= this.uiService.drawerState.subscribe(()=>{
           const drawer = app.getRootView() as RadSideDrawer
           if(drawer)
            drawer.toggleDrawerState();
       });
       this.uiService.setVCRef(this.vcRef)
   }
   logout(){
       this.uiService.toggleDrawer();
   }
 }
