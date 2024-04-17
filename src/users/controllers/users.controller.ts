import { Controller, Delete, Get, HttpCode, HttpStatus, Module, Post, Put } from "@nestjs/common";
import { UsersService } from "../services";

@Controller("user")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    create(){}

    @Get()
    @HttpCode(HttpStatus.OK)
    getUsers(){}

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    getUser(){}

    @Put(":id")
    @HttpCode(HttpStatus.OK)
    updateUser(){}

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(){}
}