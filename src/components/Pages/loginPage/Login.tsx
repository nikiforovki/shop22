import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';
import styles from '../loginPage/Login.module.css';


interface User {
 name: string;
 password: string;
}

const users: Record<string, User> = {
 User1: { name: 'User1', password: 'pass1' },
 User2: { name: 'User2', password: 'pass2' },
};

const Login: React.FC = () => {
 const [username, setUsername] = useState<string>('');
 const [password, setPassword] = useState<string>('');
 const navigate = useNavigate();
 const [user, setUser] = useLocalStorage<User | null>('user', null);

 const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   if (event.target.name === 'username') {
     setUsername(event.target.value);
   } else if (event.target.name === 'password') {
     setPassword(event.target.value);
   }
 }

 const handleSubmit = (event: FormEvent) => {
   event.preventDefault();
   if (users[username] && users[username].password === password) {
     setUser(users[username]);
     navigate('/Profile'); 
   } else {
     alert('Неверные учетные данные');
   }
 }

 const handleLogout = () => {
   setUser(null);
   navigate('/Login'); 
 }
 
 return (
   <form className={styles.form} onSubmit={handleSubmit}>
     <label className={styles.label}>
     <h1 className={styles.title}>Авторизация</h1>
  {/* Логин: */}
  <input className={styles.input} type="text" name="username" placeholder="Логин" onChange={handleInputChange} />
</label>
<label className={styles.label}>
  {/* Пароль: */}
  <input className={styles.input + ' ' + styles.password} type="password" name="password" placeholder="Пароль" onChange={handleInputChange} />
</label>
     <input className={styles.submit} type="submit" value="Вход" />
     {user && <button className={styles.logout} onClick={handleLogout}>Выйти</button>}
   </form>
 );
}

export default Login;
