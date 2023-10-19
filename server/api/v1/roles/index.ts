import express from "express";
import controller from "./roles.controller";

const router = express.Router();

router.get('/', controller.get);
router.get('/all/access', controller.getAccess);
router.get('/all/access/permission', controller.getAccessPermission);
router.post('/', controller.create);
router.post('/access/feature', controller.createRoleAccess);
router.post('/permission', controller.createPermissions);
router.get('/:id', controller.getByID);
router.put('/:id', controller.update);
router.put('/update/permissions/:id', controller.updatePermission);
router.delete('/:id', controller.delete);

export default router;
