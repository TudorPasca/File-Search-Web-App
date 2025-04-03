import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileDTO, SearchService } from '../search.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IndexService } from '../index.service';

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
  userMessage: string = '';

  constructor(private searchService: SearchService, private indexService: IndexService) { }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.userMessage = 'Search query cannot be empty.';
      this.files = [];
      return;
    }
    
    this.userMessage = '';

    this.searchService.searchFiles(this.searchQuery).subscribe({
      next: this.handleSearchResponse.bind(this),
      error: this.handleError.bind(this, "SEARCH"),
    });
  }

  private handleSearchResponse(data: FileDTO[]): void {
    this.files = data;
    console.log(this.files);
  }

  private handleError(error: any, operation: string): void {
    this.userMessage = 'An error occurred during ' + operation;
    console.error('Search error:', error);
  }

  onIndexFiles(): void {
    if (!this.pathToIndex) {
      this.userMessage = "Please provide a valid path.";
      return;
    }

    this.indexService.indexFiles(this.pathToIndex).subscribe({
      next: this.handleIndexResponse.bind(this),
      error: this.handleError.bind(this, "INDEX"),
    });
  }

  private handleIndexResponse() {
    this.userMessage = 'Indexing Request Complete';
  }
}
