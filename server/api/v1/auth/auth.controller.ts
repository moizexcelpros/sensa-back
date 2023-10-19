import { Request, Response } from "express";
import l, { logger } from "../../../common/logger";
import { manageError } from "../../../helper/response.helper";
import AuthService from "./auth.service";
import HelperService from "../../../services/helper.service";
import { BaseController } from "../../_base.controller";

export class Controller extends BaseController {
    
    async login(req: Request, res: Response): Promise<void> {
        try {
            const response = await AuthService.login(req.body);
            res.cookie('token', response.accessToken);
            super.response(res, response, 200, "Logged In SuccessFully");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in login, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
    async getLoggedInUser(req: Request, res: Response): Promise<void> {
        try {
            const response = await HelperService.tranformMeData(req.user)
            super.response(res, response, 200, "Fetched currect loggedin user successfully");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in login, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
    async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
            const user = await AuthService.forgotPassword(req.body);
            super.response(res, user, 200, "Forget Password Email sent Successfully!");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in sending email for resetting password, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
    async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            const user = await AuthService.resetPassword(req.body.token, req.body.password);
            super.response(res, user, 200, "Reset Password Email sent Successfully!");
        }
        catch (error) {
            logger.error(error);
            const err = manageError(error);
            l.error(`Error in resetting password, err code: ${400}`);
            l.error(err.message);
            super.response(res, '', err.code, err.message);
        }
    }
}

export default new Controller();
