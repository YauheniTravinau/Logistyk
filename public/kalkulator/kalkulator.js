// Открыть окно калькулятора
document.getElementById("openCalculator").addEventListener("click", function () {
    document.getElementById("calculator").classList.remove("hidden");
});

// Закрыть окно калькулятора
document.getElementById("closeCalculator").addEventListener("click", function () {
    document.getElementById("calculator").classList.add("hidden");
});

// При нажатии на кнопку "Рассчитать"
document.getElementById("calculate").addEventListener("click", function () {
    // Получаем введенные значения из полей
    const productPrice = parseFloat(document.getElementById("productPrice").value);
    const shippingPrice = parseFloat(document.getElementById("shippingPrice").value);
    const quantityFrom = parseInt(document.getElementById("quantityFrom").value);
    const currency = document.getElementById("currency").value;

    // Проводим расчеты
    const totalPriceInUSD = productPrice + shippingPrice;
    const totalPriceInOtherCurrency = convertCurrency(totalPriceInUSD, "USD", currency);
    const buyPrice = totalPriceInOtherCurrency * quantityFrom;

    // Выводим результаты в соответствующие элементы
    document.getElementById("resultUSD").textContent = totalPriceInUSD.toFixed(2) + " USD";
    document.getElementById("resultEUR").textContent = totalPriceInOtherCurrency.toFixed(2) + " " + currency;
    document.getElementById("buyPrice").textContent = buyPrice.toFixed(2) + " " + currency;
});

// Функция для конвертации валюты
function convertCurrency(amount, fromCurrency, toCurrency) {
    // В реальном приложении здесь будет запрос к API для получения актуальных курсов валют
    // На данном этапе, используем фиксированный коэффициент для примера
    const currencyRates = {
        "USD": 1.0,
        "EUR": 0.85,
        "RUB": 74.50,
        "PLN": 3.80,
        "USDT": 1.0, // USDT приведен к 1:1 с USD для простоты
    };

    const rateFrom = currencyRates[fromCurrency];
    const rateTo = currencyRates[toCurrency];

    if (rateFrom && rateTo) {
        return (amount / rateFrom) * rateTo;
    } else {
        console.error("Неверные валюты");
        return 0;
    }
}
