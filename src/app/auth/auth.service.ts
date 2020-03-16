import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {hasKey,getString,setString,remove} from 'tns-core-modules/application-settings'
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import {alert} from 'tns-core-modules/ui/dialogs';
import { User } from './user.model';
import { RouterExtensions } from 'nativescript-angular/router';
interface AuthResponse{
    idToken	:string,
    email:	string,	//The email for the newly created user.
    refreshToken:	string,//	A Firebase Auth refresh token for the newly created user.
    expiresIn:	string,	//The number of seconds in which the ID token expires.
    localId:string
}
@Injectable({providedIn:'root'})
export class AuthService{
    private _user= new BehaviorSubject<User>(null);
    private logOutTimer:number;
    get User(){
        return this._user.asObservable();
    }
    constructor(private http:HttpClient,private router:RouterExtensions){}
    public authenticate(email:string,password:string,isSignUp:boolean):Observable<AuthResponse>{
        const url=`${environment.auth.url}${isSignUp ? environment.auth.signUp: environment.auth.signIn}?key=${environment.auth.key}`;
        return this.http.post<AuthResponse>(url,{email,password,returnSecureToken:true})
        .pipe(catchError(errRes=>{
            this.handleError(errRes.error.error.message)
           return throwError(errRes.error.error)
        }),
        tap((resData)=>{
            if(resData && resData.idToken){
                const expiryDate= new Date( new Date().getTime()+parseInt(resData.expiresIn)*1000);
                const user= new User(resData.email,resData.localId,resData.idToken,expiryDate)
                 setString('userData',JSON.stringify(user));
                 this.autoLogout(user.timeToExpiry);
                 this._user.next(user);
            }
            
        }));
    }

    public autoLogin():Observable<boolean>{
        if(!hasKey('userData'))
            return of(false);
        const userParsed:{email:string,id:string,_token:string,expirationDate:string}=JSON.parse(getString('userData'));
        if(!userParsed)
            return of(false);
        const user= new User(userParsed.email,userParsed.id,userParsed._token,new Date(userParsed.expirationDate));
       
        if(user && user.isAuth){
           
            this._user.next(user);
            this.autoLogout(user.timeToExpiry)
            return of(true);
        }
        return of(false);
    }

    private autoLogout(expiryDuration){
        this.logOutTimer=setTimeout(() => {
            this.logout();
        }, expiryDuration);
    }
    public logout(){
        remove('userData');
        if(this.logOutTimer)
            clearTimeout(this.logOutTimer);
        this._user.next(null);
        this.router.navigate(['/auth'],{clearHistory:true});
    }

    private handleError(errorMessage){
        switch(errorMessage){
            case 'EMAIL_EXISTS': 
                alert('The email address is already in use by another account.');
                break;
            case 'EMAIL_NOT_FOUND': 
                alert('There is no user record corresponding to this identifier. The user may have been deleted.');
                break;
            case 'INVALID_PASSWORD': 
                alert('The password is invalid or the user does not have a password.');
                break;
            default:
                alert('authentication failed; Please check user-name or password. Contact admin for any more info')
        }
        
    }
}