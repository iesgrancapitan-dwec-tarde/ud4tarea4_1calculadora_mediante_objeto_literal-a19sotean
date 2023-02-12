/**
 * Calculadora segunda parte.
 * 
 * Añádele ahora el comportamiento del display bien controlado (ni +, ni -, ni x ni %):
 * 
 *  - Inicialmente en el display aparece el cero sin decimal.
 *  - En el display sólo puede aparecer un punto decimal.
 *  - A la izquierda del punto sólo puede aparecer un cero ("00.1" no es válido).
 *  - No hay que escribir "0." para que te acepte el decimal. Basta con que pulse la coma decimal. Entonces el resto se consideran decimales.
 *  - En el display siempre ha de haber un dígito. En caso de usar el retroceso y ser el último carácter aparecerá un cero.
 *  - El cero negativo no existe ("-0" no es válido).
 * 
 * El diseño parte del ejercicio del tema anterior. Procura que el patrón de diseño sea con un objeto literal.
 * 
 * Ten en cuenta los siguientes detalles:
 *
 *  - Usa funciones arrow en la medida de lo posible.
 *  - Evita el uso del for clásico
 *  - No uses document.get... y añade el comportamiento conforme los vayas creando
 * 
 */

const calculadora = {
    botones: ["CE", "DEL", "%", "+", "7", "8", "9", "-", "4", "5", "6", "x", "1", "2", "3", "/", "0", "+/-", ",", "="],
    input: null,
    div: null,
    crearCalculadora: function () {
        this.div = document.createElement("div");
        this.div.setAttribute("id", "calculadora");
        document.body.appendChild(this.div);

        this.input = document.createElement("input");
        this.input.setAttribute("type", "text");
        this.input.setAttribute("id", "pantalla");
        this.input.setAttribute("value", "0");
        this.input.setAttribute("disabled", "true");
        this.div.appendChild(this.input);

        const divBotones = document.createElement("div");
        divBotones.setAttribute("id", "botones");
        this.div.appendChild(divBotones);

        const fragment = document.createDocumentFragment();
        this.botones.forEach((boton, i) => {
            const botonCalculadora = document.createElement("button");
            botonCalculadora.setAttribute("id", boton);
            botonCalculadora.setAttribute("class", "boton");
            botonCalculadora.textContent = boton;
            fragment.appendChild(botonCalculadora);

            if (i % 4 === 3) {
                const div = document.createElement("div");
                div.setAttribute("class", "clear");
                fragment.appendChild(div);
            }
        });
        divBotones.appendChild(fragment);
    },
    comportamientoDisplay: () => {
        const botones = document.querySelectorAll("#botones button");
        botones.forEach(boton => {
            boton.addEventListener("click", () => {
                const display = document.querySelector("#pantalla");
                const valorDisplay = display.value;
                const valorBoton = boton.textContent;
                const ultimoCaracter = valorDisplay[valorDisplay.length - 1];
                
                switch (valorDisplay) {
                    case "0":
                        if (valorBoton === "0") {
                            display.value = "0";
                        } else if (valorBoton === ",") {
                            display.value = "0,";
                        } else if (valorBoton !== "0" && valorBoton !== ",") {
                            display.value = valorBoton;
                        }
                }

                switch (valorBoton) {
                    case "CE":
                        display.value = "0";
                        break;
                    case "DEL":
                        if (valorDisplay.length === 1) {
                            display.value = "0";
                        } else {
                            display.value = valorDisplay.slice(0, -1);
                        }
                        break;
                    case "+/-":
                        if (valorDisplay[0] === "-") {
                            display.value = valorDisplay.slice(1);
                        } else {
                            display.value = "-" + valorDisplay;
                        }
                        break;
                    default:
                        if (valorDisplay !== "0" && valorBoton === "0" && ultimoCaracter !== "0") {
                            display.value = valorDisplay + valorBoton;
                        } else if (valorDisplay !== "0" && valorBoton === "0" && ultimoCaracter === "0") {
                            display.value = valorDisplay;
                        } else if (valorDisplay !== "0" && valorBoton === ",") {
                            if (valorDisplay.includes(",")) {
                                display.value = valorDisplay;
                            } else {
                                display.value = valorDisplay + valorBoton;
                            }
                        } else if (valorDisplay !== "0" && valorBoton !== "0" && valorBoton !== ",") {
                            display.value = valorDisplay + valorBoton;
                        }
                }

            });
        });

    }
};

document.addEventListener("DOMContentLoaded", () => {
    calculadora.crearCalculadora();
    calculadora.comportamientoDisplay();
});