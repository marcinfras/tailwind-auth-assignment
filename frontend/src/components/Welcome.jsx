import $ from "jquery";
import styles from "./Welcome.module.css";

export const Welcome = ({ email, onLogout }) => {
  const handleLogout = async () => {
    try {
      await onLogout();
      $("#root").fadeOut(150, () => $("#root").fadeIn(150));
    } catch (err) {
      alert(err.message || "Logout failed");
    }
  };

  return (
    <div className={styles.card}>
      <h2>Hello, {email}</h2>
      <button onClick={handleLogout} className={styles.button}>
        Logout
      </button>
    </div>
  );
};
