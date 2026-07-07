export interface RentalApiResponse {
  id?: number;
  startDate?: string;
  endDate?: string;
  status?: string;

  client?: {
    id?: number;
    name?: string;
    surname?: string;
    email?: string | null;
    phoneNumber?: string;
    city?: {
      id?: number;
      name?: string;
    };
    clientType?: {
      id?: number;
      name?: string;
    };
  };

  user?: {
    id?: number;
    name?: string;
    surname?: string;
    email?: string | null;
  };

  camera?: {
    id?: number;
    status?: string;
    pricePerDay?: number;
    cameraCondition?: string;
    year?: number;
    cameraModel?: {
      id?: number;
      brand?: string;
      model?: string;
    };
  };
}

export interface RentalRequest {
  startDate: string;
  endDate: string;
  status: string;
  clientId: number;
  userId: number;
  cameraId: number;
}
