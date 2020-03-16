import {Component, OnInit,ElementRef,ViewChild} from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {TextField} from 'tns-core-modules/ui/text-field'
import { RouterExtensions } from 'nativescript-angular/router';
import { AuthService } from './auth.service';
@Component({
    selector:'ns-auth',
    templateUrl:'./auth.component.html',
    // styles:[`FlexboxLayout{
    //     justify-content:center;
    //     background:red;
    //     border-color:#171717;
    //     }
    //     `]
})
export class AuthComponent implements OnInit {
    form:FormGroup;
    @ViewChild('emailControl',{static:true}) emailControl:ElementRef<TextField>;
    @ViewChild('passwordControl',{static:true}) passwordControl:ElementRef<TextField>;
    isSignUp:boolean=false;
    isAuthenticating:boolean=false;
    constructor(private router:RouterExtensions,private authService:AuthService){}
    ngOnInit()
    {
        this.form= new FormGroup({
            email: new FormControl(null,{updateOn:'blur',validators:[Validators.required,Validators.email]}),
            password:new FormControl(null,{updateOn:'blur',validators:[Validators.required,Validators.minLength(6)]})
        })
    }
    onSubmit(){
        if(!this.form.valid)
            return;
        this.isAuthenticating=true;
        this.emailControl.nativeElement.focus();
        this.passwordControl.nativeElement.focus();
        this.passwordControl.nativeElement.dismissSoftInput();
        const email=this.form.get('email').value;
        const password=this.form.get('password').value;
        

        this.authService.authenticate(email,password,this.isSignUp).subscribe(
            res=>{
                this.isAuthenticating=false;
                this.router.navigate(['/challenges'],{clearHistory:true});
            },
            err=> {console.log(err)
                this.isAuthenticating=false;
            }
        );
       
    }

    onReturn()
    {
        this.emailControl.nativeElement.focus();
        this.passwordControl.nativeElement.focus();
        this.passwordControl.nativeElement.dismissSoftInput();
    }
}