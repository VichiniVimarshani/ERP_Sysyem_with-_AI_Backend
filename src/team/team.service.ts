import { Injectable } from '@nestjs/common';
import { Team } from './schemas/team.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TeamService {
    constructor(
        @InjectModel(Team.name)
        private teamModel:mongoose.Model<Team>
    ){}
    async findAll(): Promise<Team[]>{
        const team=await this.teamModel.find()
        return team;
    }

    async create(team:Team):Promise<Team>{
        const res= await this.teamModel.create(team)
        return res

    }

    async Deleteteam(id: string) {
        const team = await this.teamModel.findByIdAndDelete(id);
        return team
    }
    async findbyid( id:string){
        const team=await this.teamModel.findById(id);
    return team
    }
    
    async updateTeam( id:string, team:Team):Promise<Team>{
        return await this.teamModel.findByIdAndUpdate(id,team,{
            new:true,
            runValidators:true,
        });
    }


}
