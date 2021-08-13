import { errors } from '../common/enum/errors';

export default class OrderService {
    _orderRepository;

    constructor({ orderRepository }) {
        this._orderRepository = orderRepository;
    }

    async create(order): Promise<ServiceResponse> {
        const createdOrder = await this._orderRepository.create(order);

        return {
            data: createdOrder,
            error: null,
        };
    }

}
