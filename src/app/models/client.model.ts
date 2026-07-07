export interface ClientApiResponse {
  id: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  city: {
    id: number;
    name: string;
  };
  clientType: string;
}
