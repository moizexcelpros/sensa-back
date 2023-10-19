import { Schema, model } from "mongoose";
import { IUser } from '../../types/user';

export const UserModelName = 'User';

const { Types } = Schema;

const UserSchema = new Schema<IUser>({
	firstName: { type: Types.String },
	lastName: { type: Types.String },
	username: { type: Types.String },
	email: {
		type: Types.String,
		unique: true,
		lowercase: true,
		required: true
	},
	password: { type: Types.String },
	roleId: { type: Types.ObjectId },
	phone: { type: Types.String },
	address: { type: Types.String },
	city: { type: Types.String },
	country: { type: Types.String },
	active: { type: Types.Boolean },
	postalCode: { type: Types.String },
	profilePicture: { type: Types.String },
	resetPasswordToken: String,
	createdAt: {
		type: Types.Date,
		default: Date.now()
	}
});
UserSchema.index({
	roleId: 1
})
UserSchema.index({
	type: 1
})
UserSchema.index({
	type: 1,
	roleId: 1
})
UserSchema.index({
	email: 1
})
export const User = model<IUser>(UserModelName, UserSchema);