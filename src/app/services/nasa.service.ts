import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class NasaService {
  nasaQuery$ = new Subject<string>();
  nasaQueryPram = 'mars';
  private nasaUrl = `https://images-api.nasa.gov/search?q=${this.nasaQueryPram}`;

  constructor(private api$: ApiService) {
    this.nasaQuery$.next(this.nasaQueryPram);
  }

  getNasaData(): Observable<object> {
    this.nasaUrl = `https://images-api.nasa.gov/search?q=${this.nasaQueryPram}`;
    return this.api$.getData(this.nasaUrl);
  }

  getQuery(): Observable<string> {
    return this.nasaQuery$.asObservable();
  }

  setQuery(newQuery: string): void {
    this.nasaQuery$.next(
      this.nasaQueryPram = newQuery
    );
  }

  onSearchNasa(query: string): void {
    this.setQuery(query);
    this.getNasaData();
  }
}
