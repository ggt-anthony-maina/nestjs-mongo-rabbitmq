import { Module } from '@nestjs/common';

import { RabbitMQService } from './rabbitmq.service';
import { AvatarService } from './avatar.service';

@Module({
  providers: [ RabbitMQService, AvatarService],
  exports: [ RabbitMQService, AvatarService],
})
export class CommonModule {}
