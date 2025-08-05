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


