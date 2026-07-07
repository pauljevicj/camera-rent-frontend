export interface CameraApiResponse {
  id: number;
  status: string;
  pricePerDay: number;
  cameraCondition: string;
  year: number;
  cameraModel: {
    id: number;
    brand: string;
    model: string;
  };
}

export interface CameraModel {
  id: number;
  name: string;
  brand: string;
  model: string;
  pricePerDay: number;
  condition: string;
  year: number | null;
}

export interface CameraSearchEvent {
  start: Date;
  end: Date;
}

export interface CameraRequest {
  status: string;
  pricePerDay: number;
  cameraCondition: string;
  year: number;
  cameraModelId: number;
}
