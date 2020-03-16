import {Component,Input} from '@angular/core';
@Component(
    {
        selector:'ns-menu-items',
        templateUrl:'./menu-items.component.html',
        styleUrls:['./menu-items.component.scss']
    }
)
export class MenuItemsComponent {
    @Input() menuItems:string[];
   
}