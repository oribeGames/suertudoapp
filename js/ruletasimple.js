document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const canvas = document.getElementById('ruletaCanvas');
    const ctx = canvas.getContext('2d');
    const botonGirar = document.getElementById('botonGirar');
    const inputOpcion = document.getElementById('inputOpcion');
    const botonAnadir = document.getElementById('botonAnadir');
    const listaOpciones = document.getElementById('listaOpciones');
    const modal = document.getElementById('modalGanador');
    const nombreGanadorElem = document.getElementById('nombreGanador');
    const cerrarModalBtn = document.getElementById('cerrarModal');

    // Estado de la ruleta
    let opciones = [];
    let rotacionActual = 0;
    const colores = ['#3498db', '#f1c40f', '#e74c3c', '#2ecc71', '#9b59b6', '#1abc9c', '#e67e22', '#34495e'];

    const dibujarRuleta = () => {
        const numOpciones = opciones.length;
        const anguloPorcion = (2 * Math.PI) / numOpciones;
        const radio = canvas.width / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (numOpciones === 0) {
            ctx.fillStyle = '#ddd';
            ctx.beginPath();
            ctx.arc(radio, radio, radio - 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = '#333';
            ctx.font = '20px Poppins, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Añade opciones', radio, radio);
            return;
        }

        opciones.forEach((opcion, i) => {
            const angulo = i * anguloPorcion;
            ctx.fillStyle = colores[i % colores.length];

            // Dibuja el segmento
            ctx.beginPath();
            ctx.moveTo(radio, radio);
            ctx.arc(radio, radio, radio - 5, angulo, angulo + anguloPorcion);
            ctx.closePath();
            ctx.fill();

            // Dibuja el texto
            ctx.save();
            ctx.fillStyle = 'white';
            ctx.font = 'bold 16px Poppins, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.translate(
                radio + (radio / 1.5) * Math.cos(angulo + anguloPorcion / 2),
                radio + (radio / 1.5) * Math.sin(angulo + anguloPorcion / 2)
            );
            ctx.rotate(angulo + anguloPorcion / 2 + Math.PI / 2);
            ctx.fillText(opcion, 0, 0);
            ctx.restore();
        });
    };

    const actualizarListaDOM = () => {
        listaOpciones.innerHTML = '';
        opciones.forEach((opcion, index) => {
            const li = document.createElement('li');
            li.textContent = opcion;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '×';
            deleteBtn.className = 'delete-button';
            deleteBtn.onclick = () => {
                opciones.splice(index, 1);
                actualizarListaDOM();
                dibujarRuleta();
            };
            li.appendChild(deleteBtn);
            listaOpciones.appendChild(li);
        });
        botonGirar.disabled = opciones.length < 2;
    };

    const anadirOpcion = () => {
        const textoOpcion = inputOpcion.value.trim();
        if (textoOpcion && opciones.length < 12) { // Limitar a 12 opciones para legibilidad
            opciones.push(textoOpcion);
            inputOpcion.value = '';
            actualizarListaDOM();
            dibujarRuleta();
        } else if (opciones.length >= 12) {
            alert('Puedes añadir un máximo de 12 opciones.');
        }
    };

    const girarRuleta = () => {
        if (opciones.length < 2) return;

        const vueltas = 5; // Número de vueltas completas
        const gradosExtra = Math.floor(Math.random() * 360);
        const gradosTotales = (vueltas * 360) + gradosExtra;

        rotacionActual += gradosTotales;
        
        // Aplicar la rotación con CSS para una animación fluida
        canvas.style.transition = 'transform 5s cubic-bezier(0.25, 1, 0.5, 1)';
        canvas.style.transform = `rotate(${rotacionActual}deg)`;

        botonGirar.disabled = true;

        // Esperar a que la animación termine para determinar el ganador
        setTimeout(() => {
            const anguloFinal = rotacionActual % 360;
            const anguloPuntero = 270; // El puntero está en la parte superior (270 grados)
            const anguloNormalizado = (360 - anguloFinal + anguloPuntero) % 360;
            const indiceGanador = Math.floor(anguloNormalizado / (360 / opciones.length));
            
            mostrarGanador(opciones[indiceGanador]);
        }, 5100); // 5000ms de la animación + 100ms de margen
    };

    const mostrarGanador = (ganador) => {
        nombreGanadorElem.textContent = ganador;
        modal.className = 'modal-visible';
    };

    const cerrarModal = () => {
        modal.className = 'modal-oculto';
        botonGirar.disabled = false;
    };
    
    // Event Listeners
    botonAnadir.addEventListener('click', anadirOpcion);
    inputOpcion.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') anadirOpcion();
    });
    botonGirar.addEventListener('click', girarRuleta);
    cerrarModalBtn.addEventListener('click', cerrarModal);

    // Inicializar
    dibujarRuleta();
    actualizarListaDOM();
});