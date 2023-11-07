import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Utils from 'src/app/utils';
import Masks from 'src/app/utils/masks';

import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { IPhones } from 'src/app/@types/client';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  id!: string | null;
  isUpdate: boolean = false;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private service: ApiService,
    private toastr: ToastrService
  ) {}

  stageThatIs: 0 | 1 | 2 | 3 = 0;
  percentageOfPhases: number = 0;
  valuesGroup: any = {
    [`contact-0-idOrigin-0`]: '',
    [`phone-0-idOrigin-0`]: '',
  };
  cpfOrCnpjAreNotRegistered: boolean = false;
  legalPerson: boolean = true;
  stepsToRelease: {
    1: boolean;
    2: boolean;
    3: boolean;
  } = {
    1: true,
    2: true,
    3: true,
  };

  fieldValues = {
    name: '',
    avatar: '',
    birthday: null,
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

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = id;

    if (id) {
      const storedValue = Utils.getValue('detailsClient');

      if (storedValue?.id == id) {
        this.isUpdate = true;
        // @ts-ignore
        this.fieldValues = {
          ...storedValue,
          birthday: storedValue?.birthday
            ? Utils.reverseDate(new Date(storedValue?.birthday))
            : null,
        };

        const fonesApi = storedValue?.phones || [];

        this.valuesGroup = fonesApi.map((phone: IPhones, index: number) => {
          // [`contact-${index}-idOrigin-${phone?.id}`]: phone?.contact,
          // [`phone-${index}-idOrigin-${phone?.id}`]: phone?.phone,
          const phoneContact = `phone-${id}-idOrigin-${id}`;
          return {
            position: index,
            names: {
              contactNumber: phoneContact,
            },
            value: {
              contactNumber: phone?.contactNumber,
            },
          };
        });

        this.legalPerson = storedValue?.cnpj && storedValue?.cnpj !== '';
        this.cpfOrCnpjAreNotRegistered = true;
      }
    }
  }

  messageSuccess(isUpdate: boolean = false) {
    this.toastr.success(
      '',
      `Cliente ${isUpdate ? 'atualizado' : 'criado'} com sucesso 🎊`
    );
    Utils.removeValue('nameAvatar');
    this.location.back();
  }

  handleSubmitRegisterCustomer = () => {
    try {
      const formatFields = {
        ...this.fieldValues,
        birthday: this.fieldValues?.birthday
          ? new Date(this.fieldValues?.birthday)
          : null,
        ibgeCode: this.fieldValues?.ibgeCode
          ? Number(this.fieldValues?.ibgeCode)
          : '',
        cnpj: this.legalPerson ? this.fieldValues?.cnpj : '',
        cpf: !this.legalPerson ? this.fieldValues?.cpf : '',
        rg:
          this.fieldValues?.rg && this.fieldValues?.rg !== ''
            ? this.fieldValues?.rg
            : '',
        stateRegistration:
          this.fieldValues?.stateRegistration &&
          this.fieldValues?.stateRegistration !== ''
            ? this.fieldValues?.stateRegistration
            : '',
      };

      if (this.id) {
        this.service.updateClient(this.id, formatFields).subscribe({
          next: () => this.messageSuccess(true),
          error: (error) =>
            this.toastr.error('', error?.response?.data?.message),
        });
      } else {
        if (!formatFields.name) {
          this.toastr.error('Realize o preenchimento do campo nome')
          return
        }
        if (this.legalPerson && !formatFields.cnpj) {
          this.toastr.error('Realize o preenchimento do campo CNPJ')
          return
        }
        if (!this.legalPerson && !formatFields.cpf) {
          this.toastr.error('Realize o preenchimento do campo CPF')
          return
        }
        this.service.createClient(formatFields).subscribe({
          next: () => this.messageSuccess(false),
          error: (error) => {
            this.toastr.error('', error?.response?.data?.message)
          }
        });
      }
    } catch (error: any) {
      this.toastr.error('', error?.response?.data?.message);
    }
  };

  ngOnChanges(changes: SimpleChanges) {
    const valueCheck = this.legalPerson
      ? this.fieldValues.cnpj
      : this.fieldValues.cpf;
    const sizeVerification = this.legalPerson ? 18 : 14;

    if (
      this.cpfOrCnpjAreNotRegistered &&
      typeof valueCheck === 'string' &&
      //@ts-ignore
      valueCheck?.length === sizeVerification
    ) {
      this.stepsToRelease = {
        ...this.stepsToRelease,
        1: true,
      };
    }

    if (this.legalPerson) {
      this.fieldValues = {
        ...this.fieldValues,
        cpf: '',
      };
    } else {
      this.fieldValues = {
        ...this.fieldValues,
        cnpj: '',
      };
    }
  }

  setStageThatIs(index: 0 | 1 | 2) {
    this.stageThatIs = index;
  }

  onChangeField(values: any) {
    this.fieldValues = values;
  }

  setCpfOrCnpjAreNotRegistered(value: boolean) {
    this.cpfOrCnpjAreNotRegistered = value;
  }

  changeLegalPerson(value: boolean) {
    this.legalPerson = value;
  }

  setPercentageOfPhases(value: number) {
    this.percentageOfPhases = value;
  }

  setValuesGroup(values: any) {
    this.valuesGroup = values;
  }
}
