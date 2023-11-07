import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css'],
})
export class CardDetailsComponent implements OnInit {
  iconName: string = '';
  @Input() uniqueNameIcons?: string = '';
  @Input() showOnlyOneIcon?: boolean = false;
  @Input() distanceFromTheRight?: boolean = true;
  styleContainer: object = {};

  constructor() {}

  ngOnInit(): void {
    this.iconName = `bi ${this.uniqueNameIcons}`;
    this.styleContainer = {
      marginRight: this.distanceFromTheRight ? '2.81em' : '0',
    };
    this.distanceFromTheRight = this.distanceFromTheRight;
  }
}
