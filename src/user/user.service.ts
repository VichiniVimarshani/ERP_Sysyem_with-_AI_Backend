import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import { IauthPayload } from "../extends";
import { SignOptions } from "jsonwebtoken"
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const APP_SECRET = 'my-app-secret'
const JWT_OPTIONS: SignOptions = {
    algorithm: "HS256",
    issuer: "davidson.com/api",
    audience: "davidson.com",
    expiresIn: 3600,
}

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ) { }

    //find all users
    async findAllDeveloper(): Promise<User[]> {
        const user = await this.userModel.find({ role: 'Developer' })
        return user;
    }

    //sign up user
    async create(user: User): Promise<any> {
        const email = user.email
        const password = user.password
        const acc = await this.userModel.findOne({ email })

        if (acc) {
            throw new Error('User already exists');
        }
        user.password = await createPasswordHash(user.password)

        const res = await this.userModel.create(user)
        const payload = await signToken(password, res.password, { id: res._id.toString(), email: email })
        const token: any = {
            token: payload,
            user: res.role
        }

        return token

    }

    //user login
    async getuser(user: User): Promise<any> {
        const email = user.email
        const acc = await this.userModel.findOne({ email })
        if (!acc) {
            throw new Error('no email');
        }
        console.log(acc.password)
        const payload = await signToken(user.password, acc.password, { id: acc._id.toString(), email: email })
        const token = {
            token: payload,
            user: acc.role
        }

        return token
    }

    // get current user
    async curentuser(Authorization): Promise<any> {

        const authToken = Authorization.authorization;
        if (!authToken) {
            throw new Error('Forbinderd Resource1');
        }
        const playload = await verifyToken(authToken.split('Bearer ')[1]);

        if (!playload) {
            throw new Error('Forbinderd Resource1');
        }
        const email = playload.email
        const userDoc = await this.userModel.findOne({ email });
        await delete userDoc?.password
        return userDoc
    }

    //update skills
    async updateskills(id, skills: any): Promise<any> {
        try {
           
            // Find the user by ID and update the roles array
            const updatedUser = await this.userModel.findOneAndUpdate(
                { _id: id },
                {  sSkills: skills.sSkills, $push: { improveS: skills.improveS }  },
                // { $push: { lskills: skills } },
                { new: true } // Returns the modified document
            );

            return updatedUser;
        } catch (error) {
            // Handle errors appropriately
            console.error('Error adding role:', error);
            throw new Error('Forbinderd Resource');
        }
    }
//update tec skills
    async updateTkills(id, skills: any): Promise<any> {
        try {
            console.log(id)
            console.log(skills)
            // Find the user by ID and update the roles array
            const updatedUser = await this.userModel.findOneAndUpdate(
                { _id: id },
                {  lskills: skills.lskills, $push: { improveS: skills.improveT }  },
                // { $push: { lskills: skills } },
                { new: true } // Returns the modified document
            );

            return updatedUser;
        } catch (error) {
            // Handle errors appropriately
            console.error('Error adding role:', error);
            throw new Error('Forbinderd Resource');
        }
    }

    //employee 
    //add employee
    async add(employee: User): Promise<any> {
        const email = employee.email;
        const existingUser = await this.userModel.findOne({ email });

        if (existingUser) {
           throw new Error('Forbinderd Resource');
        }
        try {
            employee.password = await createPasswordHash(employee.password)
            const newUser = await this.userModel.create(employee);
            return {
                status: 201,
                data: newUser,
            };
        } catch (error) {
            return {
                status: 500,
                error: error.message || 'Internal Server Error',
            };
        }
    }

    //get all employee
    async findAll(): Promise<User[]> {
        const employee = await this.userModel.find()
        return employee;
    }

    //delete employee by id
    async DeleteEmployee(id: string) {
        const employee = await this.userModel.findByIdAndDelete(id);
        return employee
    }

    //update employee data
    async updateEmployee(id: string, employee: User): Promise<User> {
        employee.password = await createPasswordHash(employee.password)

        return await this.userModel.findByIdAndUpdate(id, employee, {
            new: true,
            runValidators: true,
        });
    }
    
    //find employee by id
    async findbyid(id: string) {
        const employee = await this.userModel.findById(id);
        return employee
    }

}

//create token
export async function signToken(password: string, hash: string, payload: IauthPayload) {
    console.log(password)
    console.log(hash)
    const checPassword = await validatePassword(password, hash)
    console.log(checPassword)
    if (!checPassword) {
        throw new Error('No password match');
    }
    const token = jwt.sign(payload, APP_SECRET, JWT_OPTIONS)

    return {
        token,
        life: 3600,
    }
}

//create password hash
export function createPasswordHash(password: string) {
    return bcrypt.hash(password, 10);
}

//get pssword
export function validatePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash)
}

//validate token
export async function verifyToken(token: string) {
    const payload = jwt.verify(token, APP_SECRET, JWT_OPTIONS)
    return payload as IauthPayload;
}