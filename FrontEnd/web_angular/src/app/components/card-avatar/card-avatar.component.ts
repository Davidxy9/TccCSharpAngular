import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IClient } from 'src/app/@types/client';
import Utils from 'src/app/utils';

@Component({
  selector: 'app-card-avatar',
  templateUrl: './card-avatar.component.html',
  styleUrls: ['./card-avatar.component.css'],
})
export class CardAvatarComponent implements OnInit {
  @Input() client: IClient = {} as IClient;
  @Input() IAmBeingCalledFromTheDetailsScreen: boolean = false;

  urlAvatar: string = '';
  altAvatar: string = '';
  nameAbbreviation: string = '';
  classPlus = '';

  constructor() {}

  ngOnInit(): void {
    this.urlAvatar = `${environment.apiUrl}/avatar/${this.client.avatar}`;
    this.altAvatar = this.client?.name || '';
    this.nameAbbreviation = Utils.formatName(this.client?.name || '');
    this.IAmBeingCalledFromTheDetailsScreen =
      this.IAmBeingCalledFromTheDetailsScreen;
    if (this.IAmBeingCalledFromTheDetailsScreen) {
      this.classPlus = 'card-avatar-details';
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const value = changes['client'];
    if (value.firstChange) return;
    this.urlAvatar = `${environment.apiUrl}/avatar/${value.currentValue.avatar}`;
    this.altAvatar = value.currentValue?.name || '';
    this.nameAbbreviation = Utils.formatName(value.currentValue?.name || '');
  }
}
