import './App.css'
import { Routes as Router, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './components/Layout';
import { useContext } from 'react';
import AuthContext from './context/AuthProvider';

type Props = {}

const ProtectedRoutes = () => {
    const { auth } = useContext(AuthContext)
    if (!auth) return <Navigate to='/login' replace />
    return <Layout />
}

const Routes = (props: Props) => {

    return (
        <Router>
            {/* public */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />

            {/* private */}
            <Route element={<ProtectedRoutes />}>
                <Route path="/" element={<Home />} />
            </Route>

        </Router>
    );
}

export default Routes;
