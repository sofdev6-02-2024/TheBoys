import { Injectable } from '@nestjs/common';
import * as https from 'https';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExerciseService {
  constructor(private configService: ConfigService) {}

  getExercises(): Promise<any> {
    const options = {
      method: 'GET',
      hostname: this.configService.get<string>('EXERCISE_DB_API_HOST'),
      path: '/exercises?limit=1326',
      headers: {
        'x-rapidapi-key': this.configService.get<string>('EXERCISE_DB_API_KEY'),
        'x-rapidapi-host': this.configService.get<string>('EXERCISE_DB_API_HOST'),
      },
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (error) {
            reject(new Error('Error parsing response data'));
          }
        });

        res.on('error', (error) => {
          reject(error);
        });
        
      });
      req.end();
    });
  }
}
