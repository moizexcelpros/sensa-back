import { IAccess, IRoles, ISubAccess } from "../../../../types/roles";
import { Roles } from "../../../models";
import { v4 as uuidv4 } from "uuid";

export class RolesService {

	constructor() { }

	async get(): Promise<Array<IRoles>> {
		return new Promise(async (resolve, reject) => {
			try {
				resolve(Roles.find({}))
			} catch (err) {
				return reject(err);
			}
		})
	}
	async getAccess(): Promise<Array<IAccess>> {
		return new Promise(async (resolve, reject) => {
			try {
				const [roles] = await Roles.find({});
				resolve(roles?.access || []);
			} catch (err) {
				return reject(err);
			}
		})
	}
	async getAccessPermission(): Promise<Array<ISubAccess>> {
		return new Promise(async (resolve, reject) => {
			try {
				const [roles] = await Roles.find({});
				let result = [];
				roles?.access.forEach((item) => {
					result = [...result, ...item.permissions];
				})
				resolve(result);
			} catch (err) {
				return reject(err);
			}
		})
	}
	async create(payload: IRoles): Promise<IRoles> {
		return new Promise(async (resolve, reject) => {
			try {
				if (!payload) {
					return reject({ code: 400, message: "Invalid Request Object." })
				}
				let roles = await Roles.find({});
				payload.access = roles[0]?.access;
				const post = new Roles(payload);
				return resolve(await post.save());
			} catch (err) {
				return reject(err);
			}
		})
	}
	async createRoleAccess(payload: any): Promise<Array<IRoles>> {
		return new Promise(async (resolve, reject) => {
			try {
				if (!payload) {
					return reject({ code: 400, message: "Invalid Request Object." })
				}
				let roles = await Roles.find({});
				let newPayload = [];

				let idForAccess = uuidv4();
				let idForPermssion = uuidv4();

				if (payload.categoryId) {
					roles.forEach((role) => {
						let obj = role;
						let access = []
						role.access.forEach((r) => {
							let obj1 = r;
							if (r._id === payload.categoryId) {
								obj1.permissions = [
									...obj1.permissions,
									{
										_id: idForPermssion,
										displayName: payload.displayName,
										keyword: payload.keyword,
									}
								]
							}
							access.push(obj1);
						})
						obj.access = access
						newPayload.push(obj);
					})
				} else {
					roles.forEach((role) => {
						let obj = role;
						let access = [
							...obj.access,
							{
								_id: idForAccess,
								category: payload.category,
								permissions: [{
									_id: idForPermssion,
									displayName: payload.displayName,
									keyword: payload.keyword,
								}]
							}
						]
						obj.access = access
						newPayload.push(obj);
					})
				}
				let promises = [];
				newPayload.forEach((pay) => {
					promises.push(Roles.findOneAndUpdate({ _id: pay._id }, pay));
				})
				Promise.all(promises).then((res) => {
					return resolve(res);
				}).catch((err) => {
					return reject(err);
				})
			} catch (err) {
				return reject(err);
			}
		})
	}
	async createPermissions(payload): Promise<Array<IRoles>> {
		return new Promise(async (resolve, reject) => {
			try {
				if (!payload) {
					return reject({ code: 400, message: "Invalid Request Object." })
				}
				let roles = await Roles.find({});
				let newPayload = [];

				roles.forEach((role) => {
					let obj = role;
					let accesss = []
					role.access.forEach((access) => {
						let obj1 = access;
						let perms = []
						access.permissions.forEach((permission) => {
							let obj2 = permission;
							if (permission._id === payload.accessId) {
								obj2 = {
									...obj2,
									displayFeatureName: payload.displayName,
									featureName: payload.featureName,
									accessValue: payload.accessValue,
								}
							}
							perms.push(obj2);
						})
						obj1.permissions = perms;
						accesss.push(obj1);
					})
					obj.access = accesss
					newPayload.push(obj);
				})

				let promises = [];
				newPayload.forEach((pay) => {
					promises.push(Roles.findOneAndUpdate({ _id: pay._id }, pay));
				})

				Promise.all(promises).then((res) => {
					return resolve(res);
				}).catch((err) => {
					return reject(err);
				})
			} catch (err) {
				return reject(err);
			}
		})
	}
	async getById(id): Promise<IRoles> {
		return new Promise(async (resolve, reject) => {
			try {
				if (!id) {
					return reject({ message: "Invalid Payload", code: 400 })
				}
				const [get] = await Roles.find({ _id: id });
				return resolve(get);
			} catch (err) {
				return reject(err);
			}
		})
	}
	async update(id, payload): Promise<IRoles> {
		return new Promise(async (resolve, reject) => {
			try {
				if (!id) {
					return reject({ message: "Invalid Payload", code: 400 })
				}
				if (!payload) {
					return reject({ message: "Invalid Payload", code: 400 })
				}
				const updateQuery = await Roles.findOneAndUpdate({ _id: id }, payload);
				return resolve(updateQuery);
			} catch (err) {
				return reject(err);
			}
		})
	}
	async updatePermission(id, payload): Promise<IRoles> {
		return new Promise(async (resolve, reject) => {
			try {
				if (!id) {
					return reject({ message: "Invalid Payload", code: 400 })
				}
				if (!payload) {
					return reject({ message: "Invalid Payload", code: 400 })
				}

				let [role] = await Roles.find({ _id: id });
				let accesss = []
				role.access.forEach((access) => {
					let obj1 = access;
					let perms = []
					access.permissions.forEach((permission) => {
						let obj2 = permission;
						if (payload[permission._id]) {
							obj2 = {
								...obj2,
								accessValue: payload[permission._id]
							}
						}
						perms.push(obj2);
					})
					obj1.permissions = perms;
					accesss.push(obj1);
				})
				role.access = accesss;

				const updateQuery = await Roles.findOneAndUpdate({ _id: id }, role);
				return resolve(updateQuery);
			} catch (err) {
				return reject(err);
			}
		})
	}
	async delete(id): Promise<IRoles> {
		return new Promise(async (resolve, reject) => {
			try {
				if (!id) {
					return reject({ message: "Invalid Payload", code: 400 })
				}
				const deleteQuery = await Roles.findOneAndDelete({ _id: id });
				return resolve(deleteQuery);
			} catch (err) {
				return reject(err);
			}
		})
	}
}

export default new RolesService();
