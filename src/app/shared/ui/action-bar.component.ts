import {Component,Input} from '@angular/core';
import { Page, isAndroid } from 'tns-core-modules/ui/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { UIService } from '../services/ui.service';
 declare var android:any;
@Component({
    selector:'ns-action-bar',
    templateUrl:'./action-bar.component.html'
})
export class ActionBarComponent{
   constructor(private page :Page,private router:RouterExtensions,private uiService:UIService){}
    @Input() title:string
    @Input() showBackButton:boolean=true;
    @Input() hasMenu:boolean=true;
    get canGoBack(){
        return this.router.canGoBack() && this.showBackButton;
    }
    get android(){
        return isAndroid;
    }
    onGoBack(){
        this.router.back();
    }
   onActionBarLoaded(){
       if(isAndroid)
       {
            const toolbar=this.page.actionBar.nativeView;
            const backButton= toolbar.getNavigationIcon();
            if(backButton){
                let color = "#171717";
                if(this.hasMenu)
                    color="#ffffff";
                backButton.setColorFilter(android.graphics.Color.parseColor(color)
                ,(<any>android.graphics).PorterDuff.Mode.SRC_ATOP)
            }
               
       }
      
   }
   toggle(){
       this.uiService.toggleDrawer();
   }

}