import { errors } from '../common/enum/errors';
import UserRepository from '../repositories/user.repository';
import OrderRepository from '../repositories/order.repository';

export default class UserService {
    static async create(user): Promise<ServiceResponse> {
        const createdUser = await UserRepository.create(user);

        return {
            data: createdUser,
            error: null,
        };
    }

    static async getAll(): Promise<ServiceResponse> {
        const users = await UserRepository.getAll();

        return {
            data: users,
            error: null,
        };
    }

    static async getById(id: string): Promise<ServiceResponse> {
        const user = await UserRepository.getById(id);
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

    static async getOrdersByUser(id: string): Promise<ServiceResponse> {
        const user = await UserRepository.getById(id);
        if(!user) {
            return {
                data: null,
                error: errors.USERS.notFoundById(id),
            };
        }

        const orders = await OrderRepository.getByUser(id);
        return {
            data: orders,
            error: null,
        };
    }

    static async getByUid(uid: string): Promise<ServiceResponse> {
        const user = await UserRepository.getByUid(uid);
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

    static async search(query) {
        const users = await UserRepository.search(query);
        return {
            data: users,
            error: null,
        };
    }

    static async update(id: string, dataToUpdate): Promise<ServiceResponse> {
        const user = await UserRepository.getById(id);
        if(user) {
            const updatedUser = await UserRepository.update(id, dataToUpdate);
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

    static async delete(id: string): Promise<ServiceResponse> {
        const user = await UserRepository.getById(id);

        if(user) {
            await UserRepository.delete(id);
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
