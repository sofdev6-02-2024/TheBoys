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
            reject(new Error(error.message));
          }
        });

        res.on('error', (error) => {
          reject(error);
        });
        
      });
      req.end();
    });
  }

  getExercisesByName(name: string): Promise<any> {
    const path = name 
        ? `/exercises/name/${encodeURIComponent(name)}?offset=0&limit=1500`
        : `/exercises/name/%7Bname%7D?offset=0&limit=1500`;

    const options = {
        method: 'GET',
        hostname: this.configService.get<string>('EXERCISE_DB_API_HOST'),
        path: path,
        headers: {
            'x-rapidapi-key': this.configService.get<string>('EXERCISE_DB_API_KEY'),
            'x-rapidapi-host': this.configService.get<string>('EXERCISE_DB_API_HOST'),
        },
    };

    console.log('Request options:', options);

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    console.log('API response:', parsedData);
                    resolve(parsedData);
                } catch (error) {
                    reject(new Error(error.message));
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
