import { Router } from 'express'
import { AdminRegister } from '../../controllers/admin/register.js';
import { VerifyAdminMiddleware } from '../../middleware/adminVerify.js';
import { AdminLogin } from '../../controllers/admin/login.js';
import { UserList } from '../../controllers/admin/userlist.js';
import { ComplaintList } from '../../controllers/admin/complaints.js';


const AdminsRouter = Router();
AdminsRouter.route('/register').post(VerifyAdminMiddleware, AdminRegister);
AdminsRouter.route('/login').post(AdminLogin);
AdminsRouter.route('/users/list').get(VerifyAdminMiddleware, UserList);
AdminsRouter.route('/complaints/list').post(VerifyAdminMiddleware, ComplaintList);







export default AdminsRouter;