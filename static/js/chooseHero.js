const columns = document.querySelectorAll('.column');
const selectedHeroes = new Map();

columns.forEach(column => {
    column.addEventListener('click', event => {
        const hero = event.target.closest('.hero');
        const columnIndex = parseInt(column.dataset.col);
        const heroIndex = parseInt(hero.dataset.index);

        // Remove the 'selected' class from any previously selected hero in the same column
        const previousSelectedHero = column.querySelector('.hero.selected');
        if (previousSelectedHero && previousSelectedHero !== hero) {
            previousSelectedHero.classList.remove('selected');
        }

        // Move the selected hero to the top of the column
        column.insertBefore(hero, column.firstChild);

        // Add the 'selected' class to the selected hero
        hero.classList.add('selected');

        // Update the selected heroes map
        let selectedHeroesArray = selectedHeroes.get(columnIndex);
        if (!selectedHeroesArray) {
            selectedHeroesArray = [];
            selectedHeroes.set(columnIndex, selectedHeroesArray);
        }
        selectedHeroesArray[0] = heroIndex;

        // Scroll to the top of the column
        window.scrollTo({
            top: column.offsetTop,
            behavior: 'smooth'
        });

        // Log the index of the selected hero
        console.log(`Selected hero index: ${heroIndex} in column ${columnIndex + 1}`);
    });
});

// Check if the number of selected heroes in each column is within the limit
const maxHeroesPerColumn = 1;
for (const [columnIndex, selectedHeroesArray] of selectedHeroes.entries()) {
    if (selectedHeroesArray.length > maxHeroesPerColumn) {
        alert(`You can only select ${maxHeroesPerColumn} hero(s) in column ${columnIndex + 1}.`);
        const selectedHero = columns[columnIndex].querySelector('.hero.selected');
        selectedHero.classList.remove('selected');
        columns[columnIndex].insertBefore(selectedHero, columns[columnIndex].firstChild);
        selectedHeroesArray.shift();
    }
}
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const containers = document.querySelectorAll('.container');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme'); // Переключаем класс dark-theme на элементе body
    containers.forEach(container => {
        container.classList.toggle('dark-theme'); // Переключаем класс dark-theme на каждом контейнере
    });
});
