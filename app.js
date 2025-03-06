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