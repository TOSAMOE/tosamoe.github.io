let coins = 0;
let energy = 100;

function earnCoins() {
  if (energy > 0) {
    coins++;
    energy--;
    document.getElementById("coin-count").innerText = coins;
    document.getElementById("energy-count").innerText = energy;
  } else {
    alert("Out of energy!");
  }
}

function switchPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'flex';

  document.querySelectorAll('.nav-menu button').forEach(button => {
    button.classList.remove('active');
  });

  document.querySelector(`[onclick="switchPage('${pageId}')"]`).classList.add('active');
}

// Initialize by showing the Earn page
document.getElementById('earn-page').style.display = 'flex';
