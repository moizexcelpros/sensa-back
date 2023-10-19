import { config } from "../../environment/environment";
import axios from "axios";
import { google } from "googleapis";
import { OAuth2Client } from 'google-auth-library';

const { OAuth2 } = google.auth;

export class OAuthService {

    getOAuthClient(): Promise<OAuth2Client> {
        return new Promise(async (resolve, reject) => {
            try {
                const oAuth2Client = new OAuth2(
                    config.CLIENT_ID,
                    config.CLIENT_SECRET_ID
                )
                const accessToken = await this.getAccessToken((token) => {
                    const newToken = {
                        access_token: token.access_token,
                        refresh_token: process.env.REFRESH_TOKEN,
                        expires_at: new Date(Date.now() + token.expires_in * 1000),
                    };
                    oAuth2Client.setCredentials(newToken);
                })
                return resolve(oAuth2Client);
            } catch (err) {
                return reject(err);
            }
        })
    }

    getAccessToken(next) {
        return new Promise(async (resolve, reject) => {
            try {
                axios.post(config.GOOGLE_TOKEN_API, {
                    client_id: config.CLIENT_ID,
                    client_secret: config.CLIENT_SECRET_ID,
                    refresh_token: config.REFRESH_TOKEN,
                    grant_type: "refresh_token",
                })
                    .then((response) => {
                        return resolve(next(response.data))
                    })
                    .catch((error) => {
                        console.log("chala1", error);
                        return reject(error);
                    });

            } catch (err) {
                return reject(err);
            }
        })
    }
}

export default new OAuthService();