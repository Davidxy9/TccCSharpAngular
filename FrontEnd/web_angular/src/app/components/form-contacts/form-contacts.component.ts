import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import Masks from 'src/app/utils/masks';

interface IPropsGetObjectNamesFromPosition {
  allValues: object;
  position: number;
}

interface IDataInput {
  position: number;
  names: {
    contactNumber: string
  };
  value: object;
}

@Component({
  selector: 'app-form-contacts',
  templateUrl: './form-contacts.component.html',
  styleUrls: ['./form-contacts.component.css'],
})
export class FormContactsComponent implements OnInit {
  @Input() fieldValues: any = {};
  @Output() setValue = new EventEmitter();
  @Input() valuesGroup: any = {};
  @Output() setValuesGroup = new EventEmitter();
  phoneMask = Masks.phoneMask;
  data: IDataInput[] = [];

  constructor() {}

  ngOnInit() {
    if (!this.valuesGroup.length) {
      const nameContact = 'contact-0-idOrigin-0';
      const phoneContact = 'phone-0-idOrigin-0';
      this.data.push({
        position: 0,
        names: {
          contactNumber: nameContact,
        },
        value: {
          contactNumber: '',
        },
      });
    } else {
      this.data = this.valuesGroup;
    }
  }

  onChangeField(values: any) {
    this.setValue.emit(values);
  }

  onChangeFieldValuesGroup(values: any) {
    this.setValuesGroup.emit({
      ...this.valuesGroup,
      ...values,
    });
  }

  addMoreInputGroup = () => {
    const size = Object.entries(this.valuesGroup);
    this.setValuesGroup.emit({
      ...this.valuesGroup,
      [`contact-${size.length}-idOrigin-0`]: '',
      [`phone-${size.length}-idOrigin-0`]: '',
    });

    const nameContact = `contact-${size.length}-idOrigin-${size.length}`;
    const phoneContact = `phone-${size.length}-idOrigin-${size.length}`;

    this.data.push({
      position: size.length,
      names: {
        contactNumber: phoneContact
      },
      value: {
        contactNumber: '',
      },
    });
  };

  getKeysObj = (value: any) => {
    const values = Object.entries(value);
    const getKeys = values.map(([key]) => key);

    const formatKeys = getKeys.map((key) => key.split('-')[1]);

    return [...new Set(formatKeys.map((item) => Number(item)))];
  };

  generateNewArrayToRenderInputs = () => {
    const keys = this.getKeysObj(this.valuesGroup);

    return keys.map((item) => {
      const { contact, idObj, phone } = this.getObjectNamesFromPosition({
        allValues: this.valuesGroup,
        position: item,
      });

      return {
        position: item,
        names: {
          contact,
          phone,
        },
        value: {
          [`contact-${item}-idOrigin-${idObj}`]:
            this.valuesGroup[`contact-${item}-idOrigin-${idObj}`],
          [`phone-${item}-idOrigin-${idObj}`]:
            this.valuesGroup[`phone-${item}-idOrigin-${idObj}`],
        },
      };
    });
  };

  getObjectNamesFromPosition = ({
    allValues,
    position,
  }: IPropsGetObjectNamesFromPosition) => {
    const getNameKeys = Object.entries(allValues).map(([key]) => key);
    const findNames = getNameKeys.filter(
      (nameKey) => nameKey.indexOf(`-${position}-`) > -1
    );

    const idObj = findNames[0]?.split('-')[3] || '0';

    return {
      contact: findNames[0],
      phone: findNames[1],
      idObj,
    };
  };

  ngOnChanges(changes: SimpleChanges) {
    const value = changes['valuesGroup'];
    if (!value) return;
    const keys = this.getKeysObj(value.currentValue);

    const phones = keys.map((item) => {
      const { contact, idObj, phone } = this.getObjectNamesFromPosition({
        allValues: value.currentValue,
        position: item,
      });

      if (idObj === '0') {
        return {
          contact: value.currentValue[contact],
          phone: value.currentValue[phone],
        };
      }
      return {
        id: idObj,
        contact: value.currentValue[contact],
        phone: value.currentValue[phone],
      };
    });

    const cleanPhoneEmpty = phones.filter((fone) => Boolean(fone.phone));
    this.onChangeField({
      ...this.fieldValues,
      phones: cleanPhoneEmpty,
    });
  }
}
