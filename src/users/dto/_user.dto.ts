import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, IsBoolean} from "class-validator"

export class _UserDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;
    
    @ApiProperty()
    @IsBoolean()
    isAdmin: boolean=false;
}
