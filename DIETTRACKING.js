document.addEventListener('DOMContentLoaded', () => {
let foodlog = [];
let dailygoal = 0;
let totalcalories = 0;
document.getElementById('add-food-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const foodname = document.getElementById('food-name').value;
    foodlog.push({name: foodname, calories: calories});
    totalCalories += calories;
    updatefoodlog();
    updateProgress();
    document.getElementById('food-name').value ='';
    document.getElementById('calories').value ='';
});
document.getElementById('set-daily-goal-btn').addEventListener('click', (e) => {
    e.preventDefault();
    dailyGoal = parseInt(document.getElementById('daily-goal-input').value);
    updateProgress();
});
function updatefoodlog() {
    const foodlist = document.getElementById('food-list');
    foodlist.innerHTML = '';
    foodlog.forEach((food) => {
        const li = document.createElement('li');
        li.textContent = `${food.name} - ${food.calories} calories`;
        foodlist.appendchild(li);
    });
    document.getElementById('total-calories').textContent = totalcalories;

}
function updateProgress(){
    if(dailyGoal >0)
    {
    const progress =(totalcalories / dailygoal)*100;
    document.getElementById('progress-bar').value =progress;
    document.getElementById('progress').textContent = `${Math.min(progress,100).toFixed(2)}%`;
}
}
});