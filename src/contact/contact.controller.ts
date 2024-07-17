import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './schemas/book.schema';

@Controller('contact')
export class ContactController {
    constructor(private contactService:ContactService){}

    
    @Get()
    async getAllContact():Promise<Contact[]>{
     
        return this.contactService.findAll();
    }
    
    @Post()
    async createContact(
        @Body()
        contact
    ):Promise<Contact>{
        console.log(contact)
        return this.contactService.create(contact)
    }

    @Put(':id')
    async updateContact(
        @Param('id')
        id:string,
        @Body()
        contact
    ):Promise<Contact>{
        return this.contactService.updateContact(id,contact)
    }

    @Delete(':id')
    async deleteContact(
        @Param('id')
        id:string,
        
    ){
        return this.contactService.DeleteContact(id)
    }


  

}
