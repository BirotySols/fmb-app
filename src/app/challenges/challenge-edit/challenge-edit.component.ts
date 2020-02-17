import {Component, OnInit} from '@angular/core';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import { ChallengeService } from '~/app/shared/services/challenge.service';
import { Challenge } from '../model/challenge.model';
import { take } from 'rxjs/operators';

@Component({
    selector:'ns-challange-edit',
    templateUrl:'./challenge-edit.component.html',
    styleUrls:['./challenge-edit.component.scss']
})
export class ChallengeEditComponent implements OnInit{
    constructor(private pageRoute:PageRoute,private router:RouterExtensions,
        private challengeService:ChallengeService){}
     isEdit:boolean=false;
     challenge:Challenge=new Challenge('','', new Date().getFullYear(),new Date().getMonth() );
    ngOnInit(){
        this.pageRoute.activatedRoute.subscribe(route=>{
            route.paramMap.subscribe(params=>{
                this.isEdit=params.has('mode') && params.get('mode')==='edit';
                if(this.isEdit){
                    this.challengeService.currentChallenge.pipe(take(1)).subscribe(challenge=>{
                        this.challenge=challenge;
                    });
                }
                
            });
        })
    }
    onSubmit(){
    
        this.challengeService.createChallenge( this.challenge)
        this.router.backToPreviousPage();
    }
}