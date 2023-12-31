// auth.ts
export const login = (user: User): void => {
    setUser(user); // Сохранение данных пользователя
    localStorage.setItem('userId', user.id); // Сохранение уникального идентификатора пользователя
  };
  // auth.ts
export const getUserId = (): string | null => {
    return localStorage.getItem('userId'); // Получение уникального идентификатора пользователя из локального хранилища
  };
  