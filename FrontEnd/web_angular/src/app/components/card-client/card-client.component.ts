import { Component, Input, OnInit } from '@angular/core';
import { IClient } from 'src/app/@types/client';
import Utils from 'src/app/utils';

@Component({
  selector: 'app-card-client',
  templateUrl: './card-client.component.html',
  styleUrls: ['./card-client.component.css'],
})
export class CardClientComponent implements OnInit {
  @Input() client: IClient = {} as IClient;

  isCNPJ: boolean = Boolean(this.client?.cnpj);
  Address: string = '';

  constructor() {}

  ngOnInit() {
    this.Address = Utils.formatAddress(this.client);
    this.client = this.client;
    this.isCNPJ = Boolean(this.client?.cnpj);
  }
}
