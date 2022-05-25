import { User } from './User';
export class Trajet {
  _user: User = new User();
  _passagers: User[] = Array();
  _depart: string = '';
  _start_latitude: number = 0;
  _start_longitude: number = 0;
  _destination: string = '';
  _nbKms: number = 0;
  _co2Emission: number = 0;
  _departure_time: any = new Date();
}

export class Adress {
  _num: number = 0;
  _addresse: string = '';
  _city: string = '';
  _lat: number = 0;
  _lon: number = 0;
}
