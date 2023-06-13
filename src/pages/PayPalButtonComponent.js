import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue, get } from 'firebase/database';
import { database } from '../Firebase-config';
import './Paypal.css';

function PayPalButtonComponent() {
  const [paid, setPaid] = React.useState(false);

  const handleSuccess = (details, data) => {
    console.log(details);
    console.log(data);
    setPaid(true);
  };
  const buttonStyles = {
    layout: 'horizontal', // Chia cột nút PayPal và nút "Debit or Credit Card" theo chiều ngang
    color: 'gold', // Màu sắc nút PayPal và nút "Debit or Credit Card"
    shape: 'rect', // Hình dạng của nút PayPal và nút "Debit or Credit Card"
    label: 'paypal', // Hiển thị label "paypal" trên nút PayPal
    height: 45, // Chiều cao của nút PayPal và nút "Debit or Credit Card"
    tagline: false, // Tắt tagline "Pay with PayPal" trên nút PayPal
  };
  const Datatour = [];
  const user_ID = localStorage.getItem('user');
  const [data, setData] = useState('');
  useEffect(() => {
    const db = getDatabase();

    const tasksRef = ref(db, '/Payment_info/74');

    get(tasksRef)
      .then((snapshot) => {
        setData(snapshot.val());
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  console.log(data);
  const [cache, setCache] = useState('');
  function myFunction() {
    setCache(data.ID);
  }
  useEffect(() => {
    myFunction();
  }, [data]);
  console.log(cache);
  const [data1, setData1] = useState('');

  useEffect(() => {
    const db = getDatabase();

    const tasksRef = ref(db, `/Order/${cache}`);

    get(tasksRef)
      .then((snapshot) => {
        setData1(snapshot.val());
      })
      .catch((err) => {
        console.error(err);
      });
  }, [cache]);
  console.log(data1);
  const [num, setNum] = useState('');
  useEffect(() => {
    if (data1 && data1.order_total) {
      setNum(data1.order_total);
    }
  }, [data1]);

  return (
    <div className="div1">
      <div className="App-body">
        <h1>Payment For Orders</h1>
        <p>
          <span className="book-price">$ {num} </span>
        </p>
        {!paid && (
          <PayPalButton
            shippingPreference="NO_SHIPPING"
            className="but"
            amount={num}
            onSuccess={handleSuccess}
            options={{
              clientId: 'AThMSEz6xC_zmVRKmP_yD3zQlzTEXHJ0H4cq8tJ2KkPl5MqXBZp4hUK038KE5I7zKDXh0vkocBnBaLYm',
              currency: 'USD',
            }}
          />
        )}
        {paid && <div>Payment successful!</div>}
      </div>
    </div>
  );
}

export default PayPalButtonComponent;
