import { Injectable } from '@nestjs/common';
import * as https from 'https';

@Injectable()
export class ExerciseService {
  getExercises(): Promise<any> {
    const options = {
      method: 'GET',
      hostname: 'exercisedb.p.rapidapi.com',
      path: '/exercises?limit=1326',
      headers: {
        'x-rapidapi-key': 'b9cbeab79fmsh8cc3e932ed3e7bbp16ed05jsnff707175d75d',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
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
