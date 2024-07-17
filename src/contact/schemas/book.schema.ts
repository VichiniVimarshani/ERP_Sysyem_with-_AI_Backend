import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps:true
})
export class Contact{
    @Prop()
    name:string;
    @Prop()
    email:string;
    @Prop()
    phone:string;
    @Prop()
    massage:string;
}
export const ContactSchema = SchemaFactory.createForClass(Contact)