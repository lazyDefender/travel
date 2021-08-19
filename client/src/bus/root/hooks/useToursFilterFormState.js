import { useSelector } from 'react-redux';

const useToursFilterFormState = () => {
    const { formState } = useSelector(state => state.toursFilter);
    return formState;
};

export default useToursFilterFormState;
