import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})
export class User {

    @Prop()
    name: string;
    @Prop()
    email: string;
    @Prop()
    role: string;
    @Prop()
    password: string;
    @Prop({ type: [Object] }) // Define roles as an array of strings
    lskills: any[];
    @Prop({ type: [Object] }) 
    sSkills:any[];
    @Prop({ type: [Object] }) 
    improveS:any[];
    @Prop({ type: [Object] }) 
    improveT:any[];
    @Prop()
    document: string;
    @Prop()
    documentname: string;
    @Prop()
    imageurl: string;
    @Prop()
    streetAddress2: string;
    @Prop()
    type: string;
    @Prop()
    designation: string;
    @Prop()
    balance: number;
    @Prop()
    streetAddress: string;
    @Prop()
    city: string;
    @Prop()
    salary: number
    @Prop()
    stateFull: string;
    @Prop()
    zip: string;
    @Prop()
    NIC: string;
    @Prop()
    birthday: string;
    @Prop()
    accountNumber: string;
    @Prop()
    bankName: string;
    @Prop()
    membershipDate: string;


}
export const UserSchema = SchemaFactory.createForClass(User)