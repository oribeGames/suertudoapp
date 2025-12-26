document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const minInput = document.getElementById('min-number');
    const maxInput = document.getElementById('max-number');
    const botonGenerar = document.getElementById('botonGenerar');
    const resultadoDisplay = document.getElementById('resultadoNumero');
    
    // Elementos del Modal
    const modal = document.getElementById('modalGanador');
    const nombreGanadorElem = document.getElementById('nombreGanador');
    const cerrarModalBtn = document.getElementById('cerrarModal');

    /**
     * Inicia la animación y la selección del número ganador.
     */
    const iniciarSorteo = () => {
        // 1. Obtener y validar los valores
        const min = parseInt(minInput.value, 10);
        const max = parseInt(maxInput.value, 10);

        if (isNaN(min) || isNaN(max)) {
            alert('Por favor, introduce números válidos en ambos campos.');
            return;
        }

        if (min >= max) {
            alert('El número mínimo debe ser menor que el máximo.');
            return;
        }

        // 2. Preparar la animación
        botonGenerar.disabled = true; // Desactivar botón durante la animación
        resultadoDisplay.classList.add('visible'); // Asegurarse de que el display es visible
        
        const duracionAnimacion = 2500; // 2.5 segundos
        const intervaloAnimacion = 75; // Cambiar número cada 75ms

        // 3. Iniciar el intervalo de la animación "slot machine"
        const animationInterval = setInterval(() => {
            const numeroPasajero = Math.floor(Math.random() * (max - min + 1)) + min;
            resultadoDisplay.textContent = numeroPasajero;
        }, intervaloAnimacion);

        // 4. Detener la animación y mostrar el ganador después de un tiempo
        setTimeout(() => {
            clearInterval(animationInterval); // Detener el cambio rápido de números

            // Calcular el número ganador FINAL
            const numeroGanador = Math.floor(Math.random() * (max - min + 1)) + min;

            // Mostrarlo en el display principal
            resultadoDisplay.textContent = numeroGanador;

            // Mostrarlo en el modal
            nombreGanadorElem.textContent = numeroGanador;
            modal.className = 'modal-visible';

        }, duracionAnimacion);
    };

    /**
     * Cierra el modal y reactiva el botón de generar.
     */
    const cerrarModal = () => {
        modal.className = 'modal-oculto';
        botonGenerar.disabled = false; // Reactivar el botón
    };

    // Asignar los eventos
    botonGenerar.addEventListener('click', iniciarSorteo);
    cerrarModalBtn.addEventListener('click', cerrarModal);
});