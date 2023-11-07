import { IClient } from '../@types/client';

export default class Utils {
  static formatAddress(client: IClient) {
    const values = [
      client?.address,
      client?.number,
      this.formatCityAndState(client),
      client?.cep,
    ];
    return values.filter((value) => Boolean(value)).join(', ');
  }

  static formatCityAndState(client: IClient) {
    if (client?.city && client?.state)
      return client?.city + '-' + client?.state;
    return undefined;
  }

  static formatName(value: string = ''): string {
    const fistName = value[0] || '';
    const lastName = value.split(' ').reverse()[0][0] || '';
    return `${fistName.toUpperCase()} ${lastName.toUpperCase()}`;
  }

  static convertDate(date: Date = new Date()) {
    if (!date) return '';

    const day = date?.getDate()?.toString()?.padStart(2, '0');
    const month = (date?.getMonth() + 1)?.toString()?.padStart(2, '0');
    const year = date?.getFullYear();

    return `${day}/${month}/${year}`;
  }

  static reverseDate(date: Date = new Date()) {
    if (!date) return '';

    const day = date?.getDate()?.toString()?.padStart(2, '0');
    const month = (date?.getMonth() + 1)?.toString()?.padStart(2, '0');
    const year = date?.getFullYear();

    return `${year}-${month}-${day}`;
  }

  static setValue = ({ key, value }: { key: string; value: any }) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  static getValue = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  };

  static removeValue = (key: string) => {
    localStorage.removeItem(key);
  };
}
