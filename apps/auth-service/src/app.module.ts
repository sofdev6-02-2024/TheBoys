import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UsersInformationsModule } from './users-informations/users-informations.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    UsersInformationsModule,
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      port: 27017,
      username: "auth",
      password: "auth",
      database: "auth-db",
      autoLoadEntities: true,
      synchronize: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
