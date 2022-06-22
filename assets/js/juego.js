(() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0;

    let puntosJugadores = [];

    // Referencias de HTML
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');

    // Esta función inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
    }

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

    // Función para tomar una carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

        return deck.pop();
    }

    // Función para obtener el valor de una carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;

    }

    // Turno: 0 -> Primer jugador. Último -> Computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

            // <img class="carta" src="assets/cartas/2C.png" alt="">
            // const imgCarta = document.createElement('img');
            // imgCarta.src = `assets/cartas/${carta}.png`;
            // imgCarta.classList.add('carta');
            // divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                console.warn('Empate');
                alert('Empate');
            } else if (puntosMinimos > 21) {
                console.warn('Computadora');
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

    // Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

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

    btnDetener.addEventListener('click', () => {
        turnoComputadora(puntosJugador);
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    });

    btnNuevo.addEventListener('click', () => {
        console.clear();
        inicializarJuego();

        // deck = [];
        // deck = crearDeck();

        // puntosJugador = 0;
        // puntosComputadora = 0;

        // puntosHTML[0].innerText = 0;
        // puntosHTML[1].innerText = 0;

        // divCartasJugador.innerHTML = '';
        // divCartasComputadora.innerHTML = '';

        // btnPedir.disabled = false;
        // btnDetener.disabled = false;
    });
})();