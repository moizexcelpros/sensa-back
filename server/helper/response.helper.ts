import l, { logger } from '../common/logger';


export interface IErrorObject {
	message: string,
	code: number
}
/**
 * Handle and prettify error in user readable form
 * @param err
 * @param uniqueKeysMapList list => [{key: String, searchable: String}]
 * @returns Object => {message: String, code: Number}
 */
export function manageError(err, uniqueKeysMapList = []): IErrorObject {

	l.error(err);
	

	logger.error(err);

	let errObject = {
		message: 'Error in operation',
		code: 400,
		...err
	};

	const code = err.code || err.statusCode;

	//If error is not given then return default error
	// if (!err) return errObject;
	// console.log("^^^^^^^^^^^^^^",err,typeof err)
	// try{
	// 	errObject = Object.assign(err, errObject);
	// } catch(e){
	// 	console.log("*****************",e)
	// }



	//Errors raised from the result of query like, validations error
	/* if (err.errors.constructor == Object) {
		let msg = '';
		err.errors.forEach(function (err) {
			if (msg) msg += ' ,';
			msg += err.message;
		});
	
		errObject.message = msg;
	
		//Set default status code to 400
		errObject.code = 400;
	} */

	//Errors raised from the result of query like, validations error
	if (Array.isArray(err.errors)) {
		let msg = '';
		err.errors.forEach(function (err) {
			if (msg) msg += ' ,';
			msg += err.message;
		});

		errObject.message = msg;

		//Set default status code to 422
		errObject.code = 422;
	}

	//User generated errors, like duplicate email, token expired

	if (err.message && code) {
		if (err.code === 11000) {
			uniqueKeysMapList.forEach((uniqueKeyMap) => {
				if (err.message.includes(uniqueKeyMap.searchable)) {
					errObject[uniqueKeyMap.key] = {
						message: `${uniqueKeyMap.key} already exists`
					};
				}
			});
		} else {
			errObject.message = err.message;
			errObject.code = code;
		}

	}
	//Uncaught exception
	else if (err.message && err.name == 'TypeError') {
		errObject.message = err.message;
		errObject.code = 422;
	}
	else if (err.message) {
		errObject.message = err.message;
		errObject.code = 422;
	}

	// Handle server errors
	if (typeof errObject.code !== 'number' || errObject.code > 500 || errObject.code < 400) {

		// TODO: Handle knex DB error
		errObject.code = 400;
		errObject.message = 'Please contact with admin for this issue!'
	}

	return errObject;
}


