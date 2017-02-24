module.exports = new function () {

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

    //noinspection SpellCheckingInspection
    this.scales = {
        major: {name: "Major", intervals: [0, 2, 4, 5, 7, 9, 11]},
        harmonic_minor: {name: "Harmonic Minor", intervals: [0, 2, 3, 5, 7, 8, 11]},
        melodic_minor_ascending: {name: "Melodic Minor (Ascending)", intervals: [0, 2, 3, 5, 7, 9, 11]},
        melodic_minor_descending: {name: "Melodic Minor (Descending)", intervals: [0, 2, 3, 5, 7, 8, 10]},
        chromatic: {name: "Chromatic", intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]},
        whole_tone: {name: "Whole Tone", intervals: [0, 2, 4, 6, 8, 10]},
        major_pentatonic: {name: "Pentatonic Major", intervals: [0, 2, 4, 7, 9]},
        minor_pentatonic: {name: "Pentatonic Minor", intervals: [0, 3, 5, 7, 10]},
        pentatonic_blues: {name: "Pentatonic Blues", intervals: [0, 3, 5, 6, 7, 10]},
        pentatonic_neutral: {name: "Pentatonic Neutral", intervals: [0, 2, 5, 7, 10]},
        octatonic_h_w: {name: "Octatonic (H-W)", intervals: [0, 1, 3, 4, 6, 7, 9, 10]},
        octatonic_w_h: {name: "Octatonic (W-H)", intervals: [0, 2, 3, 5, 6, 8, 9, 11]},
        ionian: {name: "Ionian", intervals: [0, 2, 4, 5, 7, 9, 11]},
        dorian: {name: "Dorian", intervals: [0, 2, 3, 5, 7, 9, 10]},
        phrygian: {name: "Phrygian", intervals: [0, 1, 3, 5, 7, 8, 10]},
        lydian: {name: "Lydian", intervals: [0, 2, 4, 6, 7, 9, 11]},
        lydian_augmented: {name: "Lydian Augmented", intervals: [0, 2, 4, 6, 8, 9, 11]},
        lydian_minor: {name: "Lydian Minor", intervals: [0, 2, 4, 6, 7, 8, 10]},
        lydian_diminished: {name: "Lydian Diminished", intervals: [0, 2, 3, 6, 7, 9, 11]},
        mixolydian: {name: "Mixolydian", intervals: [0, 2, 4, 5, 7, 9, 10]},
        aeolian: {name: "Aeolian", intervals: [0, 2, 3, 5, 7, 8, 10]},
        locrian: {name: "Locrian", intervals: [0, 1, 3, 5, 6, 8, 10]},
        bebop_major: {name: "Bebop Major", intervals: [0, 2, 4, 5, 7, 8, 9, 11]},
        bebop_minor: {name: "Bebop Minor", intervals: [0, 2, 3, 4, 5, 7, 9, 10]},
        bebop_dominant: {name: "Bebop Dominant", intervals: [0, 2, 4, 5, 7, 9, 10, 11]},
        bebop_half_diminished: {name: "Bebop Half Diminished", intervals: [0, 1, 3, 5, 6, 7, 8, 11]},
        blues_variation_1: {name: "Blues Variation 1", intervals: [0, 3, 5, 6, 7, 10, 11]},
        blues_variation_2: {name: "Blues Variation 2", intervals: [0, 3, 4, 5, 6, 7, 10, 11]},
        blues_variation_3: {name: "Blues Variation 3", intervals: [0, 3, 4, 5, 6, 7, 9, 10, 11]},
        mixo_blues: {name: "Mixo-Blues", intervals: [0, 3, 4, 5, 6, 7, 10]},
        major_blues_scale: {name: "Major Blues Scale", intervals: [0, 2, 3, 4, 7, 9]},
        dominant_pentatonic: {name: "Dominant Pentatonic", intervals: [0, 2, 4, 7, 10]},
        chinese_2: {name: "Chinese 2", intervals: [0, 2, 5, 7, 9]},
        hirajoshi_2: {name: "Hirajoshi 2", intervals: [0, 4, 5, 9, 11]},
        iwato: {name: "Iwato", intervals: [0, 1, 5, 6, 10]},
        japanese_in_sen: {name: "Japanese (in sen)", intervals: [0, 1, 5, 7, 10]},
        kumoi_2: {name: "Kumoi 2", intervals: [0, 1, 5, 7, 8]},
        pelog_2: {name: "Pelog 2", intervals: [0, 1, 3, 7, 10]},
        locrian_6: {name: "Locrian 6", intervals: [0, 1, 3, 5, 6, 9, 10]},
        ionian_: {name: "Ionian ", intervals: [0, 2, 4, 5, 7, 9, 11]},
        dorian_: {name: "Dorian ", intervals: [0, 2, 3, 5, 7, 9, 10]},
        phrygian_major: {name: "Phrygian Major", intervals: [0, 1, 4, 5, 7, 8, 10]},
        lydian_: {name: "Lydian ", intervals: [0, 2, 4, 6, 7, 9, 11]},
        ultralocrian: {name: "Ultralocrian", intervals: [0, 1, 3, 4, 6, 8, 9]},
        moorish_phrygian: {name: "Moorish Phrygian", intervals: [0, 1, 3, 4, 5, 7, 8, 10, 11]},
        algerian: {name: "Algerian", intervals: [0, 2, 3, 5, 6, 7, 8, 11]},
        altered: {name: "Altered", intervals: [0, 1, 3, 4, 6, 8, 10]},
        arabian_a: {name: "Arabian (a)", intervals: [0, 2, 3, 5, 6, 8, 9, 11]},
        arabian_b: {name: "Arabian (b)", intervals: [0, 2, 4, 5, 6, 8, 10]},
        augmented: {name: "Augmented", intervals: [0, 3, 4, 6, 8, 11]},
        auxiliary_diminished: {name: "Auxiliary Diminished", intervals: [0, 2, 3, 5, 6, 8, 9, 11]},
        auxiliary_augmented: {name: "Auxiliary Augmented", intervals: [0, 2, 4, 6, 8, 10]},
        auxiliary_diminished_blues: {name: "Auxiliary Diminished Blues", intervals: [0, 1, 3, 4, 6, 7, 9, 10]},
        balinese: {name: "Balinese", intervals: [0, 1, 3, 7, 8]},
        blues: {name: "Blues", intervals: [0, 3, 5, 6, 7, 10]},
        byzantine: {name: "Byzantine", intervals: [0, 1, 4, 5, 7, 8, 11]},
        chinese: {name: "Chinese", intervals: [0, 4, 6, 7, 11]},
        chinese_mongolian: {name: "Chinese Mongolian", intervals: [0, 2, 4, 7, 9]},
        diatonic: {name: "Diatonic", intervals: [0, 2, 4, 7, 9]},
        diminished: {name: "Diminished", intervals: [0, 2, 3, 5, 6, 8, 9, 11]},
        diminished_half: {name: "Diminished, Half", intervals: [0, 1, 3, 4, 6, 7, 9, 10]},
        diminished_whole_tone: {name: "Diminished Whole Tone", intervals: [0, 1, 3, 4, 6, 8, 10]},
        dominant_7th: {name: "Dominant 7th", intervals: [0, 2, 4, 5, 7, 9, 10]},
        double_harmonic: {name: "Double Harmonic", intervals: [0, 1, 4, 5, 7, 8, 11]},
        egyptian: {name: "Egyptian", intervals: [0, 2, 5, 7, 10]},
        eight_tone_spanish: {name: "Eight Tone Spanish", intervals: [0, 1, 3, 4, 5, 6, 8, 10]},
        enigmatic: {name: "Enigmatic", intervals: [0, 1, 4, 6, 8, 10, 11]},
        ethiopian_a_raray: {name: "Ethiopian (A raray)", intervals: [0, 2, 4, 5, 7, 9, 11]},
        ethiopian_geez: {name: "Ethiopian (Geez)", intervals: [null]},
        half_diminished_locrian: {name: "Half Diminished (Locrian)", intervals: [0, 1, 3, 5, 6, 8, 10]},
        hawaiian: {name: "Hawaiian", intervals: [0, 2, 3, 5, 7, 9, 11]},
        hindu: {name: "Hindu", intervals: [0, 2, 4, 5, 7, 8, 10]},
        hindustan: {name: "Hindustan", intervals: [0, 2, 4, 5, 7, 8, 10]},
        hirajoshi: {name: "Hirajoshi", intervals: [0, 2, 3, 7, 8]},
        hungarian_major: {name: "Hungarian Major", intervals: [0, 3, 4, 6, 7, 9, 10]},
        hungarian_gypsy: {name: "Hungarian Gypsy", intervals: [0, 2, 3, 6, 7, 8, 11]},
        hungarian_gypsy_persian: {name: "Hungarian Gypsy Persian", intervals: [0, 1, 4, 5, 7, 8, 11]},
        hungarian_minor: {name: "Hungarian Minor", intervals: [0, 2, 3, 6, 7, 8, 11]},
        japanese_a: {name: "Japanese (A)", intervals: [0, 1, 5, 7, 8]},
        japanese_b: {name: "Japanese (B)", intervals: [0, 2, 5, 7, 8]},
        japanese_ichikosucho: {name: "Japanese (Ichikosucho)", intervals: [0, 2, 4, 5, 6, 7, 9, 11]},
        japanese_taishikicho: {name: "Japanese (Taishikicho)", intervals: [0, 2, 4, 5, 6, 7, 9, 10, 11]},
        javaneese: {name: "Javaneese", intervals: [0, 1, 3, 5, 7, 9, 10]},
        jewish_adonai_malakh: {name: "Jewish (Adonai Malakh)", intervals: [0, 1, 2, 3, 5, 7, 9, 10]},
        jewish_ahaba_rabba: {name: "Jewish (Ahaba Rabba)", intervals: [0, 1, 4, 5, 7, 8, 10]},
        jewish_magen_abot: {name: "Jewish (Magen Abot)", intervals: [0, 1, 3, 4, 6, 8, 10, 11]},
        kumoi: {name: "Kumoi", intervals: [0, 2, 3, 7, 9]},
        leading_whole_tone: {name: "Leading Whole Tone", intervals: [0, 2, 4, 6, 8, 10, 11]},
        major_locrian: {name: "Major Locrian", intervals: [0, 2, 4, 5, 6, 8, 10]},
        mohammedan: {name: "Mohammedan", intervals: [0, 2, 3, 5, 7, 8, 11]},
        natural_pure_minor: {name: "Natural (Pure) Minor", intervals: [0, 2, 3, 5, 7, 8, 10]},
        neopolitan: {name: "Neopolitan", intervals: [0, 1, 3, 5, 7, 8, 11]},
        neoploitan_major: {name: "Neoploitan Major", intervals: [0, 1, 3, 5, 7, 9, 11]},
        neopolitan_minor: {name: "Neopolitan Minor", intervals: [0, 1, 3, 5, 7, 8, 10]},
        nine_tone_scale: {name: "Nine Tone Scale", intervals: [0, 2, 3, 4, 6, 7, 8, 9, 11]},
        oriental_a: {name: "Oriental (a)", intervals: [0, 1, 4, 5, 6, 8, 10]},
        oriental_b: {name: "Oriental (b)", intervals: [0, 1, 4, 5, 6, 9, 10]},
        overtone: {name: "Overtone", intervals: [0, 2, 4, 6, 7, 9, 10]},
        overtone_dominant: {name: "Overtone Dominant", intervals: [0, 2, 4, 6, 7, 9, 10]},
        pelog: {name: "Pelog", intervals: [0, 1, 3, 7, 8]},
        persian: {name: "Persian", intervals: [0, 1, 4, 5, 6, 8, 11]},
        prometheus: {name: "Prometheus", intervals: [0, 2, 4, 6, 9, 10]},
        prometheus_neopolitan: {name: "Prometheus Neopolitan", intervals: [0, 1, 4, 6, 9, 10]},
        roumanian_minor: {name: "Roumanian Minor", intervals: [0, 2, 3, 6, 7, 9, 10]},
        six_tone_symmetrical: {name: "Six Tone Symmetrical", intervals: [0, 1, 4, 5, 8, 9]},
        spanish_gypsy: {name: "Spanish Gypsy", intervals: [0, 1, 4, 5, 7, 8, 10]},
        super_locrian: {name: "Super Locrian", intervals: [0, 1, 3, 4, 6, 8, 10]}
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

    this.notesInScale = function (rootNote, scaleStr) {
        return this.notesFromIntervals(rootNote, this.scales[scaleStr].intervals);
    };

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
        return new Note(this.__noteName(noteStr), this.__noteOctave(noteStr));
    };

    this.noteFromObj = function (noteObject) {
        return new Note(noteObject.name, noteObject.octave || 4);
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

    class Note {
        constructor(name, octave) {
            this.name = name;
            this.octave = octave;
        }

        nextNote() {
            if (this.name == "B") {
                return new Note("C", this.octave ? this.octave + 1 : this.octave);
            }

            return new Note(
                fretson.ordered_notes[fretson.all_notes[this.name] + 1],
                this.octave);
        };

        semitonesTo(otherNote) {
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
        addSemitones(semitones) {
            let octaveDistance = Number.parseInt(semitones / 12);
            let noteDistance = semitones % 12;
            const noteIndex = fretson.ordered_notes.indexOf(this.name);

            if (noteIndex + noteDistance >= 12) {
                noteDistance -= 12;
                octaveDistance += 1;
            }

            return new Note(fretson.ordered_notes[noteIndex + noteDistance], this.octave + octaveDistance);
        };

        equals(other) {
            return this.name == other.name && this.octave == other.octave;
        };

        /**
         * Joins the name and the octave of a rootNote into a string representation.
         */
        toString() {
            return this.name + this.octave;
        };
    }
}();
