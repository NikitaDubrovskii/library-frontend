import {Inject, Injectable, InjectionToken} from '@angular/core';
import {CommonService} from "./common.service";
import {Book} from "../../model/book";
import {HttpClient} from "@angular/common/http";
import {BookDao} from "../dao/book-dao";
import {Observable} from "rxjs";

export const BOOK_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class BookService extends CommonService<Book> implements BookDao {

  constructor(private http: HttpClient,
              @Inject(BOOK_URL_TOKEN) private baseUrl) {
    super(http, baseUrl);
  }

  giveBook(bookId: number, userId: number): Observable<any> {
    return this.http.put<Book>(this.baseUrl + '/' + bookId + '/' + userId, null);
  }

  takeBook(bookId: number): Observable<any> {
    return this.http.put<Book>(this.baseUrl + '/' + bookId, null);
  }


}
