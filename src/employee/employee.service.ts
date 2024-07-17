import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './schemas/employee.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectModel(Employee.name)
        private employeeModel: mongoose.Model<Employee>
    ) { }

    async findAll(): Promise<Employee[]>{
        const employee=await this.employeeModel.find()
        return employee;
    }

    //add new employee to database
    async create(employee: Employee): Promise<any> {
        const email = employee.email
        const acc = await this.employeeModel.findOne({ email })
        if (acc) {
            throw new Error('User already exists');
        }
        const res = await this.employeeModel.create(employee)
        return res

    }

    //delete employee by id
    async DeleteEmployee( id:string){
        const employee=await this.employeeModel.findByIdAndDelete(id);
    return employee
    }

    //update employee data
    async updateEmployee( id:string, employee:Employee):Promise<Employee>{
        return await this.employeeModel.findByIdAndUpdate(id,employee,{
            new:true,
            runValidators:true,
        });
    }

    async findbyid( id:string){
        const employee=await this.employeeModel.findById(id);
    return employee
    }
}
