let foodItems = [];

function addFood() {
    const foodName = document.getElementById('foodName').value.trim();
    const calories = parseInt(document.getElementById('calories').value) || 0;
    const protein = parseFloat(document.getElementById('protein').value) || 0;
    const carbs = parseFloat(document.getElementById('carbs').value) || 0;
    const fat = parseFloat(document.getElementById('fat').value) || 0;
    const mealType = document.getElementById('mealType').value;

    if (!foodName || calories <= 0) {
        alert('Please enter a valid food name and calories.');
        return;
    }

    const newFood = {
        id: Date.now(),
        name: foodName,
        calories: calories,
        protein: protein,
        carbs: carbs,
        fat: fat,
        mealType: mealType,
        timestamp: new Date().toLocaleTimeString()
    };

    foodItems.push(newFood);
    updateDisplay();
    clearForm();
}

function deleteFood(id) {
    foodItems = foodItems.filter(item => item.id !== id);
    updateDisplay();
}

function updateDisplay() {
    updateStats();
    updateFoodList();
}

function updateStats() {
    const totals = foodItems.reduce((acc, item) => {
        acc.calories += item.calories;
        acc.protein += item.protein;
        acc.carbs += item.carbs;
        acc.fat += item.fat;
        return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

    document.getElementById('totalCalories').textContent = totals.calories;
    document.getElementById('totalProtein').textContent = totals.protein.toFixed(1) + 'g';
    document.getElementById('totalCarbs').textContent = totals.carbs.toFixed(1) + 'g';
    document.getElementById('totalFat').textContent = totals.fat.toFixed(1) + 'g';
}

function updateFoodList() {
    const foodList = document.getElementById('foodList');
    
    if (foodItems.length === 0) {
        foodList.innerHTML = '<div class="empty-state"><p>No food items added yet. Start tracking your meals!</p></div>';
        return;
    }

    const groupedItems = foodItems.reduce((acc, item) => {
        if (!acc[item.mealType]) {
            acc[item.mealType] = [];
        }
        acc[item.mealType].push(item);
        return acc;
    }, {});

    let html = '';
    const mealOrder = ['breakfast', 'lunch', 'dinner', 'snack'];
    
    mealOrder.forEach(mealType => {
        if (groupedItems[mealType] && groupedItems[mealType].length > 0) {
            html += `<div style="background: rgba(102, 126, 234, 0.1); padding: 15px 20px; font-weight: 600; color: #4a5568; text-transform: capitalize;">${mealType} (${groupedItems[mealType].length} items)</div>`;
            
            groupedItems[mealType].forEach(item => {
                html += `
                    <div class="food-item">
                        <div class="food-info">
                            <div class="food-name">${item.name}</div>
                            <div class="food-details">
                                ${item.calories} cal • Protein: ${item.protein}g • Carbs: ${item.carbs}g • Fat: ${item.fat}g • Added: ${item.timestamp}
                            </div>
                        </div>
                        <button class="delete-btn" onclick="deleteFood(${item.id})">Delete</button>
                    </div>
                `;
            });
        }
    });

    foodList.innerHTML = html;
}

function clearForm() {
    document.getElementById('foodName').value = '';
    document.getElementById('calories').value = '';
    document.getElementById('protein').value = '';
    document.getElementById('carbs').value = '';
    document.getElementById('fat').value = '';
    document.getElementById('mealType').value = 'breakfast';
}

// Handle Enter key in form inputs
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addFood();
    }
});

// Initialize display
updateDisplay();