import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Введіть валідний email')
    .required('Введіть email'),
  password: Yup.string()
    .min(6, 'Пароль має містити щонайменше 6 символів')
    .required('Введіть пароль'),
});
