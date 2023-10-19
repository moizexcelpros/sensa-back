import { Schema, model } from "mongoose";
import { IRoles, IAccess } from '../../types/roles';

export const RolesModelName = 'Roles';

const { Types } = Schema;

const RolesSchema = new Schema<IRoles>({
    role: { type: Types.String, unique: true },
    priority: { type: Types.String },
    access: { type: [] as IAccess[] },
    createdAt: { type: Types.Date, default: Date.now() }
});
RolesSchema.index({
    role: 1
})

export const Roles = model<IRoles>(RolesModelName, RolesSchema);