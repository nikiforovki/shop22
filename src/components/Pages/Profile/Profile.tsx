import React, { useEffect } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import useLocalStorage from '../loginPage/useLocalStorage.js';
import styles from './Profile.module.css';
import { parseISO, format } from 'date-fns';
import { login, getUserId } from '../loginPage/auth.ts';


interface Order {
  id: string;
  description: string;
  date?: string; // Заменено на свойство date
  quantity: number;
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
      const orders = JSON.parse(decodeURIComponent(ordersParam)).map((order: Order) => ({
        ...order,
        date: order.date ? parseISO(order.date).toISOString() : undefined,
      }));
      setOrders(orders);
    }
  }, [location, setOrders]);

  const handleDeleteAll = () => {
    setOrders([]);
    const newOrdersString = JSON.stringify([]);
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
      {/* <p>Дата: {format(new Date(), 'dd.MM.yyyy')}</p> */}
      <div className={styles.ordersContainer}>
        <ul>
          {orders.map((order, index) => (
            <li key={order.id} className={`${styles.orderItem} ${index !== orders.length - 1 ? styles.orderItemMargin : ''}`}>
              {order.description}
              {order.date && (
                <p>Дата: {format(Date(order.date), 'dd.MM.yyyy HH:mm')}</p>
              )}
              <p>Количество: {order.quantity}</p>
              <p>Дата заказа: {format(Date(order.date), 'dd.MM.yyyy HH:mm')}</p>
            </li>
          ))}
        </ul>
      </div>
      <button className={`${styles.buttonDell} ${styles.centerButton}`} onClick={handleDeleteAll}>Отменить все</button>
    </div>
  );
};

export default Profile;


















//Код работает 30.12 19.00

// import React, { useEffect } from 'react';
// import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
// import useLocalStorage from '../loginPage/useLocalStorage.js';
// import styles from './Profile.module.css';
// import { parseISO, format } from 'date-fns';
// import { login, getUserId } from '../loginPage/auth.ts';


// interface Order {
//   id: string;
//   description: string;
//   date?: string; // Заменено на свойство date
//   quantity: number;
// }

// interface User {
//   name: string;
// }

// const Profile: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);
//   const [user, setUser] = useLocalStorage<User | null>('user', null);
//   const [searchParams, setSearchParams] = useSearchParams();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const ordersParam = params.get('orders');
//     if (ordersParam) {
//       const orders = JSON.parse(decodeURIComponent(ordersParam)).map((order: Order) => ({
//         ...order,
//         date: order.date ? parseISO(order.date).toISOString() : undefined,
//       }));
//       setOrders(orders);
//     }
//   }, [location, setOrders]);

//   const handleDeleteAll = () => {
//     setOrders([]);
//     const newOrdersString = JSON.stringify([]);
//     searchParams.set('orders', encodeURIComponent(newOrdersString));
//     setSearchParams(searchParams);
//   };

//   const handleLogout = () => {
//     setUser(null);
//     navigate('/');
//   };

//   return (
//     <div className="center">
//       {user && <p className={styles.name}>Welcome, {user.name}</p>}
//       {user && <button className={styles.button} onClick={handleLogout}>Выйти</button>}
//       <h1 className={styles.zakaz}>Заказы</h1>
//       {/* <p>Дата: {format(new Date(), 'dd.MM.yyyy')}</p> */}
//       <div className={styles.ordersContainer}>
//         <ul>
//           {orders.map((order, index) => (
//             <li key={order.id} className={`${styles.orderItem} ${index !== orders.length - 1 ? styles.orderItemMargin : ''}`}>
//               {order.description}
//               {order.date && (
//                 <p>Дата: {format(Date(order.date), 'dd.MM.yyyy HH:mm')}</p>
//               )}
//               <p>Количество: {order.quantity}</p>
//               <p>Дата заказа: {format(Date(order.date), 'dd.MM.yyyy HH:mm')}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <button className={`${styles.buttonDell} ${styles.centerButton}`} onClick={handleDeleteAll}>Отменить все</button>
//     </div>
//   );
// };

// export default Profile;














































































//Рабочий без даты

// import React, { useEffect } from 'react';
// import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
// import useLocalStorage from '../loginPage/useLocalStorage.js';
// import styles from './Profile.module.css';

// interface Order {
//  id: string;
//  description: string;
//  date?: Date;
// }

// interface User {
//  name: string;
// }

// const Profile: React.FC = () => {
//  const location = useLocation();
//  const navigate = useNavigate();
//  const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);
//  const [user, setUser] = useLocalStorage<User | null>('user', null);
//  const [searchParams, setSearchParams] = useSearchParams();

//  useEffect(() => {
//   const params = new URLSearchParams(location.search);
//   const ordersParam = params.get('orders');
//   if (ordersParam) {
//    const orders = JSON.parse(decodeURIComponent(ordersParam));
//    console.log(orders);
//    setOrders(orders);
//   }
//  }, [location, orders, setOrders]);
 

// //  const handleDelete = (orderId: string) => {
// //  const newOrders = orders.filter(order => order.id !== orderId);
// //  setOrders(newOrders);
// //  const newOrdersString = JSON.stringify(newOrders);
// //  searchParams.set('orders', encodeURIComponent(newOrdersString));
// //  setSearchParams(searchParams);
// //  };

//  const handleDeleteAll = () => {
//   setOrders([]);
//   const newOrdersString = JSON.stringify([]);
//   searchParams.set('orders', encodeURIComponent(newOrdersString));
//   setSearchParams(searchParams);
//  };
 

 

//  const handleLogout = () => {
//  setUser(null); 
//  navigate('/'); 
//  };


//  return (
//   <div className="center">
//   {user && <p className={styles.name}>Welcome, {user.name}</p>}
//   {user && <button className={styles.button} onClick={handleLogout}>Выйти</button>}
//   <h1 className={styles.zakaz}>Заказы</h1>
//   <button className={styles.buttonDell} onClick={handleDeleteAll}>Отменить все</button>
//   <ul>
//    {orders.map(order => (
//      <li key={order.id}>
//        {order.description}
//        {order.date && <p>Date: {order.date.toLocaleString("ru-RU", {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})}</p>}
//        {/* <button onClick={() => handleDelete(order.id)}>Отменить</button> */}
//      </li>
     
//    ))}
//   </ul>
//   </div>
//   );

// };

// //  return (
// //  <div className="center">
// //  {user && <p className={styles.name}>Welcome, {user.name}</p>}
// // {user && <button className={styles.button} onClick={handleLogout}>Выйти</button>}
// //  <h1 className={styles.zakaz}>Заказы</h1>
// //  <ul>
// //    {orders.map(order => (
// //      <li key={order.id}>
// //        {order.description}
// //        {order.date && <p>Date: {order.date.toString()}</p>}
// //        <button className={styles.buttonDell} onClick={handleDeleteAll}>Отменить все</button>
// //       {/* <button onClick={() => handleDeleteAll(order.id)}>Отменить</button> */}
// //      </li>
// //    ))}
// //  </ul>
// //  </div>
// //  );
// // };

// export default Profile;