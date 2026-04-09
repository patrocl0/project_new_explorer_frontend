import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isLoggedIn, isAuthChecked } = useContext(AppContext);

  console.log("Protected", isLoggedIn);

  if (!isAuthChecked) {
    return <p>Cargando...</p>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // De otra forma, renderiza el componente hijo de la ruta protegida.
  return children;
}

export default ProtectedRoute;
