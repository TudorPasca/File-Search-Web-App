import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FileDTO, SearchResponse, SearchService, SummariesData } from '../search.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IndexService } from '../index.service';
import { SuggestionsService } from '../suggestions.service';
import { TestWidgetComponent } from '../widget/test-widget/test-widget.component';
import { PythonWidgetComponent } from '../widget/python-widget/python-widget.component';
import { CalculatorWidgetComponent } from '../widget/calculator-widget/calculator-widget.component';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ FormsModule, CommonModule, TestWidgetComponent, PythonWidgetComponent, CalculatorWidgetComponent ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  pathToIndex: string = '';
  files: FileDTO[] = [];
  suggestions: string[] = [];
  userMessage: string = '';
  searchSummaries: SummariesData | null = null;
  showTestWidget: boolean = false;
  showCalculatorWidget: boolean = false;
  showPythonWidget: boolean = false;

  private searchQueryChanged = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private searchService: SearchService,
    private indexService: IndexService,
    private suggestionsService: SuggestionsService
  ) { }

  ngOnInit(): void {
    this.searchQueryChanged.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.updateWidgetVisibility(query);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchQueryChange(query: string): void {
    this.searchQuery = query;
    this.searchQueryChanged.next(query);
  }

  updateWidgetVisibility(query: string): void {
    const lowerQuery = query.toLowerCase().trim();
    this.showTestWidget = lowerQuery.includes('test');
    this.showCalculatorWidget = lowerQuery.includes('calculator');
    this.showPythonWidget = lowerQuery.includes('py');
  }

  onSearch(): void {
    this.userMessage = '';
    this.files = [];
    this.suggestions = [];
    this.searchSummaries = null;
    
    const query = this.searchQuery.trim();
    this.updateWidgetVisibility(query);

    if (!query) {
      this.userMessage = 'Search query cannot be empty.';
      this.showTestWidget = false;
      this.showCalculatorWidget = false;
      this.showPythonWidget = false;
      return;
    }

    this.searchService.searchFiles(query).subscribe({
      next: (response: SearchResponse) => this.handleSearchResponse(response),
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

  private handleSearchResponse(response: SearchResponse): void {
    this.files = response.results;
    this.searchSummaries = response.summaries;

    console.log('Files received:', this.files);
    console.log('Summaries received:', this.searchSummaries);

    if (this.files.length === 0 && !this.userMessage) {
        this.userMessage = "Search complete. No files found matching your query.";
    }
  }

  private handleError(error: any, operation: string): void {
    this.userMessage = `An error occurred during ${operation}. Check console for details.`;
    console.error(`${operation} error:`, error);
    if (operation === 'SEARCH') {
      this.files = [];
      this.searchSummaries = null;
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

  formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
