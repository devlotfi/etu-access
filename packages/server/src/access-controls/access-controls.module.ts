import { Module } from '@nestjs/common';
import { AccessControlsService } from './access-controls.service';
import { AccessControlsController } from './access-controls.controller';

@Module({
  providers: [AccessControlsService],
  controllers: [AccessControlsController]
})
export class AccessControlsModule {}
