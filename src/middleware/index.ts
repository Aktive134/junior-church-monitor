import validateToken from "./validate-token";
import validateParent from "./validate-parent";
import validateUser from "./validate-user";
const middlewares = {
    validateToken, validateParent, validateUser
} 

export default middlewares;