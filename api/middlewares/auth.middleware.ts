import UserRepository from '../repositories/user.repository';
import AuthService from '../services/auth.service';

export const isAuth = async (req, res, next) => {
    const token = req.header('authorization');
    const userRepository = new UserRepository();
    const authService = new AuthService({ userRepository });

    const { data: user, error } = await authService.verifyToken(token);

    console.log(user, error);
    

    if(error) {
        const body = {
            errors: [error],
        };
        return res.status(401).json(body);
    }
    else {
        req.user = user;
        next();
    }

    
};
