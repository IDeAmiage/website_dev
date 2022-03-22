import { User } from './User';
export class Trajet {
  _user: User = new User();
  _passagers: User[] = Array();
  _depart: string='';
  _destination: string='';
  _nbKms: number=0;
  _co2Emission: number=0;
}

export class Adress {
  _num:number=0;
  _addresse:string="";
  _city:string="";
  _lat:number=0;
  _lon:number=0;
}
