import { useUser } from '../stores/user.store';
import { Navigate, Outlet } from 'react-router-dom';

function AuthGuard({ redirectPath = '/' }) {
    const isLogged = useUser((state) => state.isAuth);
    if (!isLogged) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
}

export default AuthGuard