import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url='http://localhost:3000/'

constructor(private httpclient: HttpClient) { }

  public getUsers(): Observable<any>{
    return this.httpclient.get(this.url+'users')
  }

}
