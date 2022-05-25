import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
/**
 * This Service popup the loader on the page
 *
 * @export
 * @class LoaderService
 */
@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}
