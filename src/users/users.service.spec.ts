import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { Avatar } from './schemas/avatar.schema';
import { RabbitMQService } from '../common/rabbitmq.service';
import { AvatarService } from '../common/avatar.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { BadRequestException } from '@nestjs/common';
import axios from 'axios';

jest.mock('axios');

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<User>;
  let avatarModel: Model<Avatar>;
  let rabbitMQService: RabbitMQService;
  let avatarService: AvatarService;

  const mockUser = {
    id: '1',
    name: 'John Doe',
    avatarUrl: 'http://someurl.com/avatar.png',
  };

  const mockAvatar = {
    userId: '669ac41e3c856e8b2c7a29b5',
    filePath: '../../uploads/avatars',
    hash: '880df782edc9e8afcdcf37fdfa1ee575fb901e4099430c5691fa52f881716946',
  };

  const axiosMock = axios as jest.Mocked<typeof axios>;

  beforeEach(async () => {
    // Mock User Model
    const mockUserModel = {
      findById: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockUser),
      create: jest.fn().mockResolvedValue(mockUser),
      save: jest.fn().mockResolvedValue(mockUser),
    };

    // Mock Avatar Model
    const mockAvatarModel = {
      findOne: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockAvatar),
      }),
      create: jest.fn().mockResolvedValue(mockAvatar),
      deleteOne: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
        {
          provide: getModelToken('Avatar'),
          useValue: mockAvatarModel,
        },
        {
          provide: RabbitMQService,
          useValue: {
            sendTOQueue: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: AvatarService,
          useValue: {
            saveAvatar: jest.fn().mockResolvedValue('somehash'),
            deleteAvatar: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken('User'));
    avatarModel = module.get<Model<Avatar>>(getModelToken('Avatar'));
    rabbitMQService = module.get<RabbitMQService>(RabbitMQService);
    avatarService = module.get<AvatarService>(AvatarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user and send RabbitMQ event', async () => {
    const createUserDto: CreateUserDto = { email: 'test@example.com', avatarUrl: 'http://someurl.com/avatar.png' };

    const result = await service.createUser(createUserDto);

    expect(result).toEqual(mockUser);
    expect(rabbitMQService.sendTOQueue).toHaveBeenCalledWith('user_created', { userId: mockUser.id });
  });

  it('should fetch a user', async () => {
    axiosMock.get.mockResolvedValue({ data: mockUser });
    const result = await service.getUser('1');
    expect(result).toEqual(mockUser);
  });

  it('should fetch avatar for a user', async () => {
    const result = await service.getAvatar('669ac41e3c856e8b2c7a29b5');
    expect(result).toEqual(mockAvatar.hash);
  });

  it('should throw BadRequestException for invalid userId format', async () => {
    await expect(service.getAvatar('1')).rejects.toThrow(BadRequestException);
  });

  it('should delete avatar for a user', async () => {
    await service.deleteAvatar('669ac41e3c856e8b2c7a29b5');
    expect(avatarService.deleteAvatar).toHaveBeenCalledWith(mockAvatar.filePath);
    expect(avatarModel.deleteOne).toHaveBeenCalledWith({ userId: '669ac41e3c856e8b2c7a29b5' });
  });
});
