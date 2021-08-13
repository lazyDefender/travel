import { errors } from '../common/enum/errors';

export default class UserService {
    _userRepository;
    _orderRepository;

    constructor({ userRepository, orderRepository }) {
        this._userRepository = userRepository;
        this._orderRepository = orderRepository;
    }

    async create(user): Promise<ServiceResponse> {
        const createdUser = await this._userRepository.create(user);

        return {
            data: createdUser,
            error: null,
        };
    }

    async getAll(): Promise<ServiceResponse> {
        const users = await this._userRepository.getAll();

        return {
            data: users,
            error: null,
        };
    }

    async getById(id: string): Promise<ServiceResponse> {
        const user = await this._userRepository.getById(id);
        if(!user) {
            return {
                data: null,
                error: errors.USERS.notFoundById(id),
            };
        }
        
        return {
            data: user,
            error: null,
        };
    }

    async getOrdersByUser(id: string): Promise<ServiceResponse> {
        const user = await this._userRepository.getById(id);
        if(!user) {
            return {
                data: null,
                error: errors.USERS.notFoundById(id),
            };
        }

        const orders = await this._orderRepository.getByUser(id);
        return {
            data: orders,
            error: null,
        };
    }

    async getByUid(uid: string): Promise<ServiceResponse> {
        const user = await this._userRepository.getByUid(uid);
        if(!user) {
            return {
                data: null,
                error: errors.USERS.notFoundByUid(uid),
            };
        }
        
        return {
            data: user,
            error: null,
        };
    }

    async search(query) {
        const users = await this._userRepository.search(query);
        return {
            data: users,
            error: null,
        };
    }

    async update(id: string, dataToUpdate): Promise<ServiceResponse> {
        const user = await this._userRepository.getById(id);
        if(user) {
            const updatedUser = await this._userRepository.update(id, dataToUpdate);
            if(!updatedUser) {
                return null;
            }

            return {
                data: updatedUser,
                error: null,
            };
        }
        else {
            return {
                data: null,
                error: errors.USERS.notFoundById(id),
            }    
        }
        
    }

    async delete(id: string): Promise<ServiceResponse> {
        const user = await this._userRepository.getById(id);

        if(user) {
            await this._userRepository.delete(id);
            return {
                data: null,
                error: null,
            }
        }

        else {
            return {
                data: null,
                error: errors.USERS.notFoundById(id),
            }    
        }
    }
}
