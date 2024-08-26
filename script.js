document.addEventListener('DOMContentLoaded', () => {
    const img = document.getElementById('fried-chicken-img');
    const countDisplay = document.getElementById('count');
    const clickerCountDisplay = document.getElementById('clicker-count');
    const friedChickenPerSecondDisplay = document.getElementById('fried-chicken-per-second');
    const buyClickerButton = document.getElementById('buy-clicker');
    const sellClickerButton = document.getElementById('sell-clicker');
    const doubleProductionButton = document.getElementById('double-production');

    let count = 0;
    let clickerCount = 0;
    let friedChickenPerSecond = 0;
    let friedChickenPerClick = 1; // Initial fried chickens per click
    const baseClickerCost = 10; // Initial cost of a clicker
    const clickerGenerationRate = 0.1; // Fried chickens per second from each clicker
    const sellPriceMultiplier = 0.75; // Selling price multiplier

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
        doubleProductionButton.style.display = clickerCount >= 5 ? 'block' : 'none';
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
        friedChickenPerClick *= 2;
        friedChickenPerSecond *= 2;
        friedChickenPerSecondDisplay.textContent = `Fried chickens per second: ${friedChickenPerSecond.toFixed(1)}`;
        doubleProductionButton.style.display = 'none'; // Hide button after doubling
    });

    // Function to update fried chicken count every second based on clicker count
    setInterval(() => {
        count += friedChickenPerSecond;
        countDisplay.textContent = `Fried chickens: ${Math.floor(count)}`;
    }, 1000);

    // Initial button states update
    updateButtonStates();
});
