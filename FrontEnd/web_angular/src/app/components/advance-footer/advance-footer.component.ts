import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-advance-footer',
  templateUrl: './advance-footer.component.html',
  styleUrls: ['./advance-footer.component.css'],
})
export class AdvanceFooterComponent implements OnInit {
  @Input() stageThatIs: 0 | 1 | 2 = 0;
  @Input() stepsToRelease: {
    1: boolean;
    2: boolean;
    3: boolean;
  } = {
    1: false,
    2: true,
    3: true,
  };
  @Output() setStageThatIs = new EventEmitter();
  @Output() setPercentageOfPhases = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  clickButton() {
    const percentageOfEachStep = {
      0: { percentage: 33.333333333333336, stage: 1 },
      1: { percentage: 66.66666666666667, stage: 2 },
      2: { percentage: 100, stage: 3 },
    };
    const { percentage, stage } = percentageOfEachStep[this.stageThatIs] || 0;

    // @ts-ignore
    if (!this.stepsToRelease[this.stageThatIs + 1])
      return alert('Por favor, preencha os campos da sessão atual');

    this.setPercentageOfPhases.emit(percentage);
    this.setStageThatIs.emit(stage);
  }
}
