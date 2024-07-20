import { Injectable } from "@nestjs/common";
import {promises as fs} from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class AvatarService{
 private readonly uploadPath = path.join(__dirname, '../../uploads/avatars');

 constructor() {
    this.ensureDirectoryExists();
  }

  private async ensureDirectoryExists() {
    try {
      await fs.mkdir(this.uploadPath, { recursive: true });
    } catch (err) {
      console.error('Error creating directory', err);
    }
  }
 private hashImage(ImageBuffer: Buffer): string{
    const hash = crypto.createHash('sha256');
    hash.update(ImageBuffer);
    return hash.digest('hex');
 }

 async saveAvatar(userId:string, imageBuffer:Buffer): Promise<string> {
    const hash = this.hashImage(imageBuffer);
    const filePath = path.join(this.uploadPath, `${hash}.png`);
    await fs.writeFile(filePath, imageBuffer);
    return hash;
}


async getAvatar(hash: string): Promise<Buffer>{
    const filePath = path.join(this.uploadPath, `${hash}.png`);
    return fs.readFile(filePath);
}

async deleteAvatar(hash: string): Promise<void>{
    const filePath = path.join(this.uploadPath, `${hash}.png`);
    await fs.unlink(filePath);
}




}

