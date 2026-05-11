import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAutenticacion } from "../../contexto/ContextoAutenticacion.jsx";
import { getFirebaseAuthErrorMessage } from "../../utilidades/erroresAutenticacionFirebase.js";

function PaginaRegistro() {
  const navigate = useNavigate();
  const {
    authActionLoading,
    firebaseMissingEnv,
    firebaseReady,
    isAuthenticated,
    loading,
    signUp,
  } = useAutenticacion();
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const isSubmitting = authActionLoading || loading;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

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

    if (formData.password.length < 8) {
      setErrorMessage("La contrasena debe tener al menos 8 caracteres.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Las contrasenas no coinciden.");
      return;
    }

    try {
      await signUp({
        displayName: formData.displayName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });
      navigate("/app/dashboard", { replace: true });
    } catch (error) {
      setErrorMessage(getFirebaseAuthErrorMessage(error));
    }
  }

  return (
    <div className="auth-card">
      <div>
        <p className="section-kicker">Registro</p>
        <h2>Crear cuenta</h2>
        <p>Registra un usuario autorizado para trabajar en la gestion de estibas.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            autoComplete="name"
            disabled={isSubmitting}
            name="displayName"
            onChange={handleChange}
            placeholder="Nombre del usuario"
            required
            type="text"
            value={formData.displayName}
          />
        </label>
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
            autoComplete="new-password"
            disabled={isSubmitting}
            minLength={8}
            name="password"
            onChange={handleChange}
            placeholder="Minimo 8 caracteres"
            required
            type="password"
            value={formData.password}
          />
        </label>
        <label>
          Confirmar contrasena
          <input
            autoComplete="new-password"
            disabled={isSubmitting}
            minLength={8}
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Repite la contrasena"
            required
            type="password"
            value={formData.confirmPassword}
          />
        </label>

        {errorMessage ? <p className="auth-alert">{errorMessage}</p> : null}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creando cuenta..." : "Registrarse"}
        </button>
      </form>

      <p className="auth-link">
        Ya tienes cuenta? <Link to="/login">Iniciar sesion</Link>
      </p>
    </div>
  );
}

export default PaginaRegistro;
