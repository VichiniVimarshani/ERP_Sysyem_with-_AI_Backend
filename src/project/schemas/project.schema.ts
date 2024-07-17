import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps:true
})
export class Project{
    @Prop()
    projectName: string;
    @Prop()
    id:string;
    @Prop()
    team: string;
    @Prop()
    teamId: string;
    @Prop()
    leader:string;
    @Prop({ type: [Object] })
    task:any[];



}
export const projectSchema = SchemaFactory.createForClass(Project)