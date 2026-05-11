import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAutenticacion } from "../../contexto/ContextoAutenticacion.jsx";
import { getFirebaseAuthErrorMessage } from "../../utilidades/erroresAutenticacionFirebase.js";

function PaginaLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    authActionLoading,
    firebaseMissingEnv,
    firebaseReady,
    isAuthenticated,
    loading,
    signIn,
  } = useAutenticacion();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const redirectTo = location.state?.from ?? "/app/dashboard";
  const isSubmitting = authActionLoading || loading;

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    if (!firebaseReady) {
      setErrorMessage(`Faltan variables de Firebase: ${firebaseMissingEnv.join(", ")}`);
      return;
    }

    try {
      await signIn({
        email: formData.email.trim(),
        password: formData.password,
      });
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setErrorMessage(getFirebaseAuthErrorMessage(error));
    }
  }

  return (
    <div className="auth-card">
      <div>
        <p className="section-kicker">Acceso</p>
        <h2>Iniciar sesion</h2>
        <p>Ingresa con el usuario registrado para acceder al sistema operativo.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Correo
          <input
            autoComplete="email"
            disabled={isSubmitting}
            name="email"
            onChange={handleChange}
            placeholder="usuario@empresa.com"
            required
            type="email"
            value={formData.email}
          />
        </label>
        <label>
          Contrasena
          <input
            autoComplete="current-password"
            disabled={isSubmitting}
            name="password"
            onChange={handleChange}
            placeholder="********"
            required
            type="password"
            value={formData.password}
          />
        </label>

        {errorMessage ? <p className="auth-alert">{errorMessage}</p> : null}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Ingresando..." : "Entrar"}
        </button>
      </form>

      <p className="auth-link">
        No tienes cuenta? <Link to="/registro">Crear registro</Link>
      </p>
    </div>
  );
}

export default PaginaLogin;
