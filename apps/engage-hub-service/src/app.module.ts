import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExerciseModule } from './ExerciseService/exercise.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutinesModule } from './routines/routines.module';
import { ConfigModule } from '@nestjs/config';
import { TrainerRequestModule } from './trainer-request/trainer-request.module';
import { TrainerStatusModule } from './mailer/trainer-status/trainer-status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),

    
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

    TrainerRequestModule,
    RoutinesModule,
    ExerciseModule,
    TrainerStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
