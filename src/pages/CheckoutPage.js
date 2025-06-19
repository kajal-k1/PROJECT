import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Contexts/CartContext'; // adjust path if needed
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = 0;
  const totalAmount = subtotal + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Failed to load Razorpay SDK. Please check your internet connection.');
      return;
    }

    try {
      const orderRes = await fetch('http://localhost:5000/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount*100 }),
      });

      const orderData = await orderRes.json();

      if (!orderData.id) throw new Error('Failed to create Razorpay order');

      const options = {
        key: 'rzp_test_Y1kcSeVyzZAk1J', // Replace with your Razorpay Key
        amount: orderData.amount,
        currency: 'INR',
        name: 'Your Shop',
        description: 'Order Payment',
        order_id: orderData.id,
        handler: async function (response) {
          const paymentId = response.razorpay_payment_id;
          const status = 'Paid';

          await fetch('http://localhost:5000/api/orders/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customer: formData,
              items: cartItems,
              totalAmount,
              paymentMethod: 'Razorpay',
              paymentId,
              status,
            }),
          });

          clearCart();
          navigate('/success');
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
        },
        theme: { color: '#3399cc' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment error:', err);
    }
  };

  const handleCOD = async () => {
    try {
      await fetch('http://localhost:5000/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: cartItems,
          totalAmount,
          paymentMethod: 'COD',
          paymentId: null,
          status: 'Pending',
        }),
      });

      clearCart();
      navigate('/success');
    } catch (err) {
      console.error('COD Order error:', err);
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'razorpay') {
      handlePayment();
    } else if (paymentMethod === 'cod') {
      handleCOD();
    } else {
      alert('Please select a payment method.');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form className="checkout-form">
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
        <input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleInputChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} required />
        <input type="text" name="zipcode" placeholder="Zip Code" value={formData.zipcode} onChange={handleInputChange} required />

        <div className="payment-methods">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="razorpay"
              checked={paymentMethod === 'razorpay'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Pay with Razorpay
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
        </div>

        <div className="summary">
          <p>Subtotal: ₹{subtotal}</p>
          <p>Shipping: ₹{shippingFee}</p>
          <p><strong>Total: ₹{totalAmount}</strong></p>
        </div>

        <button type="button" onClick={handlePlaceOrder}>Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;


//  import React, { useState } from 'react';
//  import { useNavigate } from 'react-router-dom';
//  import './CheckoutPage.css';

//  const CheckoutPage = () => {
//    const navigate = useNavigate();

//   const [paymentMethod, setPaymentMethod] = useState('');
//    const [formData, setFormData] = useState({
//      firstName: '',
//      lastName: '',
//      email: '',
//      street: '',
//      city: '',
//      state: '',
//      zipcode: '',
//      country: '',
//      phone: '',
//    });
//    const [errors, setErrors] = useState({});
//    const [loading, setLoading] = useState(false);

//    const mockCartItems = [
//      { id: 1, name: 'Ethnic Kurta', qty: 2, price: 799 },
//      { id: 2, name: 'Jeans', qty: 1, price: 1200 },
//    ];

//    const subtotal = mockCartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
//    const shippingFee = 50;
//    const totalAmount = subtotal + shippingFee;

//    const handleChange = (e) => {
//      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//    };

//    const validateForm = () => {
//      const newErrors = {};
//      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
//      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
//      if (!formData.email.trim()) newErrors.email = 'Email is required';
//      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
//      if (!formData.street.trim()) newErrors.street = 'Street is required';
//      if (!formData.city.trim()) newErrors.city = 'City is required';
//      if (!formData.state.trim()) newErrors.state = 'State is required';
//      if (!formData.zipcode.trim()) newErrors.zipcode = 'Zipcode is required';
//      if (!formData.country.trim()) newErrors.country = 'Country is required';
//      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
//      else if (!/^\d{7,15}$/.test(formData.phone)) newErrors.phone = 'Phone must be 7-15 digits';

//      if (!paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
//      setErrors(newErrors);
//      return Object.keys(newErrors).length === 0;
//    };

//    const loadRazorpayScript = () => {
//      return new Promise((resolve) => {
//        const script = document.createElement('script');
//        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//        script.onload = () => resolve(true);
//        script.onerror = () => resolve(false);
//        document.body.appendChild(script);
//      });
//    };

//    const handlePlaceOrder = async () => {
//      if (!validateForm()) {
//        alert('Please fix the errors in the form');
//        return;
//      }

//      if (paymentMethod === 'cod') {
//        await saveOrder('cod', 'success');
//        navigate('/order-success');
//        return;
//      }

//      setLoading(true);
//      const razorpayLoaded = await loadRazorpayScript();
//      if (!razorpayLoaded) {
//        alert('Razorpay SDK failed to load. Check your internet connection.');
//        setLoading(false);
//        return;
//      }

//      try {
//        const res = await fetch('/api/payment/create-order', {
//          method: 'POST',
//          headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify({ amount: totalAmount }),
//        });
//        const order = await res.json();

//        const options = {
//          key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'YOUR_KEY_HERE',
//          amount: order.amount,
//          currency: order.currency,
//          name: 'My Ecommerce Store',
//          description: 'Product Purchase',
//          order_id: order.id,
//          handler: async function (response) {
//            try {
//              const verifyRes = await fetch('/api/payment/verify-payment', {
//                method: 'POST',
//                headers: { 'Content-Type': 'application/json' },
//                body: JSON.stringify(response),
//              });

//              const verifyData = await verifyRes.json();
//              if (verifyData.success) {
//                await saveOrder('razorpay', 'success', response.razorpay_payment_id);
//                navigate('/order-success');
//              } else {
//                alert('Payment verification failed.');
//              }
//            } catch (error) {
//              alert('Error verifying payment: ' + error.message);
//            }
//          },
//          prefill: {
//            name: `${formData.firstName} ${formData.lastName}`,
//            email: formData.email,
//            contact: formData.phone,
//          },
//          theme: { color: '#3399cc' },
//        };

//        const rzp = new window.Razorpay(options);
//        rzp.open();
//      } catch (err) {
//        alert('Failed to create Razorpay order: ' + err.message);
//      }
//      setLoading(false);
//    };

//    const saveOrder = async (method, status, paymentId = null) => {
//      try {
//        await fetch('/api/orders/create', {
//          method: 'POST',
//          headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify({
//            customer: formData,
//            items: mockCartItems,
//            totalAmount,
//            paymentMethod: method,
//            paymentId,
//            status,
//          }),
//        });
//      } catch (error) {
//        console.error('Failed to save order:', error.message);
//      }
//    };

//    return (
//      <div className="checkout-container">
//        <h2>Delivery Information</h2>
//        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
//        {errors.firstName && <small className="error">{errors.firstName}</small>}

//        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
//        {errors.lastName && <small className="error">{errors.lastName}</small>}

//        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//        {errors.email && <small className="error">{errors.email}</small>}

//        <input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} />
//        {errors.street && <small className="error">{errors.street}</small>}

//        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
//       {errors.city && <small className="error">{errors.city}</small>}

//        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
//       {errors.state && <small className="error">{errors.state}</small>}

//       <input type="text" name="zipcode" placeholder="Zipcode" value={formData.zipcode} onChange={handleChange} />
//       {errors.zipcode && <small className="error">{errors.zipcode}</small>}

//        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
//        {errors.country && <small className="error">{errors.country}</small>}

//       <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
//       {errors.phone && <small className="error">{errors.phone}</small>}

//       <h3>Payment <span>Method</span></h3>
//        <div className="payment-options">
//          <label>
//            <input
//              type="radio"
//              name="payment"
//              value="razorpay"
//              checked={paymentMethod === 'razorpay'}
//              onChange={() => setPaymentMethod('razorpay')}
//            />
//            Razorpay
//          </label>
//          <label className="cod-option">
//            <input
//              type="radio"
//              name="payment"
//              value="cod"
//              checked={paymentMethod === 'cod'}
//              onChange={() => setPaymentMethod('cod')}
//            />
//            <span className="cod-circle" />
//            Cash on Delivery
//          </label>
//        </div>
//        {errors.paymentMethod && <small className="error">{errors.paymentMethod}</small>}

//        <button className="place-order-btn" onClick={handlePlaceOrder} disabled={loading}>
//          {loading ? 'Processing...' : 'PLACE ORDER'}
//        </button>
//      </div>
//    );
//  };

//  export default CheckoutPage;





// //   const { cartItems, clearCart } = useCart();
// //   const [paymentMethod, setPaymentMethod] = useState('');
// //   const [formData, setFormData] = useState({
// //     firstName: '', lastName: '', email: '', street: '', city: '', state: '',
// //     zipcode: '', country: '', phone: ''
// //   });
// //   const [errors, setErrors] = useState({});

// //   const handleChange = (e) => {
// //     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
// //     if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
// //     if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
// //     if (!formData.email.trim()) newErrors.email = 'Email is required';
// //     else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email';
// //     if (!formData.street.trim()) newErrors.street = 'Street is required';
// //     if (!formData.city.trim()) newErrors.city = 'City is required';
// //     if (!formData.state.trim()) newErrors.state = 'State is required';
// //     if (!formData.zipcode.trim()) newErrors.zipcode = 'Zipcode is required';
// //     if (!formData.country.trim()) newErrors.country = 'Country is required';
// //     if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
// //     else if (!/^\d{7,15}$/.test(formData.phone)) newErrors.phone = 'Phone must be 7-15 digits';
// //     if (!paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
// //   const shippingFee = 50;
// //   const total = subtotal + shippingFee;

// //   const handlePlaceOrder = () => {
// //     if (!validateForm()) {
// //       alert('Please fix the errors in the form');
// //       return;
// //     }

// //     if (paymentMethod === 'cod') {
// //       alert('Order placed with Cash on Delivery!');
// //       clearCart();
// //     } else if (paymentMethod === 'razorpay') {
// //       handleRazorpayPayment();
// //     } else if (paymentMethod === 'stripe') {
// //       alert('Stripe payment flow to be implemented.');
// //     }
// //   };

// //   const handleRazorpayPayment = () => {
// //     const options = {
// //       key: '', // Replace with your Razorpay key
// //       amount: total * 100,
// //       currency: 'INR',
// //       name: 'My Shop',
// //       description: 'Test Transaction',
// //       handler: function (response) {
// //         alert('Payment successful. Payment ID: ' + response.razorpay_payment_id);
// //         clearCart();
// //       },
// //       prefill: {
// //         name: `${formData.firstName} ${formData.lastName}`,
// //         email: formData.email,
// //         contact: formData.phone,
// //       },
// //       theme: { color: '#3399cc' },
// //     };

// //     const rzp = new window.Razorpay(options);
// //     rzp.open();
// //   };

// //   return (
// //     <div className="checkout-container">
// //       {/* LEFT: FORM */}
// //       <div className="checkout-form">
// //         <h2>Delivery <span>Information</span></h2>
// //         {/* Name fields */}
// //         <div className="form-row">
// //           <div className="input-group">
// //             <input name="firstName" placeholder="First name" onChange={handleChange} value={formData.firstName} />
// //             {errors.firstName && <small className="error">{errors.firstName}</small>}
// //           </div>
// //           <div className="input-group">
// //             <input name="lastName" placeholder="Last name" onChange={handleChange} value={formData.lastName} />
// //             {errors.lastName && <small className="error">{errors.lastName}</small>}
// //           </div>
// //         </div>
// //         <div className="input-group">
// //           <input name="email" placeholder="Email address" onChange={handleChange} value={formData.email} />
// //           {errors.email && <small className="error">{errors.email}</small>}
//         </div>
//         <div className="input-group">
//           <input name="street" placeholder="Street" onChange={handleChange} value={formData.street} />
//           {errors.street && <small className="error">{errors.street}</small>}
//         </div>
//         <div className="form-row">
//           <div className="input-group">
//             <input name="city" placeholder="City" onChange={handleChange} value={formData.city} />
//             {errors.city && <small className="error">{errors.city}</small>}
//           </div>
//           <div className="input-group">
//             <input name="state" placeholder="State" onChange={handleChange} value={formData.state} />
//             {errors.state && <small className="error">{errors.state}</small>}
//           </div>
//         </div>
//         <div className="form-row">
//           <div className="input-group">
//             <input name="zipcode" placeholder="Zipcode" onChange={handleChange} value={formData.zipcode} />
//             {errors.zipcode && <small className="error">{errors.zipcode}</small>}
//           </div>
//           <div className="input-group">
//             <input name="country" placeholder="Country" onChange={handleChange} value={formData.country} />
//             {errors.country && <small className="error">{errors.country}</small>}
//           </div>
//         </div>
//         <div className="input-group">
//           <input name="phone" placeholder="Phone" onChange={handleChange} value={formData.phone} />
//           {errors.phone && <small className="error">{errors.phone}</small>}
//         </div>
//       </div>

//       {/* RIGHT: SUMMARY */}
//       <div className="checkout-summary">
//         <h2>Cart <span>Summary</span></h2>
//         <div className="cart-items">
//           {cartItems.map((item) => (
//             <div key={item.id} className="cart-item">
//               <span>{item.title} x {item.quantity}</span>
//               <span>₹{item.price * item.quantity}</span>
//             </div>
//           ))}
//         </div>
//         <div className="summary-line"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
//         <div className="summary-line"><span>Shipping Fee</span><span>₹{shippingFee.toFixed(2)}</span></div>
//         <div className="summary-line total"><strong>Total</strong><strong>₹{total.toFixed(2)}</strong></div>

//         {/* Payment Options */}
//         <h3>Payment <span>Method</span></h3>
//         <div className="payment-options">
//           <label>
//             <input type="radio" name="payment" value="stripe" checked={paymentMethod === 'stripe'} onChange={() => setPaymentMethod('stripe')} />
//             <img src="/images/stripe.png" alt="Stripe" />
//           </label>
//           <label>
//             <input type="radio" name="payment" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} />
//             <img src="/images/razorpay.png" alt="Razorpay" />
//           </label>
//           <label className="cod-option">
//             <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
//             <span className="cod-circle" /> Cash on Delivery
//           </label>
//         </div>
//         {errors.paymentMethod && <small className="error">{errors.paymentMethod}</small>}

//         <button className="place-order-btn" onClick={handlePlaceOrder}>
//           PLACE ORDER
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;
