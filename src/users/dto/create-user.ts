import {IsEmail, IsNotEmpty, IsString, IsBoolean} from "class-validator"

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsBoolean()
    isAdmin: boolean;

    @IsString()
    @IsNotEmpty()
    password: string;
}