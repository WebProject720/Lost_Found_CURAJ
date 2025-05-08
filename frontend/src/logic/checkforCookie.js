import { UserAPI } from "../APIs/users/usersAPI";
import { AdminPostAPIs } from "../APIs/admin/adminAPIs";

import { logout, setUserInfo } from "../store";
import { navigate } from "../router"; // Assuming you have a navigate function

// Time threshold in milliseconds (e.g., 5 minutes)
const CHECK_INTERVAL = 5 * 60 * 1000;


