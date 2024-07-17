import { Body,Headers ,Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }


    @Get("/developer")
    async getAlluser(): Promise<User[]> {

        return this.userService.findAllDeveloper();
    }

    @Post("/singup")
    async createUser(
        @Body()
        user
    ): Promise<any> {
        console.log(user)
        return this.userService.create(user)
    }

    @Post("/addemployee")
    async createemploye(
        @Body()
        user
    ): Promise<any> {
        
        return this.userService.add(user)
    }

    @Post("/login")
    async getUser(
        @Body()
        user
    ): Promise<any> {
        return this.userService.getuser(user)
    }
    @Get("/curentuser")
    async curentuser(
        @Headers()
        Authorization
    ): Promise<any> {
        return this.userService.curentuser(Authorization)
    }
  
    @Put('tskills/:id')
    async updateSkills(
        @Param('id')
        id:string,
        @Body()
        Tskills
    ):Promise<any>{
        return this.userService.updateTkills(id,Tskills)
    }
    @Put(':id')
    async updatetkills(
        @Param('id')
        id:string,
        @Body()
        skills
    ):Promise<any>{
        return this.userService.updateskills(id,skills)
    }

    @Get('/employee')
    async getAllemployee():Promise<User[]>{
     
        return this.userService.findAllDeveloper();
    }

    
    @Get()
    async getAllusers():Promise<User[]>{
     
        return this.userService.findAll();
    }


    @Delete(':id')
    async deleteemployee(
        @Param('id')
        id:string,
    ){
        return this.userService.DeleteEmployee(id)
    }

    @Put('/employee/:id')
    async updateEmployee(
        @Param('id')
        id:string,
        @Body()
        employee
    ):Promise<User>{
        return this.userService.updateEmployee(id,employee)
    }

    @Get(':id')
    async getemployebyid(
        @Param('id')
        id:string,
        
    ){
        return this.userService.findbyid(id)
    }

}
