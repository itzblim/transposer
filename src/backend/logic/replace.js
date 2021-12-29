// Provides function for replacing chords in a webpage

// Regular expression used for finding chords
const regex = /\b(A|B|C|D|E|F|G)(|b|#)(|m|M|maj|Maj)(|dim)(|add)(|M)(|2|4|6|7|9|11|13)(|sus(|2|4))(|b5)(?![A-Za-z0-9#])/g

// Elements to search through
const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, caption, span, a');

// Initialize offset and keySelect for every new page visited
let offset = 0;
let keySelect = -1;

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
    if (keySelect !== -1) {
        keySelect = (keySelect + semitones + 24) % 12;
    }
}

// Increase key by 1 semitone
function increaseKey() {
    replaceChords(1);
}

// Decrease key by 1 semitone
function decreaseKey() {
    replaceChords(-1);
}

// Reset key to original on webpage
function resetKey() {
    replaceChords(-offset);
}

// If original key is not set, set to current selection
// If previous key was chosen, tranpose by the difference between new and old
function selectKey(key) {
    if (keySelect == -1) {
        keySelect = key;
        chrome.runtime.sendMessage({
            subject: 'removeDefaultSelector'
        }, function (response) {
            console.log(response.data);
        });
    } else {
        replaceChords(key - keySelect);
    }
}
