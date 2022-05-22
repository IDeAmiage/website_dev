import { environment } from './../environments/environment';
import { Trajet } from './Trajet';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from './Car';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url='http://localhost:3000/'

constructor(private httpclient: HttpClient) { }

  public getUsers(): Observable<any>{
    return this.httpclient.get(this.url+'users')
  }

  public getPositionFromAdress(numAdrr: number, adress: string, city:string){
    adress = adress.replace(/\s/g, "+");
    switch (true) {
      case adress === "":
        return this.httpclient.get("https://nominatim.openstreetmap.org/search?q="+city+"&format=json&addressdetails=1")
      case numAdrr == 0:
        return this.httpclient.get("https://nominatim.openstreetmap.org/search?q="+adress+",+"+city+"&format=json&addressdetails=1")
      default:
        return this.httpclient.get("https://nominatim.openstreetmap.org/search?q="+numAdrr+"+"+adress+",+"+city+"&format=json&addressdetails=1");
    }
  }

  // public getCo2Calculation(car: Car){
  //   const headers = { 'content-type': 'application/json'}
  //   const body=JSON.stringify(car);
  //   console.log(body)
  //   return this.httpclient.post("https://api.myclimate.org/v1/", body,{'headers':headers})
  // }

  public getCo2Calculation(trajet : Trajet){
    return this.httpclient.get(this.url+'car/carbonemission/'+trajet._nbKms+'/'+trajet._user._car._type+'/'+ trajet._user._car._carburant);
  }

  public sendNewPassengerEmail(user: any){
    this.httpclient.post("http://localhost:3000/users/sendmail", user).subscribe(
      data => {
        let res:any = data;
        console.log(
          `👏 > 👏 > 👏 > 👏 ${user.name} is successfully added to the traject and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  public sendNotificationNewPassenger(user:any){
    const headers = new HttpHeaders({
      'Content-Type':'application/json; charset=utf-8',
      'Authorization':"key="+environment.firebase.serverKey
    });
    console.log('ici',localStorage.getItem("notifToken"));

    const bod = {
      "notification": {
        "title": "Nouveau passager",
        "body": user._name
     },
     "to" : localStorage.getItem("notifToken")
    }
    this.httpclient.post("https://fcm.googleapis.com/fcm/send",bod,{headers:headers}).subscribe(
      res=> {console.log(res);},
      err => {console.log(err);}
    )
  }

}
