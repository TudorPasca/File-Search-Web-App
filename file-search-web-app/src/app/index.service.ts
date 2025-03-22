import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  private apiUrl = 'http://localhost:18080/index';

  constructor(private http: HttpClient) {}

  indexFiles(path: string): Observable<any> {
    return this.http.post(this.apiUrl, { path: path }, { responseType: 'text' });
  }
}
