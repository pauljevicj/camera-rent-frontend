export interface LoginPayload {
  email: string;
  password: string;
}

export interface ClientRegisterPayload {
  name: string;
  surname: string;
  account: {
    email: string;
    password: string;
  };
  phoneNumber: string;
  cityId: number;
  clientTypeId: number;
}

export interface AuthResponse {
  token?: string;
}
