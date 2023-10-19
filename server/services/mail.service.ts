import { config } from "../../environment/environment";
import ejs from "ejs";
import { google } from "googleapis";
import OAuthService from "./oAuth.service";
const MailComposer = require('nodemailer/lib/mail-composer');

export class MailService {

    public sendForgetPasswordEmail(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let email = await ejs.renderFile("./templates/MailTemplate/passwordReset.ejs", {
                    userName: data.username,
                    link: `${config.APP_HOST}/reset-password/${data.resetPasswordToken}`,
                    reset: true,
                });
                const options = {
                    to: data?.email,
                    subject: "Password Reset",
                    template: "index",
                    html: email,
                    textEncoding: "base64",
                };
                this.sendMail(options).then((e) => {
                    return resolve(e);
                });
            } catch (err) {
                return reject(err);
            }
        })
    }
    public sendSetupPasswordEmail(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let email = await ejs.renderFile("./templates/MailTemplate/userCreated.ejs", {
                    userName: data.username,
                    link: `${config.APP_HOST}/reset-password/${data.resetPasswordToken}`
                });
                const options = {
                    to: data?.email,
                    subject: `Setup Password for New User with email ${data?.email}`,
                    template: "index",
                    html: email,
                    textEncoding: "base64",
                };
                this.sendMail(options).then((e) => {
                    return resolve(e);
                });
            } catch (err) {
                return reject(err);
            }
        })
    }
    public sendPasswordRestEmail(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let email = await ejs.renderFile(
                    "./templates/MailTemplate/successPassword.ejs",
                    { userName: data.username }
                );

                const options = {
                    to: data.email,
                    subject: "Password Change Successful",
                    template: "index",
                    html: email,
                    textEncoding: "base64",
                };
                this.sendMail(options).then((e) => {
                    return resolve(e);
                });
            } catch (err) {
                return reject(err);
            }
        })
    }
    // private
    private encodeMessage(message) {
        return Buffer.from(message)
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    };
    private async createMail(options) {
        const mailComposer = new MailComposer(options);
        const message = await mailComposer.compile().build();
        return this.encodeMessage(message);
    };
    private sendMail(options) {
        return new Promise(async (resolve, reject) => {
            try {
                const gmail = google.gmail({ version: 'v1', auth: await OAuthService.getOAuthClient() });
                const rawMessage = await this.createMail(options);
                const { data: { id } = {} } = await gmail.users.messages.send({
                    userId: 'me',
                    requestBody: {
                        raw: rawMessage
                    }
                })
                return resolve(id);
            } catch (err) {
                return reject(err);
            }
        })
    }

}

export default new MailService();