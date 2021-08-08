const errors = require('../common/enum/errors');
const OrderRepository = require('../repositories/order.repository');

class OrderService {
    static async create(order) {
        const createdOrder = await OrderRepository.create(order);

        return {
            data: createdOrder,
            error: null,
        };
    }

}

module.exports = OrderService;