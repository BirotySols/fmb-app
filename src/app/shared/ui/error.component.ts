import {Component} from '@angular/core';
@Component({
    selector:'ns-error',
    template:`<ns-action-bar title="Error!!" [showBackButton]="false" [hasMenu]="true"></ns-action-bar><StackLayout class="page">
                <Label class="label h1" text="OOPS!! somethings not right. please try again later" textWrap="true" Width="100%"></Label>
        </StackLayout>`
})
export class ErrorComponent {}