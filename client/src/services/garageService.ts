import { Asset } from 'react-native-image-picker';
import { Service } from './baseService';

export interface GarageDto {
  id?: string;
  name: string;
  latitude: number;
  longitude: number;
  addressName?: string;
  pricePerHour: number;
  pictures?: string[];
  dateOfPost?: Date;
  description: string;
}

export interface FavouritesDto {
  garageId: string;
  garage: GarageDto;
}

class GarageService extends Service {
  async add(garage: GarageDto): Promise<GarageDto> {
    const headers = { 'Content-Type': 'application/json' };
    const response = await this.handleRequest(
      `${this.defaultEndpoint}/garage`,
      'POST',
      headers,
      JSON.stringify(garage),
    );
    return response;
  }

  async uploadImages(id: number | string, fileUris: Asset[]) {
    const headers = { 'Content-Type': 'multipart/form-data' };
    const formData = new FormData();
    fileUris.forEach(async f => {
      const data = {
        uri: f.uri,
        type: f.type,
        name: f.fileName,
      };
      formData.append('files', data);
    });
    const response = await this.handleRequest(
      `${this.defaultEndpoint}/garage/${id}/upload`,
      'POST',
      headers,
      formData,
    );
    return response;
  }

  async getAll(): Promise<GarageDto[]> {
    const response = await this.handleRequest(
      `${this.defaultEndpoint}/garage`,
      'GET',
    );
    return response;
  }

  async getFavourites(): Promise<FavouritesDto[]> {
    const response = await this.handleRequest(
      `${this.defaultEndpoint}/user/favourites`,
      'GET',
    );
    return response;
  }

  async addToFavourite(garageId: string) {
    await this.handleRequest(
      `${this.defaultEndpoint}/user/favourite/${garageId}`,
      'GET',
    );
  }

  async removeFromFavourite(garageId: string) {
    await this.handleRequest(
      `${this.defaultEndpoint}/user/favourite/${garageId}`,
      'DELETE',
    );
  }
}

export default new GarageService();
