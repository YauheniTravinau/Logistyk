// Функция для загрузки и вставки контента (например, хедера, меню или футера)
async function includeContent(elementId, contentPath) {
    return new Promise(async (resolve, reject) => {
        const contentElement = document.getElementById(elementId);
        if (contentElement) {
            try {
                const response = await fetch(contentPath);
                if (response.ok) {
                    contentElement.innerHTML = await response.text();
                    resolve(); // Успешное выполнение Promise
                } else {
                    console.error(`Failed to fetch content from ${contentPath}: ${response.status} ${response.statusText}`);
                    reject(new Error(`Failed to fetch content from ${contentPath}: ${response.status} ${response.statusText}`));
                }
            } catch (error) {
                console.error(`Fetch error: ${error}`);
                reject(error);
            }
        } else {
            reject(new Error(`Element with id ${elementId} not found`));
        }
    });
}

// Функция для загрузки курса доллара к рублю
async function fetchExchangeRates() {
    try {
        const response = await fetch('https://v6.exchangerate-api.com/v6/0ab71458480a63024f1255aa/latest/USD');
        if (response.ok) {
            const data = await response.json();
            if (data && data.conversion_rates) {
                const usdRubRate = (data.conversion_rates.RUB + 6.72).toFixed(2);

                // Update the placeholders in HTML
                document.getElementById('usd-to-rub').innerText = `${usdRubRate} `;
            } else {
                console.error('Failed to fetch exchange rates: Data or conversion_rates not found');
            }
        } else {
            console.error('Failed to fetch exchange rates');
        }
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    try {
        await includeContent("header", "../components/header/header.html");
        // Код, который выполняется после успешной загрузки header.html

        await includeContent("menu", "../components/menu/menu.html");
        // Код, который выполняется после успешной загрузки menu.html

        await includeContent("footer", "../components/footer/footer.html");
        // Код, который выполняется после успешной загрузки footer.html

        // Получаем ссылки на элементы меню и бургер-иконку
        const menu = document.getElementById("menu");
        const burgerIcon = document.getElementById("burger-icon");

        // Проверяем, был ли найден элемент с id "burger-icon"
        if (burgerIcon) {
            // Добавляем обработчик события для бургер-иконки
            burgerIcon.addEventListener("click", function () {
                menu.classList.toggle("active"); // Переключаем класс активности меню
            });
        } else {
            console.error("Element with id 'burger-icon' not found");
        }

        // Загружаем и отображаем курсы валют
        await fetchExchangeRates();

        // Добавляем обработчик события клика на документ
        document.addEventListener("click", function (event) {
            // Проверяем, активно ли меню и был ли клик вне меню
            if (menu.classList.contains("active") && !menu.contains(event.target)) {
                menu.classList.remove("active"); // Закрываем меню
            }
        });
    } catch (error) {
        console.error(`Error loading content or fetching exchange rates: ${error}`);
    }
});




document.addEventListener("DOMContentLoaded", function () {
    const expandButton = document.querySelector(".expand-button");
    const expandable = document.querySelector(".expandable");

    if (expandButton) {
        expandButton.addEventListener("click", function () {
            if (expandable.style.display === "none" || expandable.style.display === "") {
                expandable.style.display = "flex";
                expandButton.classList.add("expanded");
            } else {
                expandable.style.display = "none";
                expandButton.classList.remove("expanded");
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // Определите массив страниц, на которых код не должен выполняться
    const excludedPages = [
        "/about/about.html",
        "/reviews/reviews.html",
        "/translations/translations.html",
        "/shop/shop.html",
        "/payment-and-delivery/payment-and-delivery.html"
    ];

    // Получите текущий URL
    const currentURL = window.location.pathname;

    // Проверьте, находитесь ли вы на странице, где код не должен выполняться
    if (!excludedPages.includes(currentURL)) {
        const scrollButton = document.getElementById('scroll-button');
        const targetTextElement = document.getElementById('main'); // Замените на идентификатор или класс элемента, к которому нужно прокрутить

        scrollButton.addEventListener('click', function () {
            if (targetTextElement) {
                const offset = targetTextElement.offsetTop;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    }
});






