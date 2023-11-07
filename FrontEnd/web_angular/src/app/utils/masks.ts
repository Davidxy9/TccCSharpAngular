export default class Masks {
  static cpfMask = (value: string = '') => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  static cnpjMask = (value: string = '') => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  static cepMask = (value: string = '') => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/\.(\d{3})(\d)/, '.$1-$2');
  };

  static phoneMask = (value: string = '') => {
    var valueWithoutSpaces = value.replace(/\D/g, '');
    valueWithoutSpaces = valueWithoutSpaces.replace(/^0/, '');
    if (valueWithoutSpaces.length > 10) {
      valueWithoutSpaces = valueWithoutSpaces.replace(
        /^(\d\d)(\d{5})(\d{4}).*/,
        '($1) $2-$3'
      );
    } else if (valueWithoutSpaces.length > 9) {
      valueWithoutSpaces = valueWithoutSpaces.replace(
        /^(\d\d)(\d{4})(\d{0,4}).*/,
        '($1) $2-$3'
      );
    } else if (valueWithoutSpaces.length > 8) {
      // teste
      valueWithoutSpaces = valueWithoutSpaces.replace(
        /(\d{5})(\d{4})/,
        function (regex, arg1, arg2) {
          return arg1 + '-' + arg2;
        }
      );
    } else if (valueWithoutSpaces.length === 8) {
      valueWithoutSpaces = valueWithoutSpaces.replace(
        /(\d{4})(\d{4})/,
        function (regex, arg1, arg2) {
          return arg1 + '-' + arg2;
        }
      );
    }

    return valueWithoutSpaces;
  };

  static stateRegistrationMask = (value: string = '') => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{8})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };
}
