import { Controller, Post, Get, Delete, Param, Body } from "@nestjs/common";
import {UsersService} from './users.service';
import { CreateUserDto } from "./dtos/create-user.dto";

@Controller('users')
export class UsersController{
    constructor(private readonly usersService: UsersService){}

    @Post()
    async createUser(@Body() createUserDTO: CreateUserDto) {
        return this.usersService.createUser(createUserDTO);
    }

    @Get(':userId')
    async getUser(@Param('userId') userId: string){
        return this.usersService.getUser(userId);
    }

    @Get(':userId/Avatar')
    async getAvatar(@Param('userId') userId: string){
        return this.usersService.getAvatar(userId);
    }

   @Delete(':userId/avatar')
   async deleteAvatar(@Param('userId') userId: string){
    return this.usersService.deleteAvatar(userId);
   }
}