
// рабочи вариант
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import dbData from '../db.json';
import { useNavigate } from 'react-router-dom';

const Catalog = () => {
 const columns = [
  {
    name: 'Select',
    cell: row => (
    <input type="checkbox" onChange={e => handleCheckboxChange(e, row)} />
    ),
    },
 {
 name: 'ID',
 selector: 'id',
 },
 {
  name: 'description',
  selector: 'description',
  filterable: true,
  sortFunction: (rowA, rowB) => rowA.description.localeCompare(rowB.description),
 },
 {
  name: 'code',
  selector: 'code',
  filterable: true,
  sortFunction: (rowA, rowB) => rowA.code.localeCompare(rowB.code),
 },
 
 {
 name: 'price',
 selector: 'price',
 filterable: true,
 },
 {
 name: 'quantity',
 selector: 'quantity',
 },
];

 const [data, setData] = useState([]);
 const [selectedItems, setSelectedItems] = useState([]);
 const navigate = useNavigate();

 useEffect(() => {
 setData(dbData);
 }, []);

 const handleCheckboxChange = (e, row) => {
 if (e.target.checked) {
 setSelectedItems(prev => [...prev, row]);
 } else {
 setSelectedItems(prev => prev.filter(item => item.id !== row.id));
 }
 };

 const handleOrder = () => {
  const currentTime = Date.now();
  const orderedItemsWithDate = selectedItems.map(item => ({
    ...item,
    date: currentTime,
  }));
 
  navigate('/profile?orders=' + encodeURIComponent(JSON.stringify(orderedItemsWithDate)));
  };

 return (
 <div>
 <DataTable
 columns={columns}
 data={data}
 />
 <button onClick={handleOrder}>Заказать</button>
 </div>
 );
};

export default Catalog;
