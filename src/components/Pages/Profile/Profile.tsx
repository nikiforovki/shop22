import React, { useEffect } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import useLocalStorage from '../loginPage/useLocalStorage.js';
import styles from './Profile.module.css';

interface Order {
 id: string;
 description: string;
 date?: Date;
}

interface User {
 name: string;
}

const Profile: React.FC = () => {
 const location = useLocation();
 const navigate = useNavigate();
 const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);
 const [user, setUser] = useLocalStorage<User | null>('user', null);
 const [searchParams, setSearchParams] = useSearchParams();

 useEffect(() => {
 const params = new URLSearchParams(location.search);
 const ordersParam = params.get('orders');
 if (ordersParam) {
   setOrders(JSON.parse(decodeURIComponent(ordersParam)));
 }
}, [location, setOrders]);

 const handleDelete = (orderId: string) => {
 const newOrders = orders.filter(order => order.id !== orderId);
 setOrders(newOrders);
 const newOrdersString = JSON.stringify(newOrders);
 searchParams.set('orders', encodeURIComponent(newOrdersString));
 setSearchParams(searchParams);
 };

 const handleLogout = () => {
 setUser(null); 
 navigate('/'); 
 };

 return (
 <div className="center">
 {user && <p className={styles.name}>Welcome, {user.name}</p>}
{user && <button className={styles.button} onClick={handleLogout}>Выйти</button>}
 <h1 className={styles.zakaz}>Заказы</h1>
 <ul>
   {orders.map(order => (
     <li key={order.id}>
       {order.description}
       {order.date && <p>Date: {order.date.toString()}</p>}
       <button onClick={() => handleDelete(order.id)}>Отменить</button>
     </li>
   ))}
 </ul>
 </div>
 );
};

export default Profile;

