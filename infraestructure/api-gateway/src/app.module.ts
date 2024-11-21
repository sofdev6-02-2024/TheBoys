import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EngageHubModule } from './engage-hub/engage-hub.module';

@Module({
  imports: [UsersModule, EngageHubModule],
})
export class AppModule {}
