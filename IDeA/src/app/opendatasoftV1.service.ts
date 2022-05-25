import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * This service interact with the opendatasoft api
 *
 * @export
 * @class OpendatasoftV1Service
 */
@Injectable({
  providedIn: 'root'
})
export class OpendatasoftV1Service {

  public url = "https://public.opendatasoft.com/api/records/1.0/search/"

  public current_dataset:any;

/**
 * Creates an instance of OpendatasoftV1Service.
 * @param {HttpClient} httpclient
 * @memberof OpendatasoftV1Service
 */
constructor(private httpclient: HttpClient) { }

/**
 * This method return the air quality for Landes departement
 *
 * @return {*}  {Observable<any>}
 * @memberof OpendatasoftV1Service
 */
public getAirquality(): Observable<any>{
    return this.httpclient.get(this.url+"?dataset=qualite-de-lair-france&q=landes&sort=measurements_lastupdated&facet=country&facet=city&facet=location&facet=measurements_parameter&facet=measurements_sourcename&facet=measurements_lastupdated&facet=country_name_en")
  }

/**
 * Return The entire catalog of datasets provided by the api
 *
 * @return {*}  {Observable<any>}
 * @memberof OpendatasoftV1Service
 */
public getCatalog(): Observable<any>{
    return this.httpclient.get(this.url + "?dataset=public-catalog&q=&rows=618&sort=data_processed&facet=theme&facet=keyword&facet=license&facet=language&facet=publisher");
  }

/**
 * Method to get the dataset by the dataset id
 * This method is only used to show the data in the table that's why there is only 100 rows
 *
 * @param {*} name
 * @return {*}  {Observable<any>}
 * @memberof OpendatasoftV1Service
 */
public getDataset(name: any): Observable<any>{
    return this.httpclient.get(this.url+"?dataset="+name+"&rows=100");
  }

/**
 * Using the Sirene V3 dataset this method return the list of entreprises presents in the 40230
 *
 * @return {*}  {Observable<any>}
 * @memberof OpendatasoftV1Service
 */
public getListEntreprises(): Observable<any>{
    return this.httpclient.get("https://public.opendatasoft.com/api/records/1.0/search/?dataset=economicref-france-sirene-v3&q"+
                  "&facet=statutdiffusionetablissement&facet=trancheeffectifsetablissement&facet=etablissementsiege&facet=libellecommuneetablissement"+
                  "&facet=etatadministratifetablissement&facet=nomenclatureactiviteprincipaleetablissement&facet=caractereemployeuretablissement&facet=unitepurgeeunitelegale"+
                  "&facet=sexeunitelegale&facet=trancheeffectifsunitelegale&facet=categorieentreprise&facet=epcietablissement&facet=departementetablissement&facet=regionetablissement"+
                  "&facet=sectionetablissement&facet=soussectionetablissement&facet=divisionetablissement&facet=groupeetablissement&facet=classeetablissement&facet=sectionunitelegale"+
                  "&facet=classeunitelegale&facet=naturejuridiqueunitelegale&refine.codepostaletablissement=40230&rows=5000");
  }

/**
 * This method return entreprise info based on his denoomination name
 *
 * @param {string} denomination
 * @return {*}  {Observable<any>}
 * @memberof OpendatasoftV1Service
 */
public getEntreprise(denomination:string): Observable<any>{
    return this.httpclient.get("https://public.opendatasoft.com/api/records/1.0/search/?dataset=economicref-france-sirene-v3&q"+
    "&facet=statutdiffusionetablissement&facet=trancheeffectifsetablissement&facet=etablissementsiege&facet=libellecommuneetablissement"+
    "&facet=etatadministratifetablissement&facet=nomenclatureactiviteprincipaleetablissement&facet=caractereemployeuretablissement&facet=unitepurgeeunitelegale"+
    "&facet=sexeunitelegale&facet=trancheeffectifsunitelegale&facet=categorieentreprise&facet=epcietablissement&facet=departementetablissement&facet=regionetablissement"+
    "&facet=sectionetablissement&facet=soussectionetablissement&facet=divisionetablissement&facet=groupeetablissement&facet=classeetablissement&facet=sectionunitelegale"+
    "&facet=classeunitelegale&facet=naturejuridiqueunitelegale&refine.codepostaletablissement=40230&rows=5000&refine.denominationunitelegale="+denomination);
  }

/**
 * Get all airquality in France
 *
 * @return {*}  {Observable<any>}
 * @memberof OpendatasoftV1Service
 */
public getOtherAirQuality(): Observable<any>{
    return this.httpclient.get(this.url + "?dataset=qualite-de-lair-france&sort=measurements_lastupdated&facet=country&facet=city&facet=location&facet=measurements_parameter&facet=measurements_sourcename&facet=measurements_lastupdated&facet=country_name_en&rows=2000")
  }


}
