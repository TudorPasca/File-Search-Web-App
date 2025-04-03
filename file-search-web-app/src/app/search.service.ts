import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface FileDTO {
  filename: string;
  path: string;
  contents: string;
  is_folder: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:18080/search';

  constructor(private http: HttpClient) { }

  searchFiles(filter: string): Observable<FileDTO[]> {
    return this.http.post<{ results: FileDTO[] }>(this.apiUrl, { filter })
      .pipe(map(response => response.results));
  }
}
