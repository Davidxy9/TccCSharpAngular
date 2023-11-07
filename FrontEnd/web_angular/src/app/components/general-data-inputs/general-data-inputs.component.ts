import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import Masks from 'src/app/utils/masks';

@Component({
  selector: 'app-general-data-inputs',
  templateUrl: './general-data-inputs.component.html',
  styleUrls: ['./general-data-inputs.component.css'],
})
export class GeneralDataInputsComponent implements OnInit {
  @Output() setValue = new EventEmitter();
  @Input() legalPerson: boolean = true;
  @Output() setLegalPerson = new EventEmitter();
  @Input() fieldValues: any = {};
  @Input() cpfOrCnpjAreNotRegistered: boolean = false;
  @Output() setCpfOrCnpjAreNotRegistered = new EventEmitter();
  @Input() id!: string | null;

  idInputCpf = 'cpf or field';
  labelInputCpf = 'CPF *';
  nameCpf = 'cpf';
  placeholderCpf = '000.000.000-00';
  maskCpf = Masks.cpfMask;
  idRg = 'rg field';
  labelRg = 'RG';
  nameRg = 'rg';
  stateRegistrationMask = Masks.stateRegistrationMask;
  idInputCnpj = 'cnpj or field';
  labelInputCnpj = 'CNPJ *';
  nameCnpj = 'cnpj';
  placeholderCnpj = '00.000.000/0000-00';
  maskCnpj = Masks.cnpjMask;
  idRegistration = 'state registration field';
  labelRegistration = 'Inscrição estadual';
  nameRegistration = 'stateRegistration';

  constructor(private service: ApiService) {}

  ngOnInit() {
    this.legalPerson = this.legalPerson;
  }

  onChangeLegalPerson(event: any) {
    this.setLegalPerson.emit(true);
    this.setValue.emit({
      ...this.fieldValues,
      cpf: '',
      rg: '',
      birthday: null,
    });
  }

  onChangeNotLegalPerson(event: any) {
    this.setLegalPerson.emit(false);
    this.setValue.emit({
      ...this.fieldValues,
      cnpj: '',
      stateRegistration: '',
    });
  }

  onChangeField(values: any) {
    this.setValue.emit(values)
  }

  checkIfCnpjOrCpfIsRegistered = () => {
    try {
      const valueCheck = this.legalPerson
        ? this.fieldValues.cnpj
        : this.fieldValues.cpf;
      const sizeVerification = this.legalPerson ? 18 : 14;

      if (valueCheck?.length === sizeVerification) {
        this.service
          .checkIfTheCustomerIsAlreadyRegistered({
            cnpj: this.fieldValues.cnpj,
            cpf: this.fieldValues.cpf,
            id: this.id || '',
          })
          .subscribe({
            next: () => this.setCpfOrCnpjAreNotRegistered.emit(true),
            error: () => this.setCpfOrCnpjAreNotRegistered.emit(false),
          });
      }
    } catch (error) {
      this.setCpfOrCnpjAreNotRegistered.emit(false);
    }
  };
}
