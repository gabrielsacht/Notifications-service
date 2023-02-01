import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { httpModule } from './infra/http/http.module';

@Module({
  imports: [httpModule, DatabaseModule],
})
export class AppModule {}
