import { NgModule,NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ChallengeEditComponent } from "./challenge-edit.component";
import { SharedModule } from "~/app/shared/shared.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
    imports:[NativeScriptCommonModule,NativeScriptFormsModule,SharedModule,
        NativeScriptRouterModule.forChild([{path:'',component:ChallengeEditComponent}]),
    ],
    declarations:[ChallengeEditComponent],
    schemas:[NO_ERRORS_SCHEMA]
})
export class ChallangeEditModule{

}