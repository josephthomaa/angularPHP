import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Language } from './language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  baseUrl = 'http://localhost:8079/learnAngular/api';
  languages: Language[];
                
constructor(private http: HttpClient) { }
                
  getAll(): Observable<Language[]> {
    return this.http.get(`${this.baseUrl}/list`).pipe(
      map((res) => {
        this.languages = res['data'];
        return this.languages;
    }),
  catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    console.log(error);
   
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
