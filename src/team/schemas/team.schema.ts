import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps:true
})
export class Team{
    @Prop()
    TeamName:string;
    @Prop()
    email:string;
    @Prop()
    leader:string;
    @Prop()
    leaderId:string;
    @Prop()
    id:string;
    @Prop({ type: [Object] }) // Define roles as an array of strings
    employees: any[];

}
export const TeamSchema = SchemaFactory.createForClass(Team)