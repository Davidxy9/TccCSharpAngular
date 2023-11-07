export interface IPropsFieldValues {
  cod?: number;
  name: string;
  avatar: string;
  birthday: string | null;
  cnpj?: string;
  cpf?: string;
  rg: string;
  email: string;
  ibgeCode: number;
  address: string;
  cep: string;
  city: string;
  district: string;
  complement: string;
  number: string;
  referencePoint: string;
  state: string;
  stateRegistration: string;
  phones: {
    id?: string;
    contactNumber: string;
  }[];
}
