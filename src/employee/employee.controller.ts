import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {EmployeeService} from './employee.service';
import { Employee } from './schemas/employee.schema';

@Controller('employee')
export class EmployeeController {
    constructor(private EmployeeService:EmployeeService){}

    @Post()
    async createContact(
        @Body()
        employee
    ):Promise<Employee>{
        console.log(employee)
        return this.EmployeeService.create(employee)
    }

        
    @Get()
    async getAllContact():Promise<Employee[]>{
     
        return this.EmployeeService.findAll();
    }

    @Delete(':id')
    async deleteContact(
        @Param('id')
        id:string,
        
    ){
        return this.EmployeeService.DeleteEmployee(id)
    }


    @Put(':id')
    async updateContact(
        @Param('id')
        id:string,
        @Body()
        contact
    ):Promise<Employee>{
        return this.EmployeeService.updateEmployee(id,contact)
    }

    
    @Get(':id')
    async getemployebyid(
        @Param('id')
        id:string,
        
    ){
        return this.EmployeeService.findbyid(id)
    }
}
