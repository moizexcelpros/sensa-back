import stream from "stream";
import { google } from "googleapis";
import OAuthService from "./oAuth.service";
import fs from "fs";

export class GoogleDriveService {
    async uploadFile(fileObj) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await google
                    .drive({ version: "v3", auth: await OAuthService.getOAuthClient() })
                    .files.create({

                        media: {
                            mimeType: fileObj.mimeType,
                            body: fs.createReadStream(`./${fileObj.path}`),
                        },
                        requestBody: {
                            name: fileObj.filename,
                            parents: ['1Lf7swIdHD3hFM0CL-o9sriutTncz8zI5']
                        },
                    });
                const publicRespons = await this.makeUploadedFilePublic(data.id);
                resolve(publicRespons);
            } catch (err) {
                return reject(err);
            }
        })
    }

    async makeUploadedFilePublic(fileId) {
        return new Promise(async (resolve, reject) => {
            try {
                await google
                    .drive({ version: "v3", auth: await OAuthService.getOAuthClient() })
                    .permissions.create({
                        fileId: fileId,
                        requestBody: {
                            role: "reader",
                            type: "anyone",
                        },
                    });

                const result = await google
                    .drive({ version: "v3", auth: await OAuthService.getOAuthClient() })
                    .files.get({
                        fileId: fileId,
                        fields: "webViewLink , webContentLink",
                    });
                resolve(result.data);
            } catch (err) {
                return reject(err);
            }
        })
    }

}

export default new GoogleDriveService();