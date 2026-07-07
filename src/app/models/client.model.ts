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

export interface ClientUpdateApiRequest {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  cityId: number;
  clientType: string;
}
