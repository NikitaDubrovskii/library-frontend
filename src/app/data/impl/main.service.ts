import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export const MAIN_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private readonly url: string;

  constructor(private httpClient: HttpClient,
              @Inject(MAIN_URL_TOKEN) url: string) {
    this.url = url;
  }

  shutdown(): Observable<any> {
    return this.httpClient.delete(this.url + '/shutdown');
  }

}
