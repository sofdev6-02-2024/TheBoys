import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EngageHubModule } from './engage-hub/engage-hub.module';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        authServerUrl: configService.get<string>('keycloak.domain'),
        realm: configService.get<string>('keycloak.realm'),
        clientId: configService.get<string>('keycloak.client_id'),
        secret: configService.get<string>('keycloak.client_secret'),
      }),
    }),
    UsersModule,
    EngageHubModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
