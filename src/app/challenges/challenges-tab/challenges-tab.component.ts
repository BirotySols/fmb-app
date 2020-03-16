import {Component, OnInit} from '@angular/core';
import {RouterExtensions,PageRoute} from 'nativescript-angular/router'
import {ActivatedRoute} from '@angular/router';
import { Page } from 'tns-core-modules/ui/page';
import { ChallengeService } from '~/app/shared/services/challenge.service';

@Component({
    selector:'ns-challenges',
    templateUrl:'./challenges-tab.component.html',
    styleUrls:['./challenges-tab.component.scss']})
export class ChallengesTabComponent implements OnInit{
    isLoading:boolean=false;
    ngOnInit(){
        this.isLoading=true;
        this.page.actionBarHidden=true;
        this.challengeService.fetchChallenge().subscribe(res=> {
            this.isLoading=false
            this.navigateToTabs();
        } ,
            err=> {
                console.log(err);
                this.isLoading=false;
                this.router.navigate(['error']);
            })
    }
    constructor(private page:Page,private router:RouterExtensions,private route:ActivatedRoute,private challengeService:ChallengeService){}

    private navigateToTabs(){
        setTimeout(() => {
            this.router.navigate([
                { outlets:
                 {
                     currentChallenge:['current-challenge'],
                     today:['today']
                 }
             }],{relativeTo:this.route}
             );
        }, 10);
       
    }
}