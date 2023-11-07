import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IClient } from '../@types/client';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

interface IPropsGetClients {
  search: string;
  currentPage: number;
  perPage: number;
}

interface IPropscheckIfTheCustomerIsAlreadyRegistered {
  cnpj: string;
  cpf: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getClientes({
    search,
    currentPage,
    perPage,
  }: IPropsGetClients): Observable<HttpResponse<IClient[]>> {
    return this.http.get<HttpResponse<IClient[]>>(
      search ? `${environment.apiUrl}/Clients/search/${search}` : `${environment.apiUrl}/Clients/?PageNumber=${currentPage}&PageSize=${perPage}`,
      { observe: 'response' as 'body' }
    );
  }

  createClient(value: any) {
    return this.http.post(`${environment.apiUrl}/Clients`, value);
  }

  updateClient(id: string, value: any) {
    return this.http.put(`${environment.apiUrl}/Clients/${id}`, value);
  }

  checkIfTheCustomerIsAlreadyRegistered({
    cnpj,
    cpf,
    id,
  }: IPropscheckIfTheCustomerIsAlreadyRegistered): Observable<
    HttpResponse<any>
  > {
    return this.http.get<HttpResponse<any>>(
      `${environment.apiUrl}/client/checkIfTheCustomerIsAlreadyRegistered/?cnpj=${cnpj}&cpf=${cpf}&id=${id}`
    );
  }

  getFindClient(id: string): Observable<HttpResponse<IClient>> {
    return this.http.get<HttpResponse<IClient>>(
      `${environment.apiUrl}/Clients/${id}`
    );
  }

  deleteClient(id: string): Observable<HttpResponse<IClient>> {
    return this.http.delete<HttpResponse<IClient>>(
      `${environment.apiUrl}/Clients/${id}`
    );
  }
}
