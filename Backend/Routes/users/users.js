import { Router } from 'express'
import { register } from '../../controllers/users/register.js';


const UserRouter=Router();



UserRouter.route('/register').post(register);





export default UserRouter;

