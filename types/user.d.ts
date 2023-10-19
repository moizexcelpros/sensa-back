import { Document, Types } from "mongoose";

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password?: string;
	phone?: string;
	address?: string;
	city?: string;
	country?: string;
	active?: boolean;
	postalCode?: string;
	profilePicture?: string;
	roleId: Types.ObjectId
	resetPasswordToken?: string;
	createdAt?: Date;
}