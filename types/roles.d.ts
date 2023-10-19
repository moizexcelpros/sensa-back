import { Document } from "mongoose";

export interface ISubAccess {
    _id?: string;
    displayName?: string;
    keyword?: string;
    featureName?: string;
    displayFeatureName?: string;
    accessValue?: number;
}

export interface IAccess {
    _id?: string;
    category?: string;
    permissions?: Array<ISubAccess>;
}

export interface IRoles extends Document {
    role: string;
    priority: string;
    access?: Array<IAccess>;
    createdAt?: Date;
}
