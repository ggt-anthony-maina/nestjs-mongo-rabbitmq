import { AvatarService } from './avatar.service';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

jest.mock('fs', () => ({
    promises: {
      writeFile: jest.fn(),
      readFile: jest.fn(),
      unlink: jest.fn(),
      mkdir: jest.fn(),
    },
  }));
jest.mock('crypto');

describe('AvatarService', () => {
  let avatarService: AvatarService;
  const mockWriteFile = fs.writeFile as jest.Mock;
  const mockReadFile = fs.readFile as jest.Mock;
  const mockUnlink = fs.unlink as jest.Mock;
  const mockMkdir = fs.mkdir as jest.Mock;
  const mockCreateHash = crypto.createHash as jest.Mock;

  beforeEach(() => {
    avatarService = new AvatarService();
    mockCreateHash.mockReturnValue({
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValue('hashed_value'),
    });
    mockMkdir.mockResolvedValue({});
  });

  it('should be defined', () => {
    expect(avatarService).toBeDefined();
  });

  it('should hash an image', () => {
    const hash = avatarService['hashImage'](Buffer.from('image_data'));
    expect(hash).toBe('hashed_value');
  });

  it('should save an avatar', async () => {
    mockWriteFile.mockResolvedValue({});
    const hash = await avatarService.saveAvatar('userId', Buffer.from('image_data'));
    expect(hash).toBe('hashed_value');
    expect(mockWriteFile).toHaveBeenCalledWith(path.join(__dirname, '../../uploads/avatars/hashed_value.png'), Buffer.from('image_data'));
  });

  it('should get an avatar', async () => {
    mockReadFile.mockResolvedValue(Buffer.from('image_data'));
    const imageBuffer = await avatarService.getAvatar('hashed_value');
    expect(imageBuffer.toString()).toBe('image_data');
  });

  it('should delete an avatar', async () => {
    mockUnlink.mockResolvedValue({});
    await avatarService.deleteAvatar('hashed_value');
    expect(mockUnlink).toHaveBeenCalledWith(path.join(__dirname, '../../uploads/avatars/hashed_value.png'));
  });

  it('should ensure the upload directory exists', async () => {
    expect(mockMkdir).toHaveBeenCalledWith(path.join(__dirname, '../../uploads/avatars'), { recursive: true });
  });
});
