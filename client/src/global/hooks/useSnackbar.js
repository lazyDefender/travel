import { useSelector } from 'react-redux'

const useSnackbar = () => {
    const snackbar = useSelector(state => state.snackbar)
    return snackbar
};

export default useSnackbar;