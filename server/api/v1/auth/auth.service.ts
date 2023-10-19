import { Roles, User } from "../../../models";
import jwt from "jsonwebtoken";
import { IloginResponse } from '../../../../types/auth';
import MailService from "../../../services/mail.service";
import { config } from "../../../../environment/environment";
import { compareSync, hashSync } from "bcrypt";

export class AuthService {

    constructor() { }

    login(credentials): Promise<IloginResponse> {
        return new Promise(async (resolve, reject) => {
            const { email, password } = credentials;
            try {
                if (!email) {
                    return reject({ code: 400, message: 'Invalid Email and Password.' })
                }
                if (!password) {
                    return reject({ code: 400, message: 'Invalid Password.' })
                }

                let user = await User.findOne({ email });
                if (!user) {
                    return reject({ message: 'User does not exists', code: 400 });
                }
                const passwordIsValid = compareSync(password, user.password);
                if (!passwordIsValid) {
                    return reject({ message: 'Email or Password invalid!', code: 400 });
                }

                const token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
                    expiresIn: 604800, // 1 week hours
                    algorithm: 'HS256'
                });

                let permissions = [];
                let role = '';

                Roles.findOne({ _id: user.roleId })
                    .then((res) => {
                        role = res.role;
                        res?.access?.forEach((access) => {
                            access?.permissions?.forEach((permission) => {
                                let obj = {
                                    featureName: permission.featureName,
                                    accessValue: permission.accessValue
                                }
                                permissions.push(obj);
                            });
                        });
                        return resolve({
                            id: user._id,
                            email: user.email,
                            username: user.username,
                            roleId: user.roleId,
                            profilePicture: user.profilePicture,
                            role,
                            permissions: permissions,
                            accessToken: token,
                            createdAt: user.createdAt,
                        })
                    });
            }
            catch (err) {
                reject(err);
            }
        });
    }
    forgotPassword(payload) {
        return new Promise(async (resolve, reject) => {
            try {

                const { email } = payload;

                if (!payload) {
                    return reject({ code: 400, message: "Invalid Payload" })
                }

                const user = await User.findOne({ email });

                if (!user) {
                    return reject({ message: 'No user found with requested email address', code: 400 });
                }

                const token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
                    expiresIn: 7200, // 2 hours
                    algorithm: 'HS256'
                });
                user.resetPasswordToken = token;
                await user.save();

                let options = {
                    username: user.username,
                    email: user.email,
                    resetPasswordToken: token
                }

                MailService.sendForgetPasswordEmail(options)
                    .then((success) => {
                        resolve(success);
                    })
                    .catch((error) => {
                        reject(error)
                    });

            } catch (err) {
                reject(err);
            }
        })
    }
    resetPassword(token, password) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!token) {
                    return reject({ message: 'Invaild token request', code: 400 });
                }

                const user = await User.findOne({ resetPasswordToken: token });

                if (!user) {
                    return reject({ message: 'Unauthorized reset password request', code: 400 });
                }

                user.password = await hashSync(password, 10);;
                user.resetPasswordToken = undefined;
                user.active = true;
                await user.save();

                let options = {
                    username: user.username,
                    email: user.email
                }

                MailService.sendPasswordRestEmail(options)
                    .then((success) => {
                        resolve(success);
                    })
                    .catch((error) => {
                        reject(error)
                    });
            } catch (err) {
                reject(err);
            }
        });
    }
}

export default new AuthService();
