/**
 * SuertudoApp - main.js
 * Este archivo contiene la funcionalidad de navegación de la página principal.
 */

// URL de la página genérica de juego.
const gamePageURL = '/html/suertudoapp.html';

/**
 * Redirige a la página de juego para la Ruleta.
 * En el futuro, se podría pasar un parámetro: `juego.html?tool=ruleta`
 */
function irARuleta() {
    window.location.href = '/html/ruletasimple.html';
}

/**
 * Redirige a la página de juego para el Número Aleatorio.
 */
function generarNumero() {
    window.location.href = '/html/numero_aleatorio.html';
}

/**
 * Redirige a la página de juego para el Selector desde Lista.
 */
function seleccionarDeLista() {
    window.location.href = '/html/selector_lista.html';
}

/**
 * Redirige a la página de juego para el Sorteo por Comentarios.
 */
function sorteoPorComentarios() {
    window.location.href = gamePageURL;
}