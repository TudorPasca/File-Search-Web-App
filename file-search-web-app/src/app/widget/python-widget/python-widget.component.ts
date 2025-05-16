import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPython } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-python-widget',
  imports: [FontAwesomeModule],
  templateUrl: './python-widget.component.html',
  styleUrl: './python-widget.component.css'
})
export class PythonWidgetComponent {
  pythonIcon = faPython;
}
