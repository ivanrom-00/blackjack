/**
 * C = Clubs    (Tréboles)
 * D = Diamons  (Diamantes)
 * H = Hearts   (Corazones)
 * S = Spades   (Picas)
 **/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

// Función para crear un nuevo deck
const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for(let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    // console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

crearDeck();

// Función para tomar una carta
const pedirCarta = () => {

    if (deck.length === 0) {
        throw  'No hay cartas en el deck';
    }

    const carta = deck.pop();
    console.log(carta);
    console.log(deck);
    return carta;
}

pedirCarta();