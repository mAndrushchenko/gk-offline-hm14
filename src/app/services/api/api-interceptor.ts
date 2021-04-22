import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      if (req.url.includes('randomuser')) {
        console.log('Request on randomuser.me...');
      } else if (req.url.includes('swapi')) {
        console.log('Request on swapi.dev...');
      } else if (req.url.includes('nasa')) {
        console.log('Request on images-api.nasa.gov...');
      }
      return next.handle(req);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
