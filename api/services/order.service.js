const errors = require('../common/enum/errors');
const OrderRepository = require('../repositories/OrderRepository');

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