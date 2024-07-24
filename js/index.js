let montoSolicitado = 0;
let cuotasAPagar = 0;
let montoTotalConInteres = 0;
let montoAPagarPorMes = 0;

datosDelUsuario();


function datosDelUsuario() {
    montoSolicitado = parseInt(prompt('Ingrese cuanto desea solicitar'));
    cuotasAPagar = parseInt(prompt('Ingrese en cuantas cuotas lo desea pagar. Antes de 6 meses tiene 10% de interes mensual, de lo contrario tiene 15% de interes mensual.'));

    alert(`El monto total a pagar es $${parseInt(calcularTotalConInteres(montoSolicitado, cuotasAPagar))}`);
    let pagarPrestamo = parseInt(prompt('Desea realizar un pago? 1 - Si o 0 - No'));
    realizarPago(pagarPrestamo);

}

function calcularTotalConInteres(montoSolicitado, cuotas) {
    let interesMenor6meses = 0.10;
    let interesMayor6meses = 0.15;
    montoAPagarPorMes = parseInt(montoSolicitado / cuotas);
    let montoMesInteres = 0;
    montoTotalConInteres = montoSolicitado;

    if (cuotas <= 6) {
        for (let i = 0; i < cuotas; i++) {
            montoMesInteres = montoAPagarPorMes * interesMenor6meses;
            montoTotalConInteres += montoMesInteres
        }
    } else {
        for (let i = 0; i < cuotas; i++) {
            montoMesInteres = montoAPagarPorMes * interesMayor6meses;
            montoTotalConInteres += montoMesInteres;
        }
    }

    return montoTotalConInteres;
}

function realizarPago(pagarPrestamo) {
    if (pagarPrestamo === 1 || pagarPrestamo === 0) {
        while (pagarPrestamo === 1) {
            if (montoTotalConInteres > 0) {
                montoTotalConInteres = montoTotalConInteres - montoAPagarPorMes;

                cuotasAPagar--;

                alert(`Se ha descontado $${montoAPagarPorMes}. Su saldo restante es de $${parseInt(montoTotalConInteres)} a pagar en ${cuotasAPagar} cuotas`);
                pagarPrestamo = parseInt(prompt('Desea continuar pagado? 1 - Si o 0 - No'));
            }
            else {
                alert('Ya no tiene dinero pendiente por pagar.');
                pagarPrestamo = 0;
            }

        }
        if (montoTotalConInteres > 0) {
            alert(`Su saldo restante es $${parseInt(montoTotalConInteres)} a pagar en ${cuotasAPagar} cuotas. Gracias`);
        }


    } else {
        alert('Debe ingresar un 1 o 0 (Si - No)');
        pagarPrestamo = parseInt(prompt('Desea continuar pagado? 1 - Si o 0 - No'));
        realizarPago(pagarPrestamo);
    }

}