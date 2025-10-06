import $ from "jquery";
import { validateLogin } from "../helpers/validateLogin";
import { useForm } from "../hooks/useForm";
import styles from "./Login.module.css";

export const Login = ({ onLogin }) => {
  const {
    values: { email, password },
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
  } = useForm({ email: "", password: "" }, validateLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    try {
      await onLogin(email, password);
      $("#root").fadeOut(200, () => $("#root").fadeIn(200));
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          className={styles.input}
        />
        {touched.email && errors.email && (
          <div className={styles.error}>{errors.email}</div>
        )}

        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          className={styles.input}
        />
        {touched.password && errors.password && (
          <div className={styles.error}>{errors.password}</div>
        )}

        <button type="submit" className={styles.button}>
          Sign in
        </button>
      </form>
    </div>
  );
};
