import { Login } from "./components/Login";
import styles from "./App.module.css";
import { Welcome } from "./components/Welcome";
import { useAuth } from "./hooks/useAuth";

export const App = () => {
  const { isLoading, user, logout, login } = useAuth();

  if (isLoading) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {user ? (
        <Welcome email={user.email} onLogout={logout} />
      ) : (
        <Login onLogin={login} />
      )}
    </div>
  );
};
