import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { EConfiguration } from '@core/config';

@Injectable()
export class ApiService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService
  ) {}

  async sendPost(url: string ,payload: any): Promise<AxiosResponse<any>> {
    try {
      //TODO- confirm ip address

      const apiKey = 'todo'; //TODO
      const bgcloudToken = "todo"; //TODO

      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'x-bgcloud-token': bgcloudToken,
      };

      const response = await lastValueFrom(
        this.httpService.post(this.configService.get(EConfiguration.URL_API_REGI) + url, payload, { headers })
      );
      
      return response.data;
    } catch (error) {
      //throw new Error(`Failed to send POST request: ${error}`);
    }
  }
}
