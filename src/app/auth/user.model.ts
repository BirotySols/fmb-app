export class User{
    constructor(public email:string,
        public id:string,
        private _token:string,
        private expirationDate:Date){}
        get isAuth(){
            return !!this.token
        }
        get token(){
            if(!this._token || (!this.expirationDate || new Date()>this.expirationDate))
                return null;
            return this._token;
        }
        get timeToExpiry(){
            return this.expirationDate.getTime()- new Date().getTime();
        }

}