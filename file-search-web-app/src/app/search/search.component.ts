import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileDTO, SearchService } from '../search.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchQuery: string = '';
  files: FileDTO[] = [];
  errorMessage: string = '';

  constructor(private searchService: SearchService) { }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.errorMessage = 'Search query cannot be empty.';
      this.files = [];
      return;
    }
    
    this.errorMessage = '';

    this.searchService.searchFiles(this.searchQuery).subscribe({
      next: this.handleUpdateResponse.bind(this),
      error: this.handleError.bind(this),
    });
  }

  private handleUpdateResponse(data: FileDTO[]): void {
    this.files = data;
    console.log(this.files);
  }

  private handleError(error: any): void {
    this.errorMessage = 'An error occurred while searching.';
    console.error('Search error:', error);
  }
}
