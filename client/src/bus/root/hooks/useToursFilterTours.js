import { useSelector } from 'react-redux';

const useToursFilterTours = () => {
    const { tours } = useSelector(state => state.toursFilter);
    return tours;
};

export default useToursFilterTours;
