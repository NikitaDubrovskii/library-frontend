import {Observable} from "rxjs";
import {Book} from "../../model/book";

export interface BookDao {
    giveBook(bookId: number, userId: number): Observable<any>;

    takeBook(bookId: number): Observable<any>;
}