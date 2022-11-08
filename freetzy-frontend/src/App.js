import logo from "./logo.svg";
import "./App.css";

//Import wouter
import { Link, Route } from "wouter";

//Import páginas
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <div>
        <Link href="/home">
          <a href="/home">Home</a>
        </Link>
        <Route path="/home" component={HomePage} />
      </div>
      <div>
        <Link href="/login">
          <a href="/login">Login</a>
        </Link>
        <Route path="/login" component={LoginPage} />
      </div>
      <div>
        <Link href="/profile">
          <a href="/profile">Profile</a>
        </Link>
        <Route path="/profile" component={ProfilePage} />
      </div>
    </>
  );
}

export default App;
