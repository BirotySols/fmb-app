export enum DayStatus {
    Open,
    Completed,
    Failed,
}
export interface Day{
     status:DayStatus;
     dayInMonth:number;
     dayInWeek:number;
     date:Date;
     count:number;
     dayMenu:string
}