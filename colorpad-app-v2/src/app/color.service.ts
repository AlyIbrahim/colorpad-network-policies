import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
    baseUrl = "/confirm/"
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  color(boardId:string, squareId: number, color: string): Observable<any> {

    var url: string = this.baseUrl + color
    return this.http.post(url, JSON.stringify({ 'boardId': boardId, 'squareId': squareId, 'color': color }), { 'headers': this.headers, 'observe': 'response' })
      .pipe(
        catchError(this.error)
      )
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log("ERROR:" + errorMessage);
    return throwError(errorMessage);
  }

}
