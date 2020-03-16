import { NgModule,NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {ActionBarComponent} from './ui/action-bar.component';
import { MenuItemsComponent } from "./ui/menu-items/menu-items.component";
@NgModule({
    imports :[NativeScriptCommonModule,NativeScriptRouterModule],
    declarations:[ActionBarComponent,MenuItemsComponent],
    exports:[ActionBarComponent,MenuItemsComponent],
    schemas:[NO_ERRORS_SCHEMA]
})
export class SharedModule{

}