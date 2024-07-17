import { Injectable } from '@nestjs/common';
import { Project } from './schemas/project.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project.name)
        private projectModel:mongoose.Model<Project>
    ){}
    async findAll(): Promise<Project[]>{
        const project=await this.projectModel.find()
        return project;
    }

    async create(project:Project):Promise<Project>{
        const res= await this.projectModel.create(project)
        return res

    }

    async Deleteproject(id: string) {
        const project = await this.projectModel.findByIdAndDelete(id);
        return project
    }
    async findbyid( id:string){
        const project=await this.projectModel.findById(id);
    return project
    }
    
    async updateTeam( id:string, project:Project):Promise<Project>{
        return await this.projectModel.findByIdAndUpdate(id,project,{
            new:true,
            runValidators:true,
        });
    }
}
