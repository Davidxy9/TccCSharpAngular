import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-card-registration',
  templateUrl: './card-registration.component.html',
  styleUrls: ['./card-registration.component.css'],
})
export class CardRegistrationComponent implements OnInit {
  @Output() setStageThatIs = new EventEmitter();
  @Output() setPercentageOfPhases = new EventEmitter();

  @Input() percentageOfPhases: number = 0;

  @Input() stepsToRelease: {
    1: boolean;
    2: boolean;
    3: boolean;
  } = {
    1: false,
    2: true,
    3: true,
  };

  constructor() {}

  ngOnInit(): void {
    const stepButtons = document.querySelectorAll('.step-button');
    const progress = document.querySelector('#progress');

    stepButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        if (
          index !== 0 &&
          !this.stepsToRelease[index as unknown as 1 | 2 | 3]
        ) {
          return alert('Por favor, preencha os campos da sessão atual');
        }

        const porcentage = (index * 100) / (stepButtons.length - 1);
        progress?.setAttribute('value', porcentage.toString());
        this.setPercentageOfPhases.emit(porcentage);

        this.onChangeStage(index);

        stepButtons.forEach((item, secindex) => {
          if (index >= secindex) {
            item.classList.add('done');
          } else if (index < secindex) {
            item.classList.remove('done');
          }
        });
      });
    });
  }

  onChangeStage(value: number): void {
    this.setStageThatIs.emit(value);
  }

  ngOnChanges(changes: SimpleChanges) {
    const stepButtons = document.querySelectorAll('.step-button');
    const obj = {
      '1': 33.333333333333336,
      '2': 66.66666666666667,
      '3': 100,
    };
    const change = changes['percentageOfPhases'];

    if (change) {
      stepButtons.forEach((item, index) => {
        // @ts-ignore
        if (index === 0 || obj[index.toString()] <= change.currentValue) {
          item.classList.add('done');
        } else {
          item.classList.remove('done');
        }
      });
    }
  }
}
