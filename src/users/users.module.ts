import { HttpModule } from '@nestjs/axios';
import { UsersService } from './services';
import { AuthController, UsersController } from './controllers';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { ErrorHandlerModule } from 'src/error-handler/error-handler.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule, ErrorHandlerModule],
  controllers: [UsersController, AuthController],
  providers: [UsersService],
})
export class UsersModule {}
