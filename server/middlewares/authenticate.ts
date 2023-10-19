import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import { User } from "../models";
import { BaseController } from '../api/_base.controller';
import { compose } from 'compose-middleware';
import { config } from '../../environment/environment';

var validateJwt = expressjwt({
    secret: config.JWT_SECRET,
    algorithms: ['HS256']
});

export function isAuthenticated() {
    return compose([
        function (req, res, next) {
            if (typeof req.headers.authorization === 'undefined') {
                req.headers.authorization = `Bearer ${req.cookies.token}`;
            }
            validateJwt(req, res, next);
        },
        async function (req, res, next) {
            const user = await User.findOne({ _id: req.auth.id });

            if (!user) {

                return BaseController.prototype.response(res, {}, 401, "Not Authorized");
            }

            req.user = user;
            next();
            return null;

        }
    ]);
}

export function signToken(id, role) {
    return jwt.sign({ _id: id, role }, config.JWT_SECRET, {
        expiresIn: 60 * 60 * 5
    });
}
