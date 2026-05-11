import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  firebaseMissingEnv,
  isFirebaseConfigured,
} from "../config/firebase.js";
import {
  loginWithEmail,
  logout,
  registerWithEmail,
  subscribeToAuthChanges,
} from "../servicios/firebase/servicioAutenticacion.js";

const ContextoAutenticacion = createContext(null);

export function ProveedorAutenticacion({ children }) {
  const routePreviewEnabled = import.meta.env.VITE_ENABLE_ROUTE_PREVIEW === "true";
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(
    isFirebaseConfigured && !routePreviewEnabled
  );
  const [authActionLoading, setAuthActionLoading] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured || routePreviewEnabled) {
      setLoading(false);
      return undefined;
    }

    const unsubscribe = subscribeToAuthChanges(
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        console.error("Error al escuchar la sesion de Firebase", error);
        setUser(null);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [routePreviewEnabled]);

  async function signIn(credentials) {
    setAuthActionLoading(true);

    try {
      const authenticatedUser = await loginWithEmail(credentials);
      setUser(authenticatedUser);
      return authenticatedUser;
    } finally {
      setAuthActionLoading(false);
    }
  }

  async function signUp(credentials) {
    setAuthActionLoading(true);

    try {
      const createdUser = await registerWithEmail(credentials);
      setUser(createdUser);
      return createdUser;
    } finally {
      setAuthActionLoading(false);
    }
  }

  async function signOut() {
    setAuthActionLoading(true);

    try {
      await logout();
      setUser(null);
    } finally {
      setAuthActionLoading(false);
    }
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      authActionLoading,
      firebaseReady: isFirebaseConfigured,
      firebaseMissingEnv,
      isAuthenticated: Boolean(user) || routePreviewEnabled,
      signIn,
      signUp,
      signOut,
    }),
    [authActionLoading, loading, routePreviewEnabled, user]
  );

  return (
    <ContextoAutenticacion.Provider value={value}>
      {children}
    </ContextoAutenticacion.Provider>
  );
}

export function useAutenticacion() {
  const context = useContext(ContextoAutenticacion);

  if (!context) {
    throw new Error("useAutenticacion debe usarse dentro de ProveedorAutenticacion");
  }

  return context;
}
