function openModal(eventName) {
  document.getElementById('registration-modal').style.display = 'block';
  document.getElementById('event-name').innerText = "Register for " + eventName;
}

function closeModal() {
  document.getElementById('registration-modal').style.display = 'none';
}

window.onclick = function (event) {
  const modal = document.getElementById('registration-modal');
  if (event.target === modal) {
    closeModal();
  }
};

document.getElementById('registration-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('✅ Registration successful!');
  closeModal();
});
