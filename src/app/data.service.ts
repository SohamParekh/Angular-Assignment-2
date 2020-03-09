import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { Employee } from "./employee/employee.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {
 private url = 'api/employees.json'
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    //console.log('Getting all books from the server.');
    return this.http.get<Employee[]>(this.url)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }
  getEmployeesbyId(id: number): Observable<Employee> {
      if (id == 0) {
      return of(this.initializeEmployee());
    }
    else {
      return this.http.get<Employee>(`api/employees/${id}`)
        .pipe(
          tap(data => console.log('getEmployee: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }
  }

  private initializeEmployee(): Employee {
    return {
      id:null,
      firstName: null,
      lastName: null,
      email: null,
      number: null,
      address: null,
      username: null,
      password: null,
      gender: null,
      experience: null,
      qualification: null,
      languages: []
    };
  }
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`/api/employees/${employee.id}`, employee, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    })
      .pipe(
        tap(() => console.log('updateEmployee: ' + employee.id)),
        map(() => employee),
        catchError(this.handleError)
      );
  }
  deleteEmployee(id: number): Observable<{}> {
    return this.http.delete<Employee>(`/api/employees/${id}`, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    })
      .pipe(
        tap(data => console.log('deleteEmployee: ' + id)),
        catchError(this.handleError)
      );
  }
  addEmployee(newBook: Employee): Observable<Employee> {
    return this.http.post<Employee>('/api/employees', newBook, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  // getBookById(id: number): Observable<Book> {
  //   return this.http.get<Book>(`/api/books/${id}`, {
  //     headers: new HttpHeaders({
  //       'Accept': 'application/json',
  //       'Authorization': 'my-token'
  //     })
  //   });
  // }

  // addBook(newBook: Book): Observable<Book> {
  //   return this.http.post<Book>('/api/books', newBook, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   });
  // }

  // updateBook(updatedBook: Book): Observable<void> {
  //   return this.http.put<void>(`/api/books/${updatedBook.bookID}`, updatedBook, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   });
  // }

  // deleteBook(bookID: number): Observable<void> {
  //   return this.http.delete<void>(`/api/books/${bookID}`);
  // }

}
