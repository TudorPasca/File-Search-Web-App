import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calculator-widget',
  imports: [FontAwesomeModule ],
  templateUrl: './calculator-widget.component.html',
  styleUrl: './calculator-widget.component.css'
})
export class CalculatorWidgetComponent {
  calculatorIcon = faCalculator;
}
