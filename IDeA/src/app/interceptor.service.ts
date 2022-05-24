import { LoaderService } from './loader.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

/**
 * This service intercept all the http request and then call the loader to prevent of the loading
 *
 * @export
 * @class InterceptorService
 * @implements {HttpInterceptor}
 */
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

/**
 * Creates an instance of InterceptorService.
 * @param {LoaderService} loader
 * @memberof InterceptorService
 */
constructor(public loader: LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.isLoading.next(true);
    return next.handle(req).pipe(
      finalize(
        () => {
          this.loader.isLoading.next(false);
        }
      )
    )
  }
}
