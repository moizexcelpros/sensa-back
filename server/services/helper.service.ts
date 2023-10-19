import { IUser } from '../../types/user';
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import { Roles } from '../models';

export class HelperService {

    tranformMeData(user: IUser) {
        return new Promise((resolve, reject) => {
            try {
                let permissions = [];
                let role = '';
                Roles.find({ _id: user.roleId })
                    .then((res) => {
                        if (res.length) {
                            let one = res[0];
                            role = one.role;
                            one.access.forEach((access) => {
                                access.permissions.forEach((permission) => {
                                    let obj = {
                                        featureName: permission.featureName,
                                        accessValue: permission.accessValue
                                    }
                                    permissions.push(obj);
                                });
                            });
                            resolve({
                                id: user._id,
                                email: user.email,
                                username: user.username,
                                roleId: user.roleId,
                                profilePicture: user.profilePicture,
                                role,
                                permissions: permissions,
                                createdAt: user.createdAt,
                            })
                        }
                    });
            } catch (e) {
                return reject(e);
            }
        })
    }

    handleFileDetails(file) {
        let requestedFile = file;
        const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        const extension = path.parse(file.originalname).ext;
        requestedFile.originalname = `${filename}${extension}`;
        return requestedFile;
    }

}

export default new HelperService();