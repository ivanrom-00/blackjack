const juego = (() => {
    'use strict'

    // ---------------------------------------------------------------------------------------------------------------
    // CONSTANTES, VARIABLES Y REFERENCIAS

    let   deck       = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // Referencias de HTML
    const btnPedir           = document.querySelector('#btnPedir'),
          btnDetener         = document.querySelector('#btnDetener'),
          btnNuevo           = document.querySelector('#btnNuevo'),
          divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML         = document.querySelectorAll('small');

    // ---------------------------------------------------------------------------------------------------------------
    // FUNCIONES

    // Función para inicializar el juego
    const inicializarJuego = (numJugadores = 2) => {
        console.clear();

        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
    }

    // ---------------------------------------------------------------------------------------------------------------
    
    // Función para crear un nuevo deck
    const crearDeck = () => {

        deck = [];

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }

        return _.shuffle(deck);
    }

    // ---------------------------------------------------------------------------------------------------------------

    // Función para tomar una carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

        return deck.pop();
    }

    // ---------------------------------------------------------------------------------------------------------------

    // Función para obtener el valor de una carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;

    }

    // ---------------------------------------------------------------------------------------------------------------

    // Turno: 0 -> Primer jugador. Último -> Computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    // ---------------------------------------------------------------------------------------------------------------

    // Función para crear una carta y mostrarla según el jugador
    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    // ---------------------------------------------------------------------------------------------------------------

    // Función para determinar el ganador según los puntos
    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                console.warn('Empate');
                alert('Empate');
            } else if (puntosMinimos > 21) {
                console.warn('Computadora gana');
                alert('Computadora gana');
            } else if (puntosComputadora > 21) {
                console.warn('Jugador gana');
                alert('Jugador gana');
            } else {
                console.warn('Computadora gana');
                alert('Computadora gana');
            }
        }, 50);
    }

    // ---------------------------------------------------------------------------------------------------------------

    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }

    // ---------------------------------------------------------------------------------------------------------------
    // EVENTOS

    // Botón para pedir carta para el jugador
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        btnDetener.disabled = false;

        if (puntosJugador > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    // ---------------------------------------------------------------------------------------------------------------

    // Botón para detener el juego y determinar el ganador
    btnDetener.addEventListener('click', () => {
        turnoComputadora(puntosJugadores[0]);
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    });

    // ---------------------------------------------------------------------------------------------------------------

    // Botón para iniciar un nuevo juego
    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });

    // ---------------------------------------------------------------------------------------------------------------

    // Retorno del módulo
    return {
        init: inicializarJuego
    };

    // ---------------------------------------------------------------------------------------------------------------

})();