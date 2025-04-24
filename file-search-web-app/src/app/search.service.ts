import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface FileDTO {
  name: string;
  path: string;
  content: string;
  is_folder: boolean;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:18080/search';

  constructor(private http: HttpClient) { }

  searchFiles(query: string): Observable<FileDTO[]> {
    return this.http.get<{ results: FileDTO[] }>(`${this.apiUrl}?q=${query}`)
      .pipe(map(response => response.results));
  }
}
