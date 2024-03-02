document.addEventListener("DOMContentLoaded", function() {
    const boton = document.getElementById("calcular");
    const ERROR = document.getElementById("error");
    const RESULTADO_FLU = document.getElementById("resultado_flu");
    const RESULTADO_MAN = document.getElementById("resultado_man");

    boton.addEventListener("click", () => {
        const peso = parseFloat(document.getElementById("paso").value);
        if (peso > 0) {
            ERROR.style.display = "none";
            const flujo = calcularFlujo(peso);
            const mantenimiento = calcularMantenimiento(flujo);
            RESULTADO_FLU.innerHTML = `Flu: ${flujo} cc/hr`;
            RESULTADO_MAN.innerHTML = `Man: ${mantenimiento} cc/hr`;
        } else {
            ERROR.style.display = "block";
            RESULTADO_FLU.innerHTML = "";
            RESULTADO_MAN.innerHTML = "";
        }
    });

    function calcularFlujo(peso) {
        let flujo = 0;
        if (peso <= 10) {
            flujo = peso * 100;
        } else if (peso <= 20) {
            flujo = 1000 + (peso - 10) * 50;
        } else {
            flujo = 1500 + (peso - 20) * 20;
        }
        return flujo;
    }

    function calcularMantenimiento(flujo) {
        return flujo * 1.5;
    }
});
