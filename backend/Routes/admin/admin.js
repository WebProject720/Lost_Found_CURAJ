import { Router } from 'express'
import { AdminRegister } from '../../controllers/admin/register.js';
import { VerifyAdminMiddleware } from '../../middleware/adminVerify.js';
import { AdminLogin } from '../../controllers/admin/login.js';
import { UserList } from '../../controllers/admin/userlist.js';
import { ComplaintList } from '../../controllers/admin/complaints.js';
import { isAdminLogged } from '../../controllers/admin/islogged.js';
import { logoutAdmin } from '../../controllers/admin/logout.js';
import AdminList from '../../controllers/admin/adminList.js';
import deleteUser from '../../controllers/admin/deleteUser.js';
import deleteComplaint from '../../controllers/admin/deleteComplaint.js';
import { ChangePassword } from '../../controllers/users/changePassword.js';
import { changeActiveStatus } from '../../controllers/admin/blockStatus.js';

const AdminsRouter = Router();

AdminsRouter.route('/register').post(VerifyAdminMiddleware, AdminRegister);
AdminsRouter.route('/login').post(AdminLogin);
AdminsRouter.route('/logout').get(VerifyAdminMiddleware, logoutAdmin);
AdminsRouter.route('/islogged').post(isAdminLogged);

AdminsRouter.route('/users/list').get(VerifyAdminMiddleware, UserList);
AdminsRouter.route('/users/delete').post(VerifyAdminMiddleware, deleteUser);
AdminsRouter.route('/users/changepassword').post(VerifyAdminMiddleware, ChangePassword);
AdminsRouter.route('/users/changeblockstatus').post(VerifyAdminMiddleware, changeActiveStatus);


AdminsRouter.route('/complaints/list').post(VerifyAdminMiddleware, ComplaintList);
AdminsRouter.route('/complaints/delete').post(VerifyAdminMiddleware, deleteComplaint);

AdminsRouter.route('/list').get(VerifyAdminMiddleware, AdminList);
AdminsRouter.route('/changepassword').post(VerifyAdminMiddleware, ChangePassword);







export default AdminsRouter;