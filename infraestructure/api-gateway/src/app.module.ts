import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EngageHubModule } from './engage-hub/engage-hub.module';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KeycloakConnectModule.register({
      authServerUrl: 'http://host.docker.internal:8080',
      realm: 'body-boost',
      clientId: 'nextjs',
      secret: 'GwiCZfxus2kTB6e14glNJDAf63VjoNKv',
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
