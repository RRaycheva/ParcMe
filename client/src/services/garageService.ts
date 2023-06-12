import { Asset } from 'react-native-image-picker';
import { Service } from './baseService';

export interface GarageDto {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  addressName?: string;
  pricePerHour: number;
  pictures?: string[];
  dateOfPost?: Date;
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

  async uploadImages(id: number, fileUris: Asset[]) {
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
    const headers = { 'Content-Type': 'application/json' };
    const response = await this.handleRequest(
      `${this.defaultEndpoint}/garage`,
      'GET',
      headers,
    );
    return response;
  }

  async deleteAll() {
    const response = await this.handleRequest(
      `${this.defaultEndpoint}/garage`,
      'DELETE',
    );
    return response;
  }
}

export default new GarageService();
