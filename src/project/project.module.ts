import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { projectSchema } from './schemas/project.schema'
@Module({
  imports:[MongooseModule.forFeature([{name:'Project',schema:projectSchema}])],

  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
