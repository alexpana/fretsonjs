var Fretson = new function () {

    this.version = [1, 0, 0];

    this.guitarTunings = {
        standard: ["E2", "A2", "D3", "G3", "B3", "E4"],
        dropD: ["D2", "A2", "D3", "G3", "B3", "E4"],
        dropC: ["C2", "G2", "C3", "F3", "A3", "D4"]
    };

    this.notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    this.scales = {
        major: {intervals: [0, 2, 2, 1, 2, 2, 2, 1]},
        minor: {intervals: [0, 2, 1, 2, 2, 1, 2, 2]},
        chromatic: {intervals: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
    };

    this.scaleModes = {
        ionian: {offset: 0, intervals: [0, 2, 2, 1, 2, 2, 2, 1]},
        dorian: {offset: 1, intervals: [0, 2, 1, 2, 2, 2, 1, 2]},
        phrygian: {offset: 2, intervals: [0, 1, 2, 2, 2, 1, 2, 2]},
        lydian: {offset: 3, intervals: [0, 2, 2, 2, 1, 2, 2, 1]},
        mixolydian: {offset: 4, intervals: [0, 2, 2, 1, 2, 2, 1, 2]},
        aeolian: {offset: 5, intervals: [0, 2, 1, 2, 2, 1, 2, 2]},
        locrian: {offset: 6, intervals: [0, 1, 2, 2, 1, 2, 2, 2]}
    };

    this.intervals = {
        0: {name: "root", alternateNames: ["perfect-unison"], short: "R", distance: 0},
        1: {name: "minor-second", alternateNames: [], short: "2m", distance: 1},
        2: {name: "major-second", alternateNames: [], short: "2M", distance: 2},
        3: {name: "minor-third", alternateNames: [], short: "3m", distance: 3},
        4: {name: "major-third", alternateNames: [], short: "3M", distance: 4},
        5: {name: "perfect-fourth", alternateNames: [], short: "4", distance: 5},
        6: {name: "augmented-fourth", alternateNames: [], short: "4a", distance: 6},
        7: {name: "perfect-fifth", alternateNames: [], short: "5", distance: 7},
        8: {name: "minor-sixth", alternateNames: [], short: "6m", distance: 8},
        9: {name: "major-sixth", alternateNames: [], short: "6M", distance: 9},
        10: {name: "minor-seventh", alternateNames: [], short: "7m", distance: 10},
        11: {name: "major-seventh", alternateNames: [], short: "7M", distance: 11},
        12: {name: "octave", alternateNames: [], short: "R", distance: 12}
    };

    this.noteNames = {A: "La", B: "Si", C: "Do", D: "Re", E: "Mi", F: "Fa", G: "Sol"};

    this.chords = {
        major: {intervals: [0, 4, 7]},
        minor: {intervals: [0, 3, 7]},
        major7: {intervals: [0, 4, 7, 11]},
        majorMinor7: {intervals: [0, 3, 7, 11]},
        minor7: {intervals: [0, 3, 7, 10]},
        power: {intervals: [0, 7]}
    };

    this.SEMITONES_IN_OCTAVE = 12;

    this.notesInChord = function (rootNote, chordStr) {
        return this.notesFromIntervals(rootNote, fretson.chords[chordStr].intervals);
    };

    this.notesInScale = function (rootNoteStr, scaleStr) {
        var scaleIntervals = this.scales[scaleStr].intervals;

        var currentNote = this.__noteStandardForm(rootNoteStr);
        var notes = [currentNote];

        scaleIntervals.forEach(function (interval) {
            var nextNote = fretson.addSemitones(currentNote, interval);
            notes.push(nextNote);
            currentNote = nextNote;
        });

        return notes;
    };

    this.notesInScaleMode = function (rootNoteStr, mode) {
        var scaleMode = this.scaleModes[mode];
        var intervals = scaleMode.intervals;

        var currentNote = this.__noteStandardForm(this.notesInScale(rootNoteStr, "major")[scaleMode.offset]);
        var notes = [currentNote];

        intervals.forEach(function (interval) {
            var nextNote = fretson.addSemitones(currentNote, interval);
            notes.push(nextNote);
            currentNote = nextNote;
        });

        return notes;
    };

    this.notesFromIntervals = function (rootNote, intervals) {
        return intervals.map(function (interval) {
            return rootNote.addSemitones(interval);
        });
    };

    this.generateNotesFromIntervals = function (rootNoteStr, intervals, count) {
        if (count <= 0) {
            return [];
        }

        var lastNote = this.__noteStandardForm(rootNoteStr);
        var result = [lastNote];

        for (var i = 0; i < count - 1; ++i) {
            var intervalDistance = intervals[i % intervals.length];
            lastNote = this.addSemitones(lastNote, intervalDistance);
            result.push(lastNote);
        }

        return result;
    };

    this.intervalName = function (intervalLength) {
        return this.intervals[intervalLength % 12].name;
    };

    this.noteFromInterval = function (rootNoteStr, noteStr) {
        var note = new this.Note(noteStr);
        note.interval.root = new this(rootNoteStr);
        note.interval.distance = Fretson.semitonesTo(rootNoteStr, noteStr);
        return note;
    };

    this.noteFromNameAndOctave = function (name, octave) {
        var note = new this.Note();
        note.name = name;
        note.octave = octave;
        return note;
    };

    /**
     * Returns true if the note string representation noteStr contains an octave number.
     */
    this.__noteHasOctave = function (noteStr) {
        return !Number.isNaN(Number.parseInt(noteStr[noteStr.length - 1]));
    };

    /**
     * Returns the octave of a note if specified, or
     * else returns the default_octave parameter value.
     */
    this.__noteOctave = function (noteStr, default_octave) {
        default_octave = default_octave || 4;
        return Number.parseInt(noteStr[noteStr.length - 1]) || default_octave;
    };

    /**
     * Returns the name of a note represented by a string or an object
     */
    this.__noteName = function (noteStr) {
        if (noteStr == undefined) {
            return undefined;
        }

        if (typeof noteStr === "string") {
            var name = "";
            if (this.__noteHasOctave(noteStr)) {
                name = noteStr.substr(0, noteStr.length - 1);
            } else {
                name = noteStr;
            }

            if (this.notes.indexOf(name) == -1) {
                throw new Error("Invalid note name \"" + name + "\"");
            } else {
                return name;
            }
        }

        if (typeof noteStr === "object") {
            return noteStr.name;
        }

        return undefined;
    };

    this.note = function (noteStr) {
        return new Note(this.__noteName(noteStr), this.__noteOctave(noteStr));
    };
}();

var Note = function (name, octave) {

    this.name = name;

    this.octave = octave;

    this.nextNote = function () {
        if (this.name == "B") {
            return new Note("C", this.octave + 1);
        }

        return new Note(
            Fretson.notes[Fretson.notes.indexOf(this.name) + 1],
            this.octave);
    };

    this.semitonesTo = function (otherNote) {
        var octaveDistance = otherNote.octave - this.octave;
        var semitonesDistance = Fretson.notes.indexOf(otherNote.name) - Fretson.notes.indexOf(this.name);

        return Fretson.SEMITONES_IN_OCTAVE * octaveDistance + semitonesDistance;
    };

    /**
     * Returns a description for the note that is semitones apart from the noteStr.
     */
    this.addSemitones = function (semitones) {
        var octaveDistance = Number.parseInt(semitones / 12);
        var noteDistance = semitones % 12;

        var noteIndex = Fretson.notes.indexOf(this.name);

        if (noteIndex + noteDistance >= 12) {
            noteDistance -= 12;
            octaveDistance += 1;
        }

        return new Note(Fretson.notes[noteIndex + noteDistance], this.octave + octaveDistance);
    };

    this.equals = function (other) {
        return this.name == other.name && this.octave == other.octave;
    };

    /**
     * Joins the name and the octave of a note into a string representation.
     */
    this.toString = function () {
        return this.name + this.octave;
    };
};

Fretson.Note = Note;

if (typeof module !== 'undefined' && module.exports != null) {
    module.exports = Fretson;
}
