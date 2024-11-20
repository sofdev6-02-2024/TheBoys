import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExerciseModule } from './ExerciseService/exercise.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutinesModule } from './routines/routines.module';
import { ConfigModule } from '@nestjs/config';
import { TrainterRequestModule } from './trainter-request/trainter-request.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: `${process.env.DB_HOST}`,
      username: `${process.env.DB_USER}`,
      password: `${process.env.DB_PASSWORD}`,
      database: `${process.env.DB_NAME}`,
      port: parseInt(`${process.env.DB_PORT}`) | 3306,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    RoutinesModule,
    ExerciseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TrainterRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
