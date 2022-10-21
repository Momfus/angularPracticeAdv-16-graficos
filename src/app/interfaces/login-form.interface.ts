// Una interfaz es una clase "boba" en las cuales solo sirven para tener restricciones y que un objeto tenga cierta forma
// No tienen una version de javascrip y no se traducen en nada, una vez compilado javascript ignora

export interface LoginForm {
  email: string,
  password: string,
  remeber: boolean
}
