import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {
  private swUrl = 'https://swapi.dev/api/starships';

  constructor(private api$: ApiService) {
  }

  getSWData(): Observable<object> {
    return this.api$.getData(this.swUrl);
  }
}
