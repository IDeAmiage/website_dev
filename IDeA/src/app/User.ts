import { Car } from './Car';
export class User {
 _id : any;
 _name: string="";
 _phone: string="";
 _car: Car = new Car();
 _level: number=1;
 _co2: number=0;
 _avis: string[] = new Array();
 _note: number=0;
 _nbTrajects: number=0;
 _score: number=0;
 _strava_account: string="";
 _entreprise:string="";
}
