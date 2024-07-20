import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { Avatar } from './schemas/avatar.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { RabbitMQService } from '../common/rabbitmq.service';
import { AvatarService } from '../common/avatar.service';
import axios from 'axios';
import { Logger } from '@nestjs/common';

@Injectable()
export class UsersService{
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Avatar') private readonly avatarModel: Model<Avatar>, 
        private readonly rabbitMQService: RabbitMQService,
        private readonly avatarService: AvatarService,
        
    ) {}
    
    private readonly logger = new Logger(UsersService.name);
    private isValidObjectId(id: string): boolean{
        return Types.ObjectId.isValid(id) && (new Types.ObjectId(id)).toString()  === id;
    }
     
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userModel.create(createUserDto);

        

   
     
     //send dummy RabbitMQEvent
     await this.rabbitMQService.sendTOQueue('user_created', {userId: user.id});

     return user;
    }


    async getUser(userId: string): Promise<any>{
      
        const response = await axios.get(`https://reqres.in/api/users/${userId}`);
        return response.data;
    }

    async getAvatar(userId: string): Promise<string> {
        this.logger.log(`Fetching avatar for userId: ${userId}`);
        if (!this.isValidObjectId(userId)) {
            throw new BadRequestException('Invalid userId format');
          }

        const user = await this.userModel.findById(userId).exec();
        if(!user || !user.avatarUrl){
            throw new Error('Avatar not found');
        }

        let avatar = await this.avatarModel.findOne({userId}).exec();


        if(!avatar){
            const response = await axios.get(user.avatarUrl, {responseType: 'arraybuffer'});
            const imageBuffer = Buffer.from(response.data);


            const hash = await this.avatarService.saveAvatar(userId, imageBuffer);
            const base64Image = imageBuffer.toString('base64');

            await this.avatarModel.create({userId, filePath: hash, hash:base64Image});

            return base64Image;
        }

        return avatar.hash;
    }

    async deleteAvatar(userId: string): Promise<void>{
        const avatar = await this.avatarModel.findOneAndDelete({ userId }).exec();
    if (avatar) {
      await this.avatarService.deleteAvatar(avatar.filePath);
    }
    }
}