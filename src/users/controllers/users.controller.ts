import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Module,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../services';
import { PageOptionsDto } from '../dto/page-option.dto';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AccessGuard } from '../guards/access.guard';
import { GetUser } from '../decorators/get-user';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() userDto: UserDto) {
    return this.usersService.create(userDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(@Query() pageOptionsDto: PageOptionsDto) {
    return this.usersService.getUsers(pageOptionsDto);
  }

  @Get("me")
  @UseGuards(AccessGuard)
  @HttpCode(HttpStatus.OK)
  async getMe(@GetUser() user: any) {
    return this.usersService.getUser(+user.id)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('id') id: string) {
    return this.usersService.getUser(+id);
  }


  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Body() updatedUserDto: UpdateUserDto,
    @Param('id') id: string,
  ) {
    return this.usersService.updateUser(updatedUserDto, +id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id") id:string) {
    return this.usersService.deleteUser(+id)
  }
}
