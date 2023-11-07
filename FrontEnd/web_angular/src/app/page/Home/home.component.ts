import { Component, OnInit } from '@angular/core';
import { IClient } from 'src/app/@types/client';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  clients: IClient[] = [];
  totalCountOfRegisters: number = 0;
  currentPage: number = 1;
  perPage: number = 10;
  search: string = '';

  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.getClientes({
      search: '',
      currentPage: this.currentPage,
      perPage: this.perPage,
    });
  }

  getClientesBySearch(search: string) {
    this.search = search;

    this.getClientes({
      search,
      currentPage: 1,
      perPage: this.perPage,
    });
  }

  getClientesByPerPage(perPage: number) {
    this.perPage = perPage;

    this.getClientes({
      search: this.search,
      currentPage: 1,
      perPage: perPage,
    });
  }

  getClientesByCurrentPage(currentPage: number) {
    this.currentPage = currentPage;

    this.getClientes({
      search: this.search,
      currentPage: currentPage,
      perPage: this.perPage,
    });
  }

  getClientes({
    search,
    currentPage,
    perPage,
  }: {
    search: string;
    currentPage: number;
    perPage: number;
  }) {
    this.service
      .getClientes({
        search,
        currentPage,
        perPage,
      })
      .subscribe((response) => {
        this.clients = response.body || [];
        const countOfRegisters = this.clients.length;
        this.totalCountOfRegisters = isNaN(countOfRegisters)
          ? 0
          : countOfRegisters;
      });
  }
}
