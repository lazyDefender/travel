import { errors } from '../common/enum/errors';
import OrderRepository from '../repositories/order.repository';

export default class OrderService {
    static async create(order): Promise<ServiceResponse> {
        const createdOrder = await OrderRepository.create(order);

        return {
            data: createdOrder,
            error: null,
        };
    }

}
