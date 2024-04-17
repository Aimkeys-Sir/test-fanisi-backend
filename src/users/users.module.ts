import { HttpModule } from "@nestjs/axios";
import { UsersService } from "./services";
import { UsersController } from "./controllers";
import { Module } from "@nestjs/common";

@Module({
	imports: [HttpModule],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {
    
}