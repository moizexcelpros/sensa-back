import { IUser } from "../../../../types/user";
import { User } from "../../../models";
import jwt from "jsonwebtoken";
import MailService from "../../../services/mail.service";
import GoogleDriveService from "../../../services/google-drive.service";
import { config } from "../../../../environment/environment";
import { Types } from "mongoose";

export class UserService {

	constructor() { }

	async get(): Promise<Array<IUser>> {
		return new Promise(async (resolve, reject) => {
			try {
				let get = await User.find({});
				return resolve(get);
			} catch (err) {
				return reject(err);
			}
		})
	}
	async create(userData: IUser): Promise<IUser> {
		return new Promise(async (resolve, reject) => {
			try {
				if (!userData?.email) {
					return reject({ code: 400, message: 'Invalid Email.' })
				}
				if (!userData?.username) {
					return reject({ code: 400, message: 'Invalid Username.' })
				}
				if (!userData?.roleId) {
					return reject({ code: 400, message: 'Invalid Role.' })
				}

				const email = userData.email.toLowerCase();

				const oldUser = await User.findOne({ email: email }).lean();

				if (oldUser) {
					return reject({ code: 409, message: 'User already exists with this email.' })
				}
				const password = '';

				const payload = { ...userData, email, password };
				payload.roleId = new Types.ObjectId(String(payload.roleId));

				const userInstance = new User(payload);

				return resolve(userInstance.save());
			} catch (err) {
				return reject(err);
			}
		})
	}
	async setupUserPassword(id): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				if (!id) {
					return reject({ code: 400, message: "Invalid Request ID" })
				}

				const user = await User.findOne({ _id: id });

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

				MailService.sendSetupPasswordEmail(options)
					.then((success) => {
						resolve(success);
					})
					.catch((error) => {
						reject(error)
					});
			} catch (err) {
				return reject(err);
			}
		})
	}
	async getById(id): Promise<IUser> {
		return new Promise(async (resolve, reject) => {
			try {
				if (!id) {
					return reject({ message: "Invalid Payload", code: 400 })
				}
				const [get] = await User.find({ _id: id });
				return resolve(get);
			} catch (err) {
				return reject(err);
			}
		})
	}
	async update(id, user): Promise<IUser> {
		return new Promise(async (resolve, reject) => {
			try {
				if (!id) {
					return reject({ message: "Invalid Payload", code: 400 })
				}
				if (!user) {
					return reject({ message: "Invalid Payload", code: 400 })
				}
				const updateQuery = await User.findOneAndUpdate({ _id: id }, user);
				return resolve(updateQuery);
			} catch (err) {
				return reject(err);
			}
		})
	}
	async updateProfilePicture(id, file: Express.Multer.File): Promise<any> {
		return new Promise(async (resolve, reject) => {
			try {
				if (!id || !file) {
					return reject({ message: "Invalid Payload", code: 400 })
				}
				GoogleDriveService.uploadFile(file).then(async (res: any) => {
					await User.findOneAndUpdate({ _id: id }, {
						profilePicture: res.webContentLink
					});
					return resolve({
						profileImage: res.webContentLink
					});
				}).catch((err) => {
					return reject(err);
				});
			} catch (err) {
				return reject(err);
			}
		})
	}
	async delete(id): Promise<IUser> {
		return new Promise(async (resolve, reject) => {
			try {
				if (!id) {
					return reject({ message: "Invalid Payload", code: 400 })
				}
				const deleteQuery = await User.findOneAndDelete({ _id: id });
				return resolve(deleteQuery);
			} catch (err) {
				return reject(err);
			}
		})
	}
}

export default new UserService();
