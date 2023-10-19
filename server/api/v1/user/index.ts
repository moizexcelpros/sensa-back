import express from "express";
import controller from "./user.controller";
import { uploadMiddleware } from "../../../middlewares/file-upload";

const router = express.Router();

router.get('/', controller.get);
router.post('/', controller.create);
router.post('/:id', controller.setupUserPassword);
router.get('/:id', controller.getByID);
router.put('/:id', controller.update);
router.put('/profile/picture/:id', uploadMiddleware().single('file'), controller.updateProfilePicture);
router.delete('/:id', controller.delete);

export default router;
