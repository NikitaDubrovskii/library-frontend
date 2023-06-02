import {Inject, Injectable, InjectionToken} from '@angular/core';
import {CommonService} from "./common.service";
import {User} from "../../model/user";
import {HttpClient} from "@angular/common/http";

export const USER_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class UserService extends CommonService<User>{

  constructor(private http: HttpClient,
              @Inject(USER_URL_TOKEN) private baseUrl) {
    super(http, baseUrl);
  }


}
