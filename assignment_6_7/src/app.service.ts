import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  private readonly apiKey = '6cac75f1damsh7b471e4721dcb97p18ceadjsndd00dd02cc1f';
  private readonly apiHost = 'youtube-mp36.p.rapidapi.com';

  async getYoutubeMp3(id: string) {
    try {
      const response = await axios.get('https://youtube-mp36.p.rapidapi.com/dl', {
        params: { id },
        headers: {
          'X-RapidAPI-Key': this.apiKey,
          'X-RapidAPI-Host': this.apiHost,
        },
      });

      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Failed to get MP3',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
