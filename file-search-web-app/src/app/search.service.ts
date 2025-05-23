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

export interface FileTypeSummary {
  extension: string;
  count: number;
}

export interface SummariesData {
  fileTypes: FileTypeSummary[];
  averageFileSize: number;
}

export interface SearchResponse {
  results: FileDTO[];
  summaries: SummariesData;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:18080/search';

  constructor(private http: HttpClient) { }

  searchFiles(query: string): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${this.apiUrl}?q=${query}`);
  }
}

