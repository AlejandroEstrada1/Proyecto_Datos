const AUTH_ERROR_MESSAGES = {
  "auth/email-already-in-use": "Ese correo ya esta registrado.",
  "auth/invalid-email": "El correo no tiene un formato valido.",
  "auth/invalid-credential": "Correo o contrasena incorrectos.",
  "auth/missing-password": "Ingresa la contrasena.",
  "auth/network-request-failed": "No se pudo conectar con Firebase. Revisa tu conexion.",
  "auth/too-many-requests": "Demasiados intentos. Intenta de nuevo mas tarde.",
  "auth/user-disabled": "Esta cuenta fue deshabilitada.",
  "auth/user-not-found": "No existe una cuenta con ese correo.",
  "auth/weak-password": "La contrasena debe tener al menos 6 caracteres.",
  "auth/wrong-password": "Correo o contrasena incorrectos.",
};

export function getFirebaseAuthErrorMessage(error) {
  if (!error?.code) {
    return "Ocurrio un error inesperado. Intenta nuevamente.";
  }

  return AUTH_ERROR_MESSAGES[error.code] ?? "No se pudo completar la autenticacion.";
}
