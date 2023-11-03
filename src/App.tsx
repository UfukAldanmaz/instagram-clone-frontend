import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AuthContext, { AuthProvider } from "./context/AuthProvider";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "./pages/UserProfile";
import { useContext } from "react";

const App: React.FC = () => {
  const { getUser } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes />
          {getUser() && <UserProfile />}
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
