import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPropsFieldValues } from 'src/app/@types/fieldValues';
import { ApiService } from 'src/app/services/api.service';
import Utils from 'src/app/utils';

@Component({
  selector: 'app-root',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  idClient!: string | null;
  customerData: IPropsFieldValues = {
    name: '',
    avatar: '',
    birthday: Utils.reverseDate(new Date()),
    cnpj: '',
    cpf: '',
    rg: '',
    email: '',
    ibgeCode: 0,
    address: '',
    cep: '',
    city: '',
    district: '',
    complement: '',
    number: '',
    referencePoint: '',
    state: '',
    stateRegistration: '',
    phones: [],
  };
  modalCall: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.idClient = id;
    this.service.getFindClient(this.idClient ?? '').subscribe((data: any) => {
      const formatFields = {
        ...data,
        birthday: data?.birthday ?? null,
        ibgeCode: data?.ibgeCode ?? 0,
        cnpj: data?.cnpj ?? '',
        cpf: data?.cpf ?? '',
        rg: data?.rg ?? '',
        stateRegistration: data?.stateRegistration ?? '',
      };
      this.customerData = formatFields;
      Utils.setValue({
        key: 'detailsClient',
        value: formatFields,
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const value = changes['idClient'];
    if (!value) return;
    this.service.getFindClient(this.idClient ?? '').subscribe((data: any) => {
      const formatFields = {
        ...data,
        birthday: data?.birthday ?? null,
        ibgeCode: data?.ibgeCode ?? 0,
        cnpj: data?.cnpj ?? '',
        cpf: data?.cpf ?? '',
        rg: data?.rg ?? '',
        stateRegistration: data?.stateRegistration ?? '',
      };
      this.customerData = formatFields;
      Utils.setValue({
        key: 'detailsClient',
        value: formatFields,
      });
    });
  }

  openModalDelete() {
    this.modalCall++;
  }
}
