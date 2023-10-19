import { Types } from "mongoose";
export interface IloginResponse {
    accessToken: string;
    id: string;
    email: string;
    username: string;
    roleId: Types.ObjectId;
    profilePicture: string;
    role: string;
    permissions: any;
    createdAt: Date,
}