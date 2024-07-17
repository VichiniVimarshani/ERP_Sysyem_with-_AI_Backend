import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './schemas/book.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class ContactService {
    constructor(
        @InjectModel(Contact.name)
        private contactModel:mongoose.Model<Contact>
    ){}
    async findAll(): Promise<Contact[]>{
        const contact=await this.contactModel.find()
        return contact;
    }

    async create(contact:Contact):Promise<Contact>{
        const res= await this.contactModel.create(contact)
        return res

    }

    async updateContact( id:string, contact:Contact):Promise<Contact>{
        return await this.contactModel.findByIdAndUpdate(id,contact,{
            new:true,
            runValidators:true,
        });
    }

    async DeleteContact( id:string){
        const contact=await this.contactModel.findByIdAndDelete(id);
    return contact
    }
}
