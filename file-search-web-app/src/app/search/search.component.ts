import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileDTO, SearchService } from '../search.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IndexService } from '../index.service';
import { SuggestionsService } from '../suggestions.service';

@Component({
  selector: 'app-search',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchQuery: string = '';
  pathToIndex: string = '';
  files: FileDTO[] = [];
  suggestions: string[] = [];
  userMessage: string = '';

  constructor(
    private searchService: SearchService,
    private indexService: IndexService,
    private suggestionsService: SuggestionsService
  ) { }

  onSearch(): void {
    this.userMessage = '';
    this.files = [];
    this.suggestions = [];

    const query = this.searchQuery.trim();

    if (!query) {
      this.userMessage = 'Search query cannot be empty.';
      return;
    }

    this.searchService.searchFiles(query).subscribe({
      next: (data) => this.handleSearchResponse(data),
      error: (err) => this.handleError(err, "SEARCH"),
    });

    this.suggestionsService.getSuggestions(query).subscribe({
      next: (suggestionsData) => {
        this.suggestions = suggestionsData;
        console.log('Suggestions received:', this.suggestions);
      },
      error: (err) => this.handleError(err, "SUGGESTIONS"),
    });
  }

  private handleSearchResponse(data: FileDTO[]): void {
    this.files = data;
    console.log('Files received:', this.files);
    if (this.files.length === 0) {
      if (!this.userMessage) {
         this.userMessage = "Search complete. No files found matching your query.";
      }
    }
  }

  private handleError(error: any, operation: string): void {
    this.userMessage = `An error occurred during ${operation}. Check console for details.`;
    console.error(`${operation} error:`, error);
    if (operation === 'SEARCH') {
      this.files = [];
    } else if (operation === 'SUGGESTIONS') {
      this.suggestions = [];
    }
  }

  onIndexFiles(): void {
    this.userMessage = '';
    const path = this.pathToIndex.trim();

    if (!path) {
      this.userMessage = "Please provide a valid path to index.";
      return;
    }

    this.userMessage = 'Indexing request sent...';

    this.indexService.indexFiles(path).subscribe({
      next: () => this.handleIndexResponse(),
      error: (err) => this.handleError(err, "INDEXING"),
    });
  }

  private handleIndexResponse() {
    this.userMessage = 'Indexing request completed successfully.';
    console.log('Indexing successful');
  }
}
