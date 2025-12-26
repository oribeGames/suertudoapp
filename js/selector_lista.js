document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const listaTextarea = document.getElementById('listaTextarea');
    const archivoInput = document.getElementById('archivoInput');
    const contadorElem = document.getElementById('contadorParticipantes');
    const botonSeleccionar = document.getElementById('botonSeleccionar');
    
    // Elementos del Modal
    const modal = document.getElementById('modalGanador');
    const nombreGanadorElem = document.getElementById('nombreGanador');
    const cerrarModalBtn = document.getElementById('cerrarModal');

    // Estado de la aplicación
    let participantes = [];

    /**
     * Procesa una cadena de texto para convertirla en una lista de participantes.
     * @param {string} texto - El texto a procesar (puede ser de textarea o archivo).
     */
    const procesarListaDesdeTexto = (texto) => {
        // Separa por saltos de línea, quita espacios en blanco y filtra líneas vacías.
        const lineas = texto.split('\n')
                           .map(linea => linea.trim())
                           .filter(linea => linea.length > 0);
        
        participantes = [...new Set(lineas)]; // Usar Set para eliminar duplicados automáticamente
        actualizarContador();
    };

    /**
     * Procesa los datos de un archivo CSV. Asume que el nombre está en la primera columna.
     * @param {string} textoCsv - El contenido del archivo CSV.
     */
    const procesarListaDesdeCsv = (textoCsv) => {
        const lineas = textoCsv.split('\n')
                               .map(linea => {
                                   // Tomar solo la primera columna antes de la primera coma
                                   const primeraColumna = linea.split(',')[0].trim();
                                   return primeraColumna;
                               })
                               .filter(linea => linea.length > 0);
        
        participantes = [...new Set(lineas)];
        actualizarContador();
    };

    /**
     * Actualiza el contador de participantes en la interfaz.
     */
    const actualizarContador = () => {
        contadorElem.textContent = `${participantes.length} participante(s) detectado(s)`;
        botonSeleccionar.disabled = participantes.length < 1;
    };

    /**
     * Maneja el evento de carga de un archivo.
     * @param {Event} e - El evento del input de archivo.
     */
    const manejarCargaArchivo = (e) => {
        const archivo = e.target.files[0];
        if (!archivo) return;

        const lector = new FileReader();

        lector.onload = (eventoDeCarga) => {
            const contenido = eventoDeCarga.target.result;
            // Limpiar textarea para evitar confusiones
            listaTextarea.value = ''; 

            if (archivo.name.endsWith('.csv')) {
                procesarListaDesdeCsv(contenido);
            } else { // Asumir .txt o cualquier otro texto plano
                procesarListaDesdeTexto(contenido);
            }
        };

        lector.readAsText(archivo);
    };
    
    /**
     * Selecciona un ganador al azar y muestra el modal.
     */
    const seleccionarGanador = () => {
        if (participantes.length === 0) {
            alert('No hay participantes en la lista.');
            return;
        }

        const indiceGanador = Math.floor(Math.random() * participantes.length);
        const ganador = participantes[indiceGanador];
        
        nombreGanadorElem.textContent = ganador;
        modal.className = 'modal-visible';
    };

    const cerrarModal = () => {
        modal.className = 'modal-oculto';
    };

    // --- ASIGNACIÓN DE EVENTOS ---
    
    // Procesar texto del textarea en tiempo real
    listaTextarea.addEventListener('input', () => {
        procesarListaDesdeTexto(listaTextarea.value);
    });

    // Procesar archivo cuando se selecciona
    archivoInput.addEventListener('change', manejarCargaArchivo);

    // Acción de los botones
    botonSeleccionar.addEventListener('click', seleccionarGanador);
    cerrarModalBtn.addEventListener('click', cerrarModal);

    // Estado inicial del botón
    actualizarContador();
});