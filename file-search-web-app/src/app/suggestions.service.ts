import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {
  private apiUrl = 'http://localhost:18080/suggestions'; 

  constructor(private http: HttpClient) { }

  getSuggestions(query: string): Observable<string[]> {
    const options = { 
      params: new HttpParams().set('p', query) 
    };
    return this.http.get<string[]>(this.apiUrl, options);
  }
}
