import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { AvatarSchema } from './schemas/avatar.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RabbitMQService } from 'src/common/rabbitmq.service';
import { AvatarService } from 'src/common/avatar.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        MongooseModule.forFeature([{name: 'Avatar', schema: AvatarSchema}]),
    ],

    providers: [UsersService,  RabbitMQService, AvatarService],
    controllers: [UsersController],
})

export class UsersModule {}