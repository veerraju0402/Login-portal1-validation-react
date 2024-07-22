
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
// import Profile from "../Oath2Login2/Profile";
import Profile from "./Profile";

function App() {
  const { isLoading, error } = useAuth0();

  return (
    
    <main className="column">
      <h1>Auth0 Login</h1>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
        
          <LoginButton />
          <LogoutButton />
          <Profile />
        </>
      )}
    </main>
  );
}

export default App;