let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

function updateCart() {
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - ₹${item.price}
      <button class="remove-btn" data-index="${index}">❌</button>
    `;
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
    document.getElementById('payment-modal').classList.add('show');
  }
});

document.getElementById('confirm-payment').addEventListener('click', function () {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  alert("Payment Successful! 🎉\n\nReceipt:\n" + cart.map(i => `${i.name} - ₹${i.price}`).join('\n') + `\n\nTotal Paid: ₹${total}`);
  cart = [];
  localStorage.removeItem('cart');
  updateCart();
  document.getElementById('payment-modal').classList.remove('show');
});
document.getElementById("soil-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const location = document.getElementById("location").value;
  const soilType = document.getElementById("soil-type").value;

  document.getElementById("confirmation").innerHTML = `
    <p>Thanks, <strong>${name}</strong>! We’ll contact you at <strong>${phone}</strong> 
    to schedule testing at <strong>${location}</strong>. Soil type selected: <strong>${soilType}</strong>.</p>`;
});