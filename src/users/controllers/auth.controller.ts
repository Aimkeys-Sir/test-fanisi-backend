import { Body, ClassSerializerInterceptor, Controller, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { UsersService } from "../services";
import { LoginDto } from "../dto/login.dto";
import { AccessGuard } from "../guards/access.guard";
import { GetUser } from "../decorators/get-user";
import { UserDto } from "../dto/user.dto";

@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private readonly usersService: UsersService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto) {
        return this.usersService.login(loginDto);
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AccessGuard)
    async register(@GetUser() user: any, @Body() UserDto: UserDto) {
        return this.usersService.register(user, UserDto);
    }
}