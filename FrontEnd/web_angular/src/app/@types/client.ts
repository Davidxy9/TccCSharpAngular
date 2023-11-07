export interface IPhones {
  id?: string | number;
  contactNumber: string;
}

export interface IClient {
  name: string | null | undefined;
  cod?: number | null | undefined;
  avatar?: string | null | undefined;
  cnpj?: string | null | undefined;
  cpf?: string | null | undefined;
  stateRegistration?: string | null | undefined;
  rg?: string | null | undefined;
  birthday?: Date | string | null | undefined;
  cep?: string | null | undefined;
  address?: string | null | undefined;
  number?: string | null | undefined;
  district?: string | null | undefined;
  city?: string | null | undefined;
  state?: string | null | undefined;
  ibgeCode?: number | null | undefined;
  complement?: string | null | undefined;
  referencePoint?: string | null | undefined;
  email?: string | null | undefined;
  id?: string | null | undefined;
  phones?: IPhones[] | [];
}
