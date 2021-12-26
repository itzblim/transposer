// Elements to search through
const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, caption, span, a');

// Regular expression used for finding chords
const regex = /\b(A|B|C|D|E|F|G)(|b|bb|#|##)(|m|M|maj|Maj)(|dim)(|add)(|M)(|2|4|6|7|9|11|13)(|sus(|2|4))(|b5)(?![A-Za-z0-9#])/g

// Iterate through elements and replace chords
for(let i = 0; i < words.length; i++){
    elements[i].innerHTML = words[i].innerHTML.replace(regex, function(x) {
        return x + '-chord'
    });
}
