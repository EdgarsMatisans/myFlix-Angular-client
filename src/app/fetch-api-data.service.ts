import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';


const apiUrl = 'https://mysterious-refuge-92228.herokuapp.com/';
const token = localStorage.getItem('token');
const username = localStorage.getItem('user');


@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private http: HttpClient) { }

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + `users`, userDetails).pipe(
    catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + `login`, userDetails).pipe(
      catchError(this.handleError)
    );
  }


  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

   public getOneMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `/movies/${title}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get User
  public getUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  

 // Add favourite movie 
 public addFavMovie(id: any): Observable<any> {
  
    const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.post(apiUrl+`users/${username}/movies/${id}`,  {headers: new HttpHeaders(
    {
      Authorization: `Bearer + ${token}`,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}


// Delete favourite movie
public deleteFavMovie(id: any): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.delete(apiUrl + `users/${username}/movies/${id}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Edit User Profile


public editUserProfile(userData: any): Observable<any> {
  const token = localStorage.getItem('token');
  const Username = localStorage.getItem('user');
  return this.http.put(apiUrl + `users/${Username}`, userData, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

public deleteUserProfile(): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http.delete(apiUrl + `users/${username}`, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// non-typed response extraction
  private extractResponseData(data: any | Object): any {
    return data || {};
  }

  // Handle error function
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    } return throwError(
      'Something went wrong; please try again later.');
  }

}