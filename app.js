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

        document.addEventListener("DOMContentLoaded", function () {
    const captureBtn = document.getElementById("captureBtn");

    captureBtn.addEventListener("click", function () {
        if (typeof html2canvas !== "function") {
            console.error("html2canvas не загружен!");
            return;
        }

        html2canvas(document.body).then(canvas => {
            canvas.toBlob(blob => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "screenshot.jpg";
                link.click();
            }, "image/jpeg", 1.0);
        }).catch(error => console.error("Ошибка при создании скриншота:", error));
    });
});