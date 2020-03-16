import { Day, DayStatus } from "./day.model";

export class Challenge{
    constructor(
        public title:string,
        public description:string,
        private year:number,
        private month:number,
        private _days:Day[]=[] ){
        if(_days!==null && _days.length>0)
            return;
        const daysInMonth=new Date(year,month+1,0).getDate();
            
        for(let i=1;i<daysInMonth+1;i++){
            const date=new Date(year,month,i)
            const dow=date.getDay();
            this._days.push({dayInMonth:i,dayInWeek:dow,date:date,status:DayStatus.Open,count:0,dayMenu:null,message:''})
            }
    }

    get currentDay(){
        return this._days.find(d=>d.dayInMonth===new Date().getDate())
    }
    
    get days(){
        return [...this._days];
    }
}