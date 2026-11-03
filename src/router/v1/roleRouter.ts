import {Router} from 'express'
import roleController from "../../controller/roleController";
import {auth} from "../../middleware/auth";
import {checkRoleAdmin} from "../../middleware/checkRoleAdmin";

const roleRouter = Router();
roleRouter.use(auth);
roleRouter.use(checkRoleAdmin);
/**
 * @openapi
 * /roles:
 *   get:
 *     tags: [Roles]
 *     summary: List roles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Role list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleListResponse'
 *         example:
 *           success: true
 *           data:
 *             - id: 1
 *               name: admin
 *             - id: 2
 *               name: teacher
 *       401:
 *         description: Missing or expired token
 *         content:
 *           application/json:
 *             example:
 *               message: No token provided
 *               success: false
 */
roleRouter.get('', roleController.all);
roleRouter.post('', roleController.save);
roleRouter.put('/:id', roleController.update);
roleRouter.delete('/:id', roleController.delete);

export default roleRouter
