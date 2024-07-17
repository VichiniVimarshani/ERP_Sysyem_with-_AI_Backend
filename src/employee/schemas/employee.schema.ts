import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})
export class Employee {
    @Prop()

    document: string;
    @Prop()
    documentname: string;
    @Prop()
    imageurl: string;
    @Prop()
    streetAddress2: string;
    @Prop()
    name: string;
    @Prop()
    email: string;
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
export const EmployeeSchema = SchemaFactory.createForClass(Employee)