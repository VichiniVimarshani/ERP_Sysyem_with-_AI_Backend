import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project} from './schemas/project.schema';

@Controller('project')
export class ProjectController {

    constructor(private ProjectService:ProjectService){}

    @Get()
    async getAllProject():Promise<Project[]>{
     
        return this.ProjectService.findAll();
    }
    
    @Post()
    async createTeam(
        @Body()
        project
    ):Promise<Project>{
     
        return this.ProjectService.create(project)
    }
    @Delete(':id')
    async deleteproject(
        @Param('id')
        id:string,
    ){
        return this.ProjectService.Deleteproject(id)
    }
    @Get(':id')
    async getprojectid(
        @Param('id')
        id:string,
        
    ){
        return this.ProjectService.findbyid(id)
    }
    @Put(':id')
    async updateContact(
        @Param('id')
        id:string,
        @Body()
        team
    ):Promise<Project>{
        return this.ProjectService.updateTeam(id,team)
    }

}
