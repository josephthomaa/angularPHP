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

  store(language: Language): Observable<Language[]> {
    return this.http.post(`${this.baseUrl}/store`, { data: language })
      .pipe(map((res) => {
        this.languages.push(res['data']);
        return this.languages;
      }),
      catchError(this.handleError));
}

update(language: Language): Observable<Language[]> {
  return this.http.put(`${this.baseUrl}/update`, { data: language })
    .pipe(map((res) => {
      const upLan = this.languages.find((item) => {
        return +item['id'] === +language['id'];
      });
      if (upLan) {
        upLan['price'] = +language['price'];
        upLan['model'] = language['model'];
      }
      return this.languages;
    }),
    catchError(this.handleError));
}

delete(id: number): Observable<Language[]> {
  const params = new HttpParams()
    .set('id', id.toString());

  return this.http.delete(`${this.baseUrl}/delete`, { params: params })
    .pipe(map(res => {
      const filteredlanguages = this.languages.filter((language) => {
        return +language['id'] !== +id;
      });
      return this.languages = filteredlanguages;
    }),
    catchError(this.handleError));
}



  private handleError(error: HttpErrorResponse) {
    console.log(error);
   
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
