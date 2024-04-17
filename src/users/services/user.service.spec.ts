import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./user.service";
import { User } from "../entities";

describe("UsersService",()=>{
    let usersService:UsersService;
    let usersRepository: any;


    const mockUsersService={
        getUsers:jest.fn(),
        createUser:jest.fn(),
        updateUser:jest.fn(),
        deleteUser:jest.fn(),
        getUser:jest.fn(),
        login:jest.fn(),
        register:jest.fn(),
    }

    beforeEach(async ()=>{
        const module:TestingModule = await Test.createTestingModule({
            providers:[UsersService, {
                provide:UsersService,
                useValue:mockUsersService}]
        }).compile()

        usersService = module.get<UsersService>(UsersService);
        usersRepository = module.get<User>(UsersService);
        
    })
    describe("create",()=>{
        it("should create a user",async ()=>{
            const userDto = {
                name:"test",
                email:"test@gmail.com",
                password:"test",
                phoneNumber:"+254789345698",
                isAdmin:false
            }
            jest.spyOn(usersService,"create").mockImplementation(()=>Promise.resolve(userDto as any))
            const user = await usersService.create(userDto);
            expect(user).toBeDefined();
            expect(user).toEqual(userDto);
        })
    })
})
