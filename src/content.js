// Default number of semitones to transpose
const defaultSemitones = 2;

// Regular expression used for finding chords
const regex = /\b(A|B|C|D|E|F|G)(|b|#)(|m|M|maj|Maj)(|dim)(|add)(|M)(|2|4|6|7|9|11|13)(|sus(|2|4))(|b5)(?![A-Za-z0-9#])/g

// Array of chords
const chords = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

// Function to get offsets from flats and sharps
function getAccidentalOffset(chord) {
    return chord.length <= 1
        ? 0
        : chord.charAt(1) == 'b'
            ? -1
            : chord.charAt(1) == '#'
                ? 1
                : 0;
}

function getNoteOffset(chord) {
    switch (chord.charAt(0)) {
        case 'C':
            return 0;
        case 'D':
            return 2;
        case 'E':
            return 4;
        case 'F':
            return 5;
        case 'G':
            return 7;
        case 'A':
            return 9;
        case 'B':
            return 11;
        default:
            return 0;
    }
}

function getChordFromOffset(offset) {
    return chords[offset % 12];
}

// Function to transpose chords by a semitone
function transpose(chord, semitones) {
    const accidentalOffset = getAccidentalOffset(chord);
    const noteOffset = getNoteOffset(chord);
    const newChord = getChordFromOffset(accidentalOffset + noteOffset + semitones);
    return newChord
        + chord.substring(
            accidentalOffset == 0
                ? 1
                : 2);
}

// Elements to search through
const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, caption, span, a');

// Iterate through elements and replace chords
for(let i = 0; i < elements.length; i++){
    elements[i].innerHTML = elements[i].innerHTML.replace(regex, function(x) {
        return transpose(x, defaultSemitones);
    });
}
