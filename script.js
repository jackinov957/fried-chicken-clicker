document.addEventListener('DOMContentLoaded', () => {
    const img = document.getElementById('fried-chicken-img');
    const countDisplay = document.getElementById('count');
    const clickerCountDisplay = document.getElementById('clicker-count');
    const friedChickenPerSecondDisplay = document.getElementById('fried-chicken-per-second');
    const buyClickerButton = document.getElementById('buy-clicker');
    const sellClickerButton = document.getElementById('sell-clicker');
    const doubleProductionButton = document.getElementById('double-production');
    const doubleProductionImg = document.getElementById('double-production-img');
    const upgradesList = document.getElementById('upgrades-list');

    let count = 0;
    let clickerCount = 0;
    let friedChickenPerSecond = 0;
    let friedChickenPerClick = 1; // Initial fried chickens per click
    let doubleProductionPurchased = false; // Track if the upgrade has been purchased
    const baseClickerCost = 10; // Initial cost of a clicker
    const clickerGenerationRate = 0.1; // Fried chickens per second from each clicker
    const sellPriceMultiplier = 0.75; // Selling price multiplier
    const doubleProductionCost = 50; // Cost of the Double Production upgrade

    const upgrades = []; // Array to store purchased upgrades

    // Function to calculate clicker cost
    function calculateClickerCost() {
        return Math.ceil(baseClickerCost * Math.pow(1.15, clickerCount));
    }

    // Update button states
    function updateButtonStates() {
        const clickerCost = calculateClickerCost();
        buyClickerButton.textContent = `Buy Clicker (${clickerCost} Fried Chickens)`;
        buyClickerButton.disabled = count < clickerCost;
        sellClickerButton.disabled = clickerCount === 0;
        doubleProductionButton.style.display = count >= doubleProductionCost && !doubleProductionPurchased ? 'block' : 'none';
    }

    // Handle image click
    img.addEventListener('click', () => {
        count += friedChickenPerClick;
        countDisplay.textContent = `Fried chickens: ${Math.floor(count)}`;
        updateButtonStates(); // Update button state after clicking
    });

    // Handle buying clickers
    buyClickerButton.addEventListener('click', () => {
        const clickerCost = calculateClickerCost();
        if (count >= clickerCost) {
            count -= clickerCost;
            clickerCount++;
            friedChickenPerSecond += clickerGenerationRate;
            countDisplay.textContent = `Fried chickens: ${Math.floor(count)}`;
            clickerCountDisplay.textContent = `Clickers: ${clickerCount}`;
            friedChickenPerSecondDisplay.textContent = `Fried chickens per second: ${friedChickenPerSecond.toFixed(1)}`;
            updateButtonStates(); // Update button state after purchase
        } else {
            alert('Not enough fried chickens to buy a clicker!');
        }
    });

    // Handle selling clickers
    sellClickerButton.addEventListener('click', () => {
        if (clickerCount > 0) {
            const clickerSellPrice = Math.ceil(calculateClickerCost() * sellPriceMultiplier);
            count += clickerSellPrice;
            clickerCount--;
            friedChickenPerSecond -= clickerGenerationRate;
            countDisplay.textContent = `Fried chickens: ${Math.floor(count)}`;
            clickerCountDisplay.textContent = `Clickers: ${clickerCount}`;
            friedChickenPerSecondDisplay.textContent = `Fried chickens per second: ${friedChickenPerSecond.toFixed(1)}`;
            updateButtonStates(); // Update button state after selling
        }
    });

    // Handle doubling production
    doubleProductionButton.addEventListener('click', () => {
        if (count >= doubleProductionCost && !doubleProductionPurchased) {
            count -= doubleProductionCost;
            friedChickenPerClick *= 2;
            friedChickenPerSecond *= 2;
            doubleProductionPurchased = true;

            // Update button state
            doubleProductionButton.style.display = 'none';
            friedChickenPerSecondDisplay.textContent = `Fried chickens per second: ${friedChickenPerSecond.toFixed(1)}`;

            // Add to upgrades list
            upgrades.push('Double Production');
            displayUpgrades();
        }
    });

    // Function to display purchased upgrades
    function displayUpgrades() {
        upgradesList.innerHTML = '';
        upgrades.forEach(upgrade => {
            const li = document.createElement('li');
            li.textContent = upgrade;
            upgradesList.appendChild(li);
        });
    }

    // Function to update fried chicken count every second based on clicker count
    setInterval(() => {
        count += friedChickenPerSecond;
        countDisplay.textContent = `Fried chickens: ${Math.floor(count)}`;
    }, 1000);

    // Initial button states update
    updateButtonStates();

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });
});

