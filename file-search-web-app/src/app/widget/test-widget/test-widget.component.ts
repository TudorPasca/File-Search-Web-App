import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faVial } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-test-widget',
  imports: [FontAwesomeModule],
  templateUrl: './test-widget.component.html',
  styleUrl: './test-widget.component.css'
})
export class TestWidgetComponent {
  testIcon = faVial;
}
