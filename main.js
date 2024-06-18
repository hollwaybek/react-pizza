import NewData from './mook.js';

let pizzas = document.querySelector('.pizzas');
let meatBtn = document.querySelector('.meat');
let vigtailsBtn = document.querySelector('.Vigtails');
let grilBtn = document.querySelector('.Gril');
let ostriyBtn = document.querySelector('.Ostriy');
let closeBtn = document.querySelector('.Close');
let allBtn = document.querySelector('.all');
let allCostElement = document.querySelector('.all_cost');
let cartItemCountElement = document.querySelector('.header_right p:last-child');

let totalCost = 0;
let itemCount = 0;
let previousAddBtn = null;
let clickCounts = new Map();

const ReadFunction = (data) => {
    pizzas.innerHTML = '';
    data.map((v) => {
        let div = document.createElement('div');
        div.innerHTML =
            `<div class="pizza_card">
                <img src="${v.img}" alt="">
                <p class="pizza_name">${v.name}</p>
                <div class="full_size">
                    <div class="qalinlik">
                        <button class="qalin" type="button">тонкое</button>
                        <button class="odatiy" type="button">традиционное</button>
                    </div>
                    <div class="sm">
                        <button class="small" type="button">26 см.</button>
                        <button class="daily" type="button">30 см.</button>
                        <button class="bigger" type="button">40 см.</button>
                    </div>
                </div>
                <div class="pizza_card_footer">
                    <p class="price">от ${v.price_30} ₽</p>
                    <button class="add_btn">+ Добавить </button>
                </div>
            </div>`;
        pizzas.appendChild(div);

        let qalinBtn = div.querySelector('.qalin');
        let odatiyBtn = div.querySelector('.odatiy');
        let priceElement = div.querySelector('.price');
        let smallBtn = div.querySelector('.small');
        let dailyBtn = div.querySelector('.daily');
        let biggerBtn = div.querySelector('.bigger');

        const resetQalinlikButtonStyles = () => {
            qalinBtn.style.backgroundColor = ''; // Default background
            odatiyBtn.style.backgroundColor = ''; // Default background
        };

        const resetSizeButtonStyles = () => {
            smallBtn.style.backgroundColor = ''; // Default background
            dailyBtn.style.backgroundColor = ''; // Default background
            biggerBtn.style.backgroundColor = ''; // Default background
        };

        odatiyBtn.addEventListener('click', () => {
            resetQalinlikButtonStyles();
            odatiyBtn.style.backgroundColor = 'white';
            updatePrice();
        });

        qalinBtn.addEventListener('click', () => {
            resetQalinlikButtonStyles();
            qalinBtn.style.backgroundColor = 'white';
            updatePrice();
        });

        smallBtn.addEventListener('click', () => {
            resetSizeButtonStyles();
            smallBtn.style.backgroundColor = 'white';
            updatePrice();
        });

        dailyBtn.addEventListener('click', () => {
            resetSizeButtonStyles();
            dailyBtn.style.backgroundColor = 'white';
            updatePrice();
        });

        biggerBtn.addEventListener('click', () => {
            resetSizeButtonStyles();
            biggerBtn.style.backgroundColor = 'white';
            updatePrice();
        });

        const updatePrice = () => {
            if (odatiyBtn.style.backgroundColor === 'white' && smallBtn.style.backgroundColor === 'white') {
                priceElement.innerText = `от ${v.price_odatiy_26} ₽`;
            } else if (qalinBtn.style.backgroundColor === 'white' && smallBtn.style.backgroundColor === 'white') {
                priceElement.innerText = `от ${v.price_26} ₽`;
            } else if (odatiyBtn.style.backgroundColor === 'white' && dailyBtn.style.backgroundColor === 'white') {
                priceElement.innerText = `от ${v.price_odatiy_30} ₽`;
            } else if (qalinBtn.style.backgroundColor === 'white' && dailyBtn.style.backgroundColor === 'white') {
                priceElement.innerText = `от ${v.price_30} ₽`;
            } else if (odatiyBtn.style.backgroundColor === 'white' && biggerBtn.style.backgroundColor === 'white') {
                priceElement.innerText = `от ${v.price_odatiy_40} ₽`;
            } else if (qalinBtn.style.backgroundColor === 'white' && biggerBtn.style.backgroundColor === 'white') {
                priceElement.innerText = `от ${v.price_40} ₽`;
            }
            // Add additional logic for other sizes if needed
        };




        let addBtn = div.querySelector('.add_btn');
        clickCounts.set(addBtn, 0); // Initialize click count for the button

        addBtn.addEventListener('click', () => {
            if (previousAddBtn && previousAddBtn !== addBtn) {
                previousAddBtn.style.backgroundColor = ''; // Reset the previous button's style
                previousAddBtn.style.color = ''; // Reset the previous button's text color
                previousAddBtn.innerHTML = previousAddBtn.innerHTML.split(' (')[0]; // Keep the click count on the previous button
            }

            let price = parseInt(div.querySelector('.price').innerText.replace('от ', '').replace(' ₽', ''));
            totalCost += price;
            itemCount += 1;
            allCostElement.innerText = `${totalCost} ₽`;
            cartItemCountElement.innerText = itemCount.toString();

            // Increment and update click count
            let clickCount = clickCounts.get(addBtn) + 1;
            clickCounts.set(addBtn, clickCount);

            if (clickCount > 1) {
                addBtn.innerHTML = `+ Добавить ${clickCount}`;
            } else {
                addBtn.innerHTML = `+ Добавить ${clickCount}`;
            }

            addBtn.style.backgroundColor = '#FE5F1E'; // Change the current button's style
            addBtn.style.color = 'white'; // Change the current button's text color

            previousAddBtn = addBtn; // Update previous button reference
        });
    });
};

ReadFunction(NewData.All);

const FilterByCategory = (category) => {
    ReadFunction(NewData[category]);
};

const buttons = [allBtn, meatBtn, vigtailsBtn, grilBtn, ostriyBtn, closeBtn];

function resetButtonStyles() {
    buttons.forEach(button => {
        button.style.backgroundColor = ''; // or your default color
        button.style.color = ''; // or your default color
    });
}

allBtn.addEventListener('click', () => {
    resetButtonStyles();
    FilterByCategory('All');
    allBtn.style.backgroundColor = 'black';
    allBtn.style.color = 'white';
});

window.addEventListener('load', () => {
    allBtn.click();
});

meatBtn.addEventListener('click', () => {
    resetButtonStyles();
    FilterByCategory('Meat');
    meatBtn.style.backgroundColor = 'black';
    meatBtn.style.color = 'white';
});

vigtailsBtn.addEventListener('click', () => {
    resetButtonStyles();
    FilterByCategory('Vigtails');
    vigtailsBtn.style.backgroundColor = 'black';
    vigtailsBtn.style.color = 'white';
});

grilBtn.addEventListener('click', () => {
    resetButtonStyles();
    FilterByCategory('Gril');
    grilBtn.style.backgroundColor = 'black';
    grilBtn.style.color = 'white';
});

ostriyBtn.addEventListener('click', () => {
    resetButtonStyles();
    FilterByCategory('Ostriy');
    ostriyBtn.style.backgroundColor = 'black';
    ostriyBtn.style.color = 'white';
});

closeBtn.addEventListener('click', () => {
    resetButtonStyles();
    FilterByCategory('Close');
    closeBtn.style.backgroundColor = 'black';
    closeBtn.style.color = 'white';
});
