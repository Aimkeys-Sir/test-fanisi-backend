import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, IsBoolean, IsOptional} from "class-validator"

export class UpdateUserDto{
    @ApiProperty()
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email?: string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    phoneNumber?: string;
    
    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isAdmin?: boolean;
}