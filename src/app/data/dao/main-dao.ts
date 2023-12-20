import {Observable} from "rxjs";

export interface MainDao {
    shutdown(): Observable<any>;
}