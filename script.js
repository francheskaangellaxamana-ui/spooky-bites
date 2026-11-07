// ===== Step 7: Variables and meal prices =====
const restaurantName = "Spooky Bites";
let isOpen = true;              // changed to let so the toggle button can change it

let customerName = "";
let mealPrice = 0;
let quantity = 1;
let total = 0;

const prices = {
  "Spider Pizza": 150,
  "Pumpkin Pasta": 180,
  "Ghost Burger": 120
};

// ===== Step 8: Select HTML elements using the DOM =====
const statusMsg = document.getElementById("status");
const result = document.getElementById("result");
const greeting = document.getElementById("greeting");

// ===== Step 9: Display restaurant status (Enhancement 5) =====
function displayStatus() {
  statusMsg.textContent = isOpen
    ? "We are OPEN!"
    : "We are CLOSED!";
  statusMsg.className = isOpen ? "open" : "closed";   // changes the color of the status
}

function toggleStatus() {
  isOpen = !isOpen;
  displayStatus();
}

// ===== Enhancement 1: Personalized greeting =====
function showGreeting() {
  const name = document.getElementById("customer").value.trim();

  if (!name) {
    greeting.textContent = "Please enter your name first!";
    return;
  }

  greeting.textContent = "Boo! Welcome to " + restaurantName + ", " + name + "! Happy Halloween!";
}

// ===== Enhancement 3: Meal recommendation based on total =====
function getRecommendation(amount) {
  if (amount >= 400) {
    return "Cursed Chocolate Cake (₱100)";
  } else if (amount >= 200) {
    return "Vampire Float (₱80)";
  } else {
    return "Bat Wing Fries (₱60)";
  }
}

// ===== Step 10: Order processing function =====
function placeOrder() {
  customerName = document.getElementById("customer").value.trim();
  const selectedMeal = document.getElementById("meal").value;
  quantity = Number(document.getElementById("quantity").value);

  if (!customerName) {
    result.textContent = "Please enter your name first!";
    return;
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    result.textContent = "Please enter a valid quantity.";
    return;
  }

  if (!isOpen) {
    result.textContent = "Sorry! The restaurant is closed.";
    return;
  }

  mealPrice = prices[selectedMeal];
  total = mealPrice * quantity;

  // Enhancement 2: 10% discount for orders of 300 or more
  let discount = 0;
  if (total >= 300) {
    discount = total * 0.10;
  }
  const finalTotal = total - discount;

  // Enhancement 4: ask the customer to confirm or cancel
  const confirmed = confirm(
    "Confirm your order, " + customerName + "?\n" +
    quantity + " x " + selectedMeal + "\n" +
    "Total to pay: ₱" + finalTotal.toFixed(2)
  );

  if (!confirmed) {
    result.textContent = "Order cancelled. You can order again anytime!";
    return;
  }

  let summary =
    "Thank you, " + customerName + "! Your order: " +
    quantity + " " + selectedMeal + "(s). Subtotal: ₱" + total + ". ";

  if (discount > 0) {
    summary += "You got a 10% discount (-₱" + discount.toFixed(2) + "). ";
  }

  summary += "Total: ₱" + finalTotal.toFixed(2) + ". ";
  summary += "We recommend you try our " + getRecommendation(total) + ". ";
  summary += "Enjoy your spooky meal!";

  result.textContent = summary;
}

// ===== Step 11: Event listeners =====
function showMenuMessage() {
  alert("Welcome to " + restaurantName + "! Choose your spooky meal.");
}

displayStatus();

document.getElementById("orderBtn").addEventListener("click", placeOrder);
document.getElementById("greetBtn").addEventListener("click", showGreeting);
document.getElementById("toggleBtn").addEventListener("click", toggleStatus);
document.querySelector('a[href="#menu"]').addEventListener("click", showMenuMessage);
