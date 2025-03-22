import { Component } from '@angular/core';
import { SearchComponent } from "./search/search.component";

@Component({
  selector: 'app-root',
  imports: [SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'file-search-web-app';
}
