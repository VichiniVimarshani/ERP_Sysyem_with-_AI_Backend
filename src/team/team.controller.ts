import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TeamService } from './team.service';
import { Team } from './schemas/team.schema';

@Controller('team')
export class TeamController {
    constructor(private teamService:TeamService){}

    @Get()
    async getAllteams():Promise<Team[]>{
     
        return this.teamService.findAll();
    }
    
    @Post()
    async createTeam(
        @Body()
        team
    ):Promise<Team>{
        console.log(team)
        return this.teamService.create(team)
    }
    @Delete(':id')
    async deleteeteam(
        @Param('id')
        id:string,
    ){
        return this.teamService.Deleteteam(id)
    }
    @Get(':id')
    async getemployebyid(
        @Param('id')
        id:string,
        
    ){
        return this.teamService.findbyid(id)
    }
    @Put(':id')
    async updateContact(
        @Param('id')
        id:string,
        @Body()
        team
    ):Promise<Team>{
        return this.teamService.updateTeam(id,team)
    }


}
