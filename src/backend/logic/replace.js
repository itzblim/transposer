// Provides function for replacing chords in a webpage

// Regular expression used for finding chords
const regex = /\b(A|B|C|D|E|F|G)(|b|#)(|m|M|maj|Maj)(|dim)(|add)(|M)(|2|4|6|7|9|11|13)(|sus(|2|4))(|b5)(?![A-Za-z0-9#])/g

// Elements to search through
const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, caption, span, a');

// Replaces chords by transposing them by a number of semitones
function replaceChords(semitones) {
    for(let i = 0; i < elements.length; i++){
        elements[i].innerHTML = elements[i].innerHTML.replace(regex, function(chord) {
            return transpose(chord, semitones);
        });
    }
}
