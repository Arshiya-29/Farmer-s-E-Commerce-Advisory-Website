function navigate(page) {
    window.location.href = page;
}


document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const paymentModal = document.getElementById('payment-modal');
  const paymentDetails = document.getElementById('payment-details');

  function updateCart() {
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `${item.name} - ₹${item.price} <button class="remove-btn" data-index="${index}">❌</button>`;
      cartList.appendChild(li);
      total += item.price;
    });
    cartTotal.innerHTML = `<strong>Total: ₹${total}</strong>`;
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
      const name = this.getAttribute('data-product');
      const price = parseFloat(this.getAttribute('data-price'));
      cart.push({ name, price });
      updateCart();
    });
  });

  cartList.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-btn')) {
      const index = e.target.getAttribute('data-index');
      cart.splice(index, 1);
      updateCart();
    }
  });

  checkoutBtn.addEventListener('click', function () {
    if (cart.length === 0) {
      alert("Your cart is empty.");
    } else {
      paymentModal.classList.add('show');
    }
  });

  document.getElementById('payment-method').addEventListener('change', function () {
    const method = this.value;
    paymentDetails.innerHTML = '';
    if (method === 'upi') {
      paymentDetails.innerHTML = `<input type="text" placeholder="Enter UPI ID" required />`;
    } else if (method === 'card') {
      paymentDetails.innerHTML = `
        <input type="text" placeholder="Card Number" required /><br>
        <input type="text" placeholder="Name on Card" required /><br>
        <input type="text" placeholder="Expiry (MM/YY)" required /><br>
        <input type="password" placeholder="CVV" required />
      `;
    } else if (method === 'cod') {
      paymentDetails.innerHTML = `<p>Cash will be collected on delivery.</p>`;
    }
  });

  document.getElementById('confirm-payment').addEventListener('click', function () {
    const method = document.getElementById('payment-method').value;
    if (!method) {
      alert("Please select a payment method.");
      return;
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Payment Successful via ${method.toUpperCase()} 🎉\n\nReceipt:\n` +
      cart.map(i => `${i.name} - ₹${i.price}`).join('\n') + `\n\nTotal Paid: ₹${total}`);
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
    paymentModal.classList.remove('show');
  });

  updateCart();
});

function generateRandomData() {
  const waterLevel = (Math.random() * 100).toFixed(1);         // in cm
  const soilMoisture = (Math.random() * 100).toFixed(1);       // in %
  const phLevel = (Math.random() * 7 + 3).toFixed(2);           // pH range 3 - 10

  document.getElementById("waterLevel").innerText = `${waterLevel} cm`;
  document.getElementById("soilMoisture").innerText = `${soilMoisture} %`;
  document.getElementById("phLevel").innerText = `${phLevel}`;
}

// Update every 5 seconds
setInterval(generateRandomData, 5000);
generateRandomData(); // Initial load

 
//crop recommendation form submission
 document.getElementById("cropForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const jsonData = {};
  formData.forEach((value, key) => jsonData[key] = parseFloat(value));

  fetch("/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jsonData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }
    return response.json();
  })
  .then(data => {
    if (data.recommended_crop) {
      document.getElementById("result").textContent = "🌱 Recommended Crop: " + data.recommended_crop;
    } else {
      document.getElementById("result").textContent = "⚠️ Error: " + data.error;
    }
  })
  .catch(err => {
    console.error("Error:", err);
    document.getElementById("result").textContent = "❌ Error: " + err.message;
  });
});
