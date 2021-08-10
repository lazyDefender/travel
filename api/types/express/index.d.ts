declare namespace Express {
    interface Request {
        result: any;
        userId: string;
        validationErrors: any[];
    }
}