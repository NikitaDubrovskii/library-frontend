import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService<T> {

  private readonly url: string;

  constructor(private httpClient: HttpClient,
              @Inject(String) url: string) {
    this.url = url;
  }

  add(t: T): Observable<T> {
    return this.httpClient.post<T>(this.url + '/add', t);
  }

  getById(id: number): Observable<T> {
    return this.httpClient.get<T>(this.url + '/' + id);
  }

  getAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url);
  }

  update(id: number, t: T): Observable<T> {
    return this.httpClient.put<T>(this.url + '/update/' + id, t);
  }

  delete(id: number): Observable<T> {
    return this.httpClient.delete<T>(this.url + '/delete/' + id);
  }
}
