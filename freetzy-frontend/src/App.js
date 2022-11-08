import "./App.css";

//Import wouter
import { Link, Route } from "wouter";

//Import páginas
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ResetPasswordScreen from "./pages/ResetPasswordScreen";
import ForgotPasswordScreen from "./pages/ForgotPasswordScreen";
import PrivateScreen from "./pages/PrivateScreen";

function App() {
  return (
    <>
      <div>
        <Link href="/login">
          <a href="/login">Iniciar sesión </a>
        </Link>
        <Route path="/login" component={LoginScreen} />
      </div>

      <div>
        <Link href="/forgotpassword">
          <a href="/forgotpassword">Contraseña olvidada</a>
        </Link>
        <Route path="/forgotpassword" component={ForgotPasswordScreen} />
      </div>

      <div>
        <Link href="/register">
          <a href="/register">Registrarse</a>
        </Link>
        <Route path="/register" component={RegisterScreen} />
      </div>

      <div>
        <Link href="/Private">
          <a href="/Private">Private</a>
        </Link>
        <Route path="/Private" component={PrivateScreen} />
      </div>

      <div>
        <Link href="/resetpassword">
          <a href="/resetpassword">Restablecer contraseña</a>
        </Link>
        <Route path="/resetpassword" component={ResetPasswordScreen} />
      </div>
    </>
  );
}

export default App;
