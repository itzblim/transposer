// Provides function for replacing chords in a webpage

// Regular expression used for finding chords
const regex = /\b(A|B|C|D|E|F|G)(|b|#)(|m|M|maj|Maj)(|dim)(|add)(|M)(|2|4|6|7|9|11|13)(|sus(|2|4))(|b5)(?![A-Za-z0-9#])/g

// Elements to search through
const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, caption, span, a');

// Keep track of offset from original key
let offset = 0;

// Replaces chords by transposing them by a number of semitones
function replaceChords(semitones) {
    offset += semitones;
    if (offset <= -12) {
        offset += 12;
    } else if (offset >= 12) {
        offset -= 12;
    }
    for(let i = 0; i < elements.length; i++){
        elements[i].innerHTML = elements[i].innerHTML.replace(regex, function(chord) {
            return transpose(chord, semitones);
        });
    }
    chrome.storage.sync.set({offset: offset}, function() {
        console.log('Offset is set to ' + offset);
    });
    return offset;
}
