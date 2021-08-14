import { orderValidation } from '../validation';
import { isAuth } from '../middlewares/auth.middleware';
import { OrdersApiPath } from '../common/enum/api';
import { validate } from '../middlewares/validation.middleware';

export const initOrder = (Router, services) => {
    const router = Router();
    const { orderService } = services;

    router.post(OrdersApiPath.ROOT, isAuth, validate(orderValidation.save), async (req, res, next) => {
        const { data: createdOrder, error } = await orderService.create(req.body);
        req.result = {
            status: 201,
            body: createdOrder,
        };
            
        next();
    });

    return router;
}
