import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpendatasoftV1Service {

  public url = "https://public.opendatasoft.com/api/records/1.0/search/"

  public current_dataset:any;

constructor(private httpclient: HttpClient) { }

public getAirquality(): Observable<any>{
  return this.httpclient.get(this.url+"?dataset=qualite-de-lair-france&q=landes&sort=measurements_lastupdated&facet=country&facet=city&facet=location&facet=measurements_parameter&facet=measurements_sourcename&facet=measurements_lastupdated&facet=country_name_en")
}

public getCatalog(): Observable<any>{
  return this.httpclient.get(this.url + "?dataset=public-catalog&q=&rows=618&sort=data_processed&facet=theme&facet=keyword&facet=license&facet=language&facet=publisher");
}

public getDataset(name: any): Observable<any>{
  return this.httpclient.get(this.url+"?dataset="+name+"&rows=100");
}


}
