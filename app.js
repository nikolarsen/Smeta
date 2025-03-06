#document.addEventListener("DOMContentLoaded", function () {
    const smetaBody = document.getElementById("smeta-body");
    const totalSpan = document.getElementById("total");
    const addRowButton = document.getElementById("add-row");

    function updateTotal() {
        let total = 0;
        document.querySelectorAll(".row-total").forEach(cell => {
            total += parseFloat(cell.textContent) || 0;
        });
        totalSpan.textContent = total.toFixed(2);
    }

    function addRow() {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="text" placeholder="Введите работу"></td>
            <td><input type="number" value="1" min="1" class="qty"></td>
            <td><input type="number" value="0" min="0" class="price"></td>
            <td class="row-total">0</td>
            <td><button class="delete-row">❌</button></td>
        `;

        smetaBody.appendChild(row);
        updateRowEvents();
    }

    function updateRowEvents() {
        document.querySelectorAll(".qty, .price").forEach(input => {
            input.addEventListener("input", function () {
                const row = this.closest("tr");
                const qty = row.querySelector(".qty").value;
                const price = row.querySelector(".price").value;
                row.querySelector(".row-total").textContent = (qty * price).toFixed(2);
                updateTotal();
            });
        });

        document.querySelectorAll(".delete-row").forEach(button => {
            button.addEventListener("click", function () {
                this.closest("tr").remove();
                updateTotal();
            });
        });
    }

    addRowButton.addEventListener("click", addRow);

    // Установка PWA
    let deferredPrompt;
    window.addEventListener("beforeinstallprompt", event => {
        event.preventDefault();
        deferredPrompt = event;
    });

    window.installPWA = function () {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(choice => {
                deferredPrompt = null;
            });
        }
    };

    addRow(); // Добавляем первую строку
});
document.addEventListener("DOMContentLoaded", function () {
    const captureBtn = document.getElementById("captureBtn");

    captureBtn.addEventListener("click", async function () {
        // Динамически загружаем html2canvas, если он не подключен
        if (!window.html2canvas) {
            await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
        }

        // Захватываем страницу
        html2canvas(document.body).then(canvas => {
            const imgData = canvas.toDataURL("image/jpeg", 1.0); // Преобразуем в JPEG
            const link = document.createElement("a");
            link.href = imgData;
            link.download = "screenshot.jpg";
            link.click();
        });
    });

    // Функция загрузки скрипта
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
});