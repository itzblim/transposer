// Provides the transpose function for transposing chords

// Array of chords
const chords = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];

// Gets offsets from flats and sharps
function getAccidentalOffset(chord) {
    return chord.length <= 1
        ? 0
        : chord.charAt(1) == 'b'
            ? -1
            : chord.charAt(1) == '#'
                ? 1
                : 0;
}

// Gets offsets from starting notes (excluding accidentals)
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

// Retrieves chord name from semitone offset
function getChordFromOffset(offset) {
    return chords[(offset + 24) % 12];
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
};
