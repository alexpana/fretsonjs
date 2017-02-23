exports.fretson = new function () {

    const fretson = this;

    this.version = "1.0.0";

    this.tunings = {
        standard: {name: "Standard", representation: "E-A-D-G-B-E", strings: ["E2", "A2", "D3", "G3", "B3", "E4"]},
        drop_d: {name: "Drop D", representation: "D-A-D-G-B-E", strings: ["D2", "A2", "D3", "G3", "B3", "E4"]},
        double_drop_d: {name: "Double Drop D", representation: "D-A-D-G-B-D", strings: ["D2", "A2", "D3", "G3", "B3", "D4"]},
        d_modal_tuning: {name: "D Modal Tuning", representation: "D-A-D-G-A-D", strings: ["D2", "A2", "D3", "G3", "A3", "D4"]},
        drop_c: {name: "Drop C", representation: "C-G-C-F-A-D", strings: ["C2", "G2", "C3", "F3", "A3", "D4"]},
        drop_b: {name: "Dropped B", representation: "B-F#-B-E-G#-C#", strings: ["B2", "F#2", "B3", "E3", "G#3", "C#4"]},
        drop_a: {name: "Dropped A", representation: "A-E-A-D-F#-A", strings: ["A2", "E2", "A3", "D3", "F#3", "A4"]},
        a_tuning: {name: "A Tuning", representation: "A-D-G-C-E-A", strings: ["A2", "D2", "G3", "C3", "E2", "A4"]},
        eb_tuning: {name: "Eb Tuning", representation: "Eb-Ab-Db-Gb-Bb-Eb", strings: ["Eb2", "Ab2", "Db3", "Gb3", "Bb3", "Eb4"]},
        d_tuning: {name: "D Tuning", representation: "D-G-C-F-A-D", strings: ["D2", "G2", "C3", "F3", "A3", "D4"]},
        db_tuning: {name: "Db Tuning", representation: "Db-Gb-Cb-Fb-Ab-Db", strings: ["Db2", "Gb2", "Cb3", "Fb3", "Ab3", "Db4"]},
        c: {name: "C Tuning", representation: "C-F-Bb-Eb-G-C", strings: ["C2", "F2", "Bb3", "Eb3", "G3", "C4"]},
        b_standard: {name: "B Standard Tuning", representation: "B-E-A-D-F#-B", strings: ["B2", "E2", "A3", "D3", "F#3", "B4"]},
        bb: {name: "Bb Tuning", representation: "Eb-Ab-Db-Gb-Bb-Eb", strings: ["Eb2", "Ab2", "Db3", "Gb3", "Bb3", "Eb4"]},
        g: {name: "G Tuning", representation: "Eb-Ab-Db-Gb-Bb-Eb", strings: ["Eb2", "Ab2", "Db3", "Gb3", "Bb3", "Eb4"]},
        open_a: {name: "Open A Tuning", representation: "E-A-E-A-C#-E", strings: ["E2", "A2", "E3", "A3", "C#3", "E4"]},
        open_c: {name: "Open C Tuning", representation: "C-G-C-G-C-E", strings: ["C2", "G2", "C3", "G3", "C3", "E4"]},
        open_d: {name: "Open D Tuning", representation: "D-A-D-F#-A-D", strings: ["D2", "A2", "D3", "F#3", "A3", "D4"]},
        open_db: {name: "Open Db Tuning", representation: "Db-Ab-Db-F-Ab-Db", strings: ["Db2", "Ab2", "Db3", "F3", "Ab3", "Db4"]},
        open_e: {name: "Open E Tuning", representation: "E-B-E-G#-B-E", strings: ["E2", "B2", "E3", "G#3", "B3", "E4"]},
        open_f: {name: "Open F Tuning", representation: "F-A-C-F-C-F", strings: ["F2", "A2", "C3", "F3", "C3", "F4"]},
        open_g: {name: "Open G Tuning", representation: "D-G-D-G-B-D", strings: ["D2", "G2", "D3", "G3", "B3", "D4"]},
        six_string_bass: {name: "6-string Bass", representation: "B-E-A-D-G-C", strings: ["B2", "E2", "A3", "D3", "G3", "C4"]},

    };

    this.ordered_notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    this.all_notes = {
        "C": 0, "C#": 1, "Db": 1, "D": 2, "D#": 3, "Eb": 3, "E": 4, "E#": 4, "Fb": 4, "F": 5, "F#": 6,
        "Gb": 6, "G": 7, "G#": 8, "Ab": 8, "A": 9, "A#": 10, "Bb": 10, "B": 11, "Cb": 11
    };

    this.scales = {
        major: {intervals: [0, 2, 4, 5, 7, 9, 11, 12]},
        minor: {intervals: [0, 2, 3, 5, 7, 8, 10, 12]},
        chromatic: {intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
    };

    this.scaleModes = {
        ionian: {offset: 0, intervals: [0, 2, 4, 5, 7, 9, 11]},
        dorian: {offset: 1, intervals: [0, 2, 3, 5, 7, 9, 10]},
        phrygian: {offset: 2, intervals: [0, 1, 3, 5, 7, 8, 10]},
        lydian: {offset: 3, intervals: [0, 2, 4, 6, 7, 9, 11]},
        mixolydian: {offset: 4, intervals: [0, 2, 4, 5, 7, 9, 10]},
        aeolian: {offset: 5, intervals: [0, 2, 3, 5, 7, 8, 10]},
        locrian: {offset: 6, intervals: [0, 1, 3, 5, 6, 8, 10]}
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

    //noinspection JSUnusedGlobalSymbols
    this.noteName = {A: "La", B: "Si", C: "Do", D: "Re", E: "Mi", F: "Fa", G: "Sol"};

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
        return this.notesFromIntervals(rootNote, this.chords[chordStr].intervals);
    };

    //noinspection JSUnusedGlobalSymbols
    this.notesInScale = function (rootNote, scaleStr) {
        return this.notesFromIntervals(rootNote, this.scales[scaleStr].intervals);
    };

    //noinspection JSUnusedGlobalSymbols
    this.notesInScaleMode = function (rootNote, mode) {
        return this.notesFromIntervals(rootNote, this.scaleModes[mode].intervals);
    };

    this.notesFromIntervals = function (rootNote, intervals) {
        return intervals.map(function (interval) {
            return rootNote.addSemitones(interval);
        });
    };

    this.__intervalName = function (intervalLength) {
        return this.intervals[intervalLength].name;
    };

    this.note = function (noteStr) {
        return new this.Note(this.__noteName(noteStr), this.__noteOctave(noteStr));
    };

    /**
     * Returns true if the rootNote string representation noteStr contains an octave number.
     */
    this.__noteHasOctave = function (noteStr) {
        return !Number.isNaN(Number.parseInt(noteStr[noteStr.length - 1]));
    };

    /**
     * Returns the octave of a rootNote if specified, or
     * else returns the default_octave parameter value.
     */
    this.__noteOctave = function (noteStr, default_octave) {
        default_octave = default_octave || 4;
        return Number.parseInt(noteStr[noteStr.length - 1]) || default_octave;
    };

    /**
     * Returns the name of a rootNote represented by a string or an object
     */
    this.__noteName = function (noteStr) {
        if (noteStr == undefined) {
            return undefined;
        }

        if (typeof noteStr === "string") {
            let name = "";
            if (this.__noteHasOctave(noteStr)) {
                name = noteStr.substr(0, noteStr.length - 1);
            } else {
                name = noteStr;
            }

            if (typeof(this.all_notes[name]) === 'undefined') {
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

    this.Note = function (name, octave) {

        this.name = name;

        this.octave = octave;

        this.nextNote = function () {
            if (this.name == "B") {
                return new fretson.Note("C", this.octave ? this.octave + 1 : this.octave);
            }

            return new fretson.Note(
                fretson.ordered_notes[fretson.all_notes[this.name] + 1],
                this.octave);
        };

        this.semitonesTo = function (otherNote) {
            let octaveDistance = 0;
            if (otherNote.octave && this.octave) {
                octaveDistance = otherNote.octave - this.octave;
            }

            const semitonesDistance = fretson.all_notes[otherNote.name] - fretson.all_notes[this.name];

            return fretson.SEMITONES_IN_OCTAVE * octaveDistance + semitonesDistance;
        };

        /**
         * Returns a description for the rootNote that is semitones apart from the noteStr.
         */
        this.addSemitones = function (semitones) {
            let octaveDistance = Number.parseInt(semitones / 12);
            let noteDistance = semitones % 12;
            const noteIndex = fretson.ordered_notes.indexOf(this.name);

            if (noteIndex + noteDistance >= 12) {
                noteDistance -= 12;
                octaveDistance += 1;
            }

            return new fretson.Note(fretson.ordered_notes[noteIndex + noteDistance], this.octave + octaveDistance);
        };

        //noinspection JSUnusedGlobalSymbols
        this.equals = function (other) {
            return this.name == other.name && this.octave == other.octave;
        };

        /**
         * Joins the name and the octave of a rootNote into a string representation.
         */
        this.toString = function () {
            return this.name + this.octave;
        };
    };
}();
