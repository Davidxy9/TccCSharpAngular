import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-preview-avatar-and-username',
  templateUrl: './preview-avatar-and-username.component.html',
  styleUrls: ['./preview-avatar-and-username.component.css'],
})
export class PreviewAvatarAndUsernameComponent implements OnInit {
  @Input() fieldValues: any = {};
  @Output() setValue = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onChangeField(values: any) {
    this.setValue.emit(values);
  }
}
