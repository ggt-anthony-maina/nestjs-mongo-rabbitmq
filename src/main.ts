import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);

  // const usersService = app.get(UsersService);

  //  // Your standalone application logic here
  // // For example, you can call usersService methods here
  // const userId = '2';
  // try {
  //   const user = await usersService.getUser(userId);
  //   console.log(user);
  // } catch (error) {
  //   console.error('Error:', error.message);
  // }

  // await app.close();

  // await app.listen(3000);
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
    console.log('Application is running on: http://localhost:3000');
  } catch (error) {
    console.error('Error during application bootstrap', error);
    process.exit(1);
  }
}
bootstrap();
