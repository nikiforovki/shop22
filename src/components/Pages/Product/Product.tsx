import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import productData from './products.json';
import styles from '../Product/Product.module.css';

interface Product {
 id: number;
 description: string;
 code: string;
 price: number;
 quantity: number;
}

export default function Product() {
 const [quantities, setQuantities] = useState(() => 
 JSON.parse(localStorage.getItem('quantities') || '[]')
);
 const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
 const [selectedQuantities, setSelectedQuantities] = useState<number[]>([]);
 const [productList, setProductList] = useState<Product[]>(() => {
 const storedProducts = localStorage.getItem('productList');
 if (storedProducts) {
  return JSON.parse(storedProducts);
 } else {
  localStorage.setItem('productList', JSON.stringify(productData));
  return productData;
 }
 });
 const navigate = useNavigate();

 useEffect(() => {
 const savedOrders = localStorage.getItem('selectedProducts');
 if (savedOrders) {
   const orders = JSON.parse(savedOrders);
   // здесь вы можете использовать orders для отображения информации о заказе пользователя
 }
 }, []);
 

 const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
 const newQuantities = [...quantities];
 const newQuantity = Number(event.target.value);
 newQuantities[index] = newQuantity;
 
 // Проверка, чтобы убедиться, что новое количество не меньше доступного
 if (productList[index] && newQuantity >= productList[index].quantity) {
  alert('Нельзя заказать больше товара, чем доступно');
  return;
 }
 
 setQuantities(newQuantities);
 
 const newProductList = [...productList];
 newProductList[index].quantity -= newQuantity;
 setProductList(newProductList);
 };
 

 const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, product: Product, index: number) => {
  if (event.target.checked) {
   if (!selectedProducts.includes(product)) {
     // Проверка, чтобы убедиться, что выбранное количество не превышает доступное
     if (quantities[index] > product.quantity) {
       alert('Нельзя заказать больше товара, чем доступно');
       return;
     }
 
     setSelectedProducts([...selectedProducts, product]);
     const newSelectedQuantities = [...selectedQuantities];
     newSelectedQuantities[index] = quantities[index];
     setSelectedQuantities(newSelectedQuantities);
   }
  } else {
   const productIndex = selectedProducts.indexOf(product);
   setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
   const newSelectedQuantities = [...selectedQuantities];
   newSelectedQuantities.splice(productIndex, 1);
   setSelectedQuantities(newSelectedQuantities);
  }
 };
 

 const handleOrderClick = () => {
  const order = selectedProducts.map((product, index) => ({
    ...product,
    quantity: selectedQuantities[index],
  }));
  localStorage.setItem('selectedProducts', JSON.stringify(order));
  navigate(`/profile`);
 };
 
 

 return (
   <div>
    <h1 className={styles.zakazP}>Выбрать товар</h1>
     <table className={styles.table}>
       <thead>
         <tr>
           <th className={styles.header}>Название</th>
           <th className={styles.header}>Цена</th>
           <th className={styles.header}>Доступное количество</th>
           <th className={styles.header}>Количество</th>
           <th className={styles.header}>Выбрать</th>
         </tr>
       </thead>
       <tbody>
         {productList.map((product: Product, index: number) => (
           <tr key={product.id}>
             <td>{product.description}</td>
             <td>{product.price}</td>
             <td>{product.quantity}</td>
             <td>
               <input
                type="number"
                value={quantities[index]}
                onChange={(event) => handleQuantityChange(event, index)}
               />
             </td>
             <td>
               <input
                type="checkbox"
                checked={selectedProducts.includes(product)}
                onChange={(event) => handleCheckboxChange(event, product, index)}
               />
             </td>
           </tr>
         ))}
       </tbody>
     </table>
     <button className={styles.zakazbutton} onClick={handleOrderClick}>Заказать</button>
   </div>
 );
}









// Почти работает как надо 
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import productData from './products.json';
// import styles from './Product.module.css';

// interface Product {
//  id: number;
//  description: string;
//  code: string;
//  price: number;
//  quantity: number;
// }

// export default function Product() {
//  const [quantities, setQuantities] = useState(() => 
//     JSON.parse(localStorage.getItem('quantities')) || productData.map(() => 1)
//  );
//  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
//  const [selectedQuantities, setSelectedQuantities] = useState<number[]>([]);
//  const [productList, setProductList] = useState<Product[]>(() => 
//     JSON.parse(localStorage.getItem('productList')) || productData
//  );
//  const navigate = useNavigate();

//  useEffect(() => {
//    localStorage.setItem('productList', JSON.stringify(productList));
//    localStorage.setItem('quantities', JSON.stringify(quantities));
//  }, [productList, quantities]);

//  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
//    const newQuantities = [...quantities];
//    const newQuantity = Number(event.target.value);
//    newQuantities[index] = newQuantity;
//    setQuantities(newQuantities);

//    const newProductList = [...productList];
//    newProductList[index].quantity -= newQuantity;
//    setProductList(newProductList);
//  };

//  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, product: Product, index: number) => {
//    if (event.target.checked) {
//      if (!selectedProducts.includes(product)) {
//        setSelectedProducts([...selectedProducts, product]);
//        const newSelectedQuantities = [...selectedQuantities];
//        newSelectedQuantities[index] = quantities[index];
//        setSelectedQuantities(newSelectedQuantities);
//      }
//    } else {
//      const productIndex = selectedProducts.indexOf(product);
//      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
//      const newSelectedQuantities = [...selectedQuantities];
//      newSelectedQuantities.splice(productIndex, 1);
//      setSelectedQuantities(newSelectedQuantities);
//    }
//  };

//  const handleOrderClick = () => {
//    const order = selectedProducts.map((product, index) => ({
//      ...product,
//      quantity: selectedQuantities[index],
//    }));
//    localStorage.setItem('selectedProducts', JSON.stringify(order));
//    navigate(`/profile`);
//  };
 

//  return (
//    <div>
//      <table className={styles.table}>
//        <thead>
//          <tr>
//            <th className={styles.header}>Название</th>
//            <th className={styles.header}>Цена</th>
//            <th className={styles.header}>Доступное количество</th>
//            <th className={styles.header}>Количество</th>
//            <th className={styles.header}>Выбрать</th>
//          </tr>
//        </thead>
//        <tbody>
//          {productList.map((product: Product, index: number) => (
//            <tr key={product.id}>
//              <td>{product.description}</td>
//              <td>{product.price}</td>
//              <td>{product.quantity}</td>
//              <td>
//                <input
//                 type="number"
//                 value={quantities[index]}
//                 onChange={(event) => handleQuantityChange(event, index)}
//                />
//              </td>
//              <td>
//                <input
//                 type="checkbox"
//                 checked={selectedProducts.includes(product)}
//                 onChange={(event) => handleCheckboxChange(event, product, index)}
//                />
//              </td>
//            </tr>
//          ))}
//        </tbody>
//      </table>
//      <button onClick={handleOrderClick}>Заказать</button>
//    </div>
//  );
// }






































































































































// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import products from './products.json';
// import styles from './Product.module.css';

// interface ProductType {
//  id: number;
//  description: string;
//  code: string;
//  price: number;
//  quantity: number;
// }

// export default function Product() {
//  const [quantities, setQuantities] = useState(products.map(() => 1));
//  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);
//  const navigate = useNavigate();

//  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
//   const newQuantities = [...quantities];
//   newQuantities[index] = Number(event.target.value);
//   setQuantities(newQuantities);
//  };

//  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, product: ProductType) => {
//   if (event.target.checked) {
//     if (!selectedProducts.includes(product)) {
//       setSelectedProducts([...selectedProducts, product]);
//     }
//   } else {
//     setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
//   }
//  };

//  const handleOrderClick = () => {
//  const selectedProductIds = selectedProducts.map(product => ({
//    id: product.id,
//    quantity: quantities[products.findIndex(p => p.id === product.id)]
//  }));
 
//  // Обновляем количество товара на складе
//  const updatedProducts = products.map(product => {
//    const selectedProduct = selectedProductIds.find(p => p.id === product.id);
//    if (selectedProduct) {
//      return {
//        ...product,
//        quantity: product.quantity - selectedProduct.quantity,
//      };
//    }
//    return product;
//  });
 
//  // Сохраняем обновленный список товаров в localStorage
//  localStorage.setItem('products', JSON.stringify(updatedProducts));
 
//  localStorage.setItem('selectedProducts', JSON.stringify(selectedProductIds));
//  navigate(`/profile`);
//  };

//  useEffect(() => {
//  const productsFromStorage = JSON.parse(localStorage.getItem('products') || '[]');
//  setProducts(productsFromStorage);
//  }, []);

//  return (
//   <div>
//     <table className={styles.table}>
//       <thead>
//         <tr>
//           <th className={styles.header}>Название</th>
//           <th className={styles.header}>Цена</th>
//           <th className={styles.header}>Доступное количество</th>
//           <th className={styles.header}>Количество</th>
//           <th className={styles.header}>Выбрать</th>
//         </tr>
//       </thead>
//       <tbody>
//         {products.map((product: ProductType, index: number) => (
//           <tr key={product.id}>
//             <td>{product.description}</td>
//             <td>{product.price}</td>
//             <td>{product.quantity}</td>
//             <td>
//               <input
//                type="number"
//                value={quantities[index]}
//                onChange={(event) => handleQuantityChange(event, index)}
//               />
//             </td>
//             <td>
//               <input
//                type="checkbox"
//                checked={selectedProducts.includes(product)}
//                onChange={(event) => handleCheckboxChange(event, product)}
//               />
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//     <button onClick={handleOrderClick}>Заказать</button>
//   </div>
//  );
// }



// Табличный вариант


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import products from './products.json';
// import styles from './Product.module.css';

// interface Product {
//  id: number;
//  description: string;
//  code: string;
//  price: number;
//  quantity: number;
// }

// export default function Product() {
//  const [quantities, setQuantities] = useState(products.map(() => 1));
//  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
//  const navigate = useNavigate();

//  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
//    const newQuantities = [...quantities];
//    newQuantities[index] = Number(event.target.value);
//    setQuantities(newQuantities);
//  };

//  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, product: Product) => {
//    if (event.target.checked) {
//      if (!selectedProducts.includes(product)) {
//        setSelectedProducts([...selectedProducts, product]);
//      }
//    } else {
//      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
//    }
//  };

//  const handleOrderClick = () => {
//   localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
//   navigate(`/profile`);
//  };
 

//  return (
//    <div>
//      <table className={styles.table}>
//        <thead>
//          <tr>
//            <th className={styles.header}>Название</th>
//            <th className={styles.header}>Цена</th>
//            <th className={styles.header}>Доступное количество</th>
//            <th className={styles.header}>Количество</th>
//            <th className={styles.header}>Выбрать</th>
//          </tr>
//        </thead>
//        <tbody>
//          {products.map((product: Product, index: number) => (
//            <tr key={product.id}>
//              <td>{product.description}</td>
//              <td>{product.price}</td>
//              <td>{product.quantity}</td>
//              <td>
//                <input
//                 type="number"
//                 value={quantities[index]}
//                 onChange={(event) => handleQuantityChange(event, index)}
//                />
//              </td>
//              <td>
//                <input
//                 type="checkbox"
//                 checked={selectedProducts.includes(product)}
//                 onChange={(event) => handleCheckboxChange(event, product)}
//                />
//              </td>
//            </tr>
//          ))}
//        </tbody>
//      </table>
//      <button onClick={handleOrderClick}>Заказать</button>
//    </div>
//  );
// }