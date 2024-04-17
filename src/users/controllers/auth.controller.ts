import { Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UsersService } from "../services";

@Controller("auth")
export class AuthController {
    constructor(private readonly usersService: UsersService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login() {
        // return this.usersService.login();
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register() {
        // return this.usersService.register();
    }
}