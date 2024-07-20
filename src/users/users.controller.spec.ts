import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { BadRequestException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser = {
    id: 'someid',
    name: 'John Doe',
    avatarUrl: 'http://someurl.com/avatar.png',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(mockUser),
            getUser: jest.fn().mockResolvedValue(mockUser),
            getAvatar: jest.fn().mockResolvedValue('somehash'),
            deleteAvatar: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = { email: 'test@example.com', avatarUrl: 'http://someurl.com/avatar.png' };

    const result = await controller.createUser(createUserDto);

    expect(result).toEqual(mockUser);
    expect(service.createUser).toHaveBeenCalledWith(createUserDto);
  });

  it('should get a user', async () => {
    const result = await controller.getUser('1');

    expect(result).toEqual(mockUser);
    expect(service.getUser).toHaveBeenCalledWith('1');
  });

  it('should get avatar for a user', async () => {
    const result = await controller.getAvatar('someid');

    expect(result).toEqual('somehash');
    expect(service.getAvatar).toHaveBeenCalledWith('someid');
  });

  it('should delete avatar for a user', async () => {
    const result = await controller.deleteAvatar('someid');

    expect(result).toBeUndefined();
    expect(service.deleteAvatar).toHaveBeenCalledWith('someid');
  });
});
