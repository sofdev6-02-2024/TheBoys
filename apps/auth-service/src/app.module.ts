import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { UsersInformationsModule } from "./users-informations/users-informations.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    UsersModule,
    UsersInformationsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: process.env.DB_TYPE as "mongodb",
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
