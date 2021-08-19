import { AuthErrorCodes } from "../common/enums/authErrorCodes";

export const getAuthErrorMessage = (code) => {
    switch(code) {
        case AuthErrorCodes.INVALID_EMAIL:
            return 'Невалідний email';
        case AuthErrorCodes.USER_DISABLED:
            return 'Користувач заблокований';
        case AuthErrorCodes.USER_NOT_FOUND:
            return 'Користувача не знайдено';
        case AuthErrorCodes.WROND_PASSWORD:
            return 'Неправильний пароль';
        case AuthErrorCodes.EMAIL_ALREADY_IN_USE:
            return 'Користувач із введеним email існує';
        default:
            return;
    } 
};