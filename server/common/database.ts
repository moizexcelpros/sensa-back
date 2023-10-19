import mongoose, { connection } from "mongoose";
(mongoose as any).Promise = Promise;
// import mongoosePaginate from 'mongoose-paginate-v2';
import { config } from "../../environment/environment";
import l, { logger } from "./logger";
const db = mongoose.Connection

let isConnected: boolean;

const dbOption: mongoose.ConnectOptions = {
	// autoReconnect: true,
	// useNewUrlParser: true,
	// poolSize: 5,
	// useUnifiedTopology: false
};

// const mongoosePaginateOptions = {
// 	customLabels: {
// 		docs: 'rows',
// 		limit: 'pageSize',
// 		page: 'pageIndex'
// 	}
// }

// mongoosePaginate.paginate.options = mongoosePaginateOptions;


export function connectDB() {
	return new Promise((resolve, reject) => {
		mongoose.connection.on('connected', function () {
			l.info('Mongoose successfully connected');
			isConnected = true;
			resolve(db);
		});

		mongoose.connection.on('error', function (err) {
			logger.error(err);
			l.error(`Mongoose default connection has occured error ${err}`);
		});

		mongoose.connection.on('disconnected', function () {
			l.warn('Mongoose connection disconnected');
		});

		process.on('SIGINT', () => {
			console.log("Mongoose default connection is disconnected due to application termination", mongoose.connection.readyState);
			process.exit(0);
		});

		try {
			mongoose.connect(config.MONGODB_URI, dbOption)
		}
		catch (err) {
			logger.error(err);
			console.log(err);
		}
	})
}
