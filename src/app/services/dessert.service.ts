import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { BaseHttpService } from './base-http.service';
import { Dessert } from '../interfaces/dessert.interface';

@Injectable({providedIn: 'root'})
export class DessertService extends BaseHttpService {

  getProducts(): Observable<Dessert[]> {
    return this.http.get<Dessert[]>(`${this.apiUrl}/desserts`)
    .pipe(
      tap((response) => console.log({response}))
    );
  }

  getProduct(id: string): Observable<Dessert> {
    return this.http.get<Dessert>(`${this.apiUrl}/desserts/${id}`);
  }

}
