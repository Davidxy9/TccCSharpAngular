import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Masks from 'src/app/utils/masks';

@Component({
  selector: 'app-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.css'],
})
export class FormAddressComponent implements OnInit {
  @Input() fieldValues: any = {};
  @Output() setValue = new EventEmitter();
  cepMask = Masks.cepMask;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit() {
    this.fieldValues = this.fieldValues;
  }

  onChangeField(values: any) {
    this.setValue.emit(values);
  }

  lookUpAddress = () => {
    const cepWithoutSpecialCharacters = this.fieldValues.cep.replace(/\D/g, '');

    if (cepWithoutSpecialCharacters.length === 0) return;

    this.http
      .get(`http://viacep.com.br/ws/${cepWithoutSpecialCharacters}/json/`)
      .subscribe({
        next: (data: any) => {
          if (data.erro) {
            this.toastr.error('Endereço não encontrado');
            return;
          }
          const value = {
            ...this.fieldValues,
            address: data.logradouro,
            district: data.bairro,
            city: data.localidade,
            state: data.uf,
            ibgeCode: data.ibge,
            complement: data.complemento,
          };

          this.setValue.emit(value);
          this.fieldValues = value;
        },
        error: (error) => {
          this.toastr.error(
            `Não foi possível localizar endereço\n\n${error?.message || ''}`
          );
        },
      });
  };
}
