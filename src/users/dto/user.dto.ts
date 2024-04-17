import { ApiProperty } from "@nestjs/swagger";
import {IsString, } from "class-validator"
import { _UserDto } from "./_user.dto";

export class UserDto extends _UserDto{
    @ApiProperty()
    @IsString()
    password: string;
}
