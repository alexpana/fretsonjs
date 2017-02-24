const assert = require("assert");
const it = require("mocha").it;
const describe = require("mocha").describe;
const fretson = require('./index.js');

describe('Fretson', function () {

    describe("Note", function () {

        describe("constructor", function () {
            it("uses default octave when not specified", function () {
                assert.equal(fretson.note("E").octave, 4);
            });

            it("identifies the note name", function () {
                assert.equal(fretson.note("E").name, "E");
                assert.equal(fretson.note("F#").name, "F#");
                assert.equal(fretson.note("D2").name, "D");
            });

            it("identifies the note octave", function () {
                assert.equal(fretson.note("E1").octave, 1);
                assert.equal(fretson.note("C#1").octave, 1);
                assert.equal(fretson.note("F#3").octave, 3);
                assert.equal(fretson.note("D8").octave, 8);
            });

            it("throws for unknown note names", function () {
                assert.throws(
                    function () {
                        fretson.note("Ed4")
                    });
            });
        });

        describe('nextNote', function () {
            it('handles sharps', function () {
                assert.equal(fretson.note("D").nextNote().toString(), "D#4");
            });

            it('handles natural semitones', function () {
                assert.equal(fretson.note("E").nextNote().toString(), "F4");
            });

            it('handles scale ends', function () {
                assert.equal(fretson.note("B").nextNote().toString(), "C5");
            });
        });

        describe('tunings', function () {
            it('use valid ordered_notes', function () {
                let tunings = Object.keys(fretson.tunings);
                tunings.forEach(function (tuning) {
                    fretson.tunings[tuning].strings.forEach(function (note) {
                        fretson.note(note);
                    })
                });
            });
        });

        describe('semitonesTo', function () {
            it('handles consecutive ordered ordered_notes', function () {
                assert.equal(fretson.note("D").semitonesTo(fretson.note("D#")), 1);
                assert.equal(fretson.note("E").semitonesTo(fretson.note("F")), 1);
            });

            it('handles consecutive unordered ordered_notes', function () {
                assert.equal(fretson.note("D").semitonesTo(fretson.note("C#")), -1);
                assert.equal(fretson.note("E").semitonesTo(fretson.note("D#")), -1);
            });

            it('handles ordered ordered_notes from same scale', function () {
                assert.equal(fretson.note("E").semitonesTo(fretson.note("A")), 5);
                assert.equal(fretson.note("C").semitonesTo(fretson.note("D#")), 3);
                assert.equal(fretson.note("C").semitonesTo(fretson.note("B")), 11);
            });

            it('handles unordered ordered_notes from same scale', function () {
                assert.equal(fretson.note("A").semitonesTo(fretson.note("E")), -5);
                assert.equal(fretson.note("D#").semitonesTo(fretson.note("C")), -3);
                assert.equal(fretson.note("B").semitonesTo(fretson.note("C")), -11);
            });

            it('handles ordered ordered_notes from different scales', function () {
                assert.equal(fretson.note("A2").semitonesTo(fretson.note("E3")), 7);
                assert.equal(fretson.note("A2").semitonesTo(fretson.note("A6")), 48);
                assert.equal(fretson.note("C2").semitonesTo(fretson.note("B3")), 23);
            });

            it('handles unordered ordered_notes from different scales', function () {
                assert.equal(fretson.note("A3").semitonesTo(fretson.note("E2")), -17);
                assert.equal(fretson.note("A6").semitonesTo(fretson.note("A2")), -48);
                assert.equal(fretson.note("C3").semitonesTo(fretson.note("B2")), -1);
            });
        });

        describe('addSemitones', function () {
            it('handles positive semitones with same-octave result', function () {
                assert.equal(fretson.note("E").addSemitones(3).toString(), "G4");
                assert.equal(fretson.note("C").addSemitones(10).toString(), "A#4");
            });

            it('handles negative semitones with same-octave result', function () {
                assert.equal(fretson.note("E").addSemitones(-3).toString(), "C#4");
            });

            it('handles positive semitones with cross-octave result', function () {
                assert.equal(fretson.note("E").addSemitones(15).toString(), "G5");
                assert.equal(fretson.note("C").addSemitones(34).toString(), "A#6");
            });

            it('handles negative semitones with cross-octave result', function () {
                assert.equal(fretson.note("E").addSemitones(-15).toString(), "C#3");
            });
        });
    });

    describe('intervalName', function () {
        it('returns correct interval names', function () {
            assert.equal(fretson.__intervalName(3), "minor-third");
            assert.equal(fretson.__intervalName(10), "minor-seventh");
            assert.equal(fretson.__intervalName(0), "root");
        });
    });

    describe('notesInChord', function () {
        it('works for major chords', function () {
            const notes = fretson.notesInChord(fretson.note("G"), "major");
            const noteNames = notes.map(function (note) {
                return note.toString();
            });
            assert.deepEqual(noteNames, ["G4", "B4", "D5"]);
        });
    });

    describe('notesInScale', function () {
        it('works for Gmaj scale', function () {
            const notes = fretson.notesInScale(fretson.note("G"), "major");
            const noteNames = notes.map(function (note) {
                return note.toString();
            });
            assert.deepEqual(noteNames, ["G4", "A4", "B4", "C5", "D5", "E5", "F#5"]);
        });
    });

    describe('notesInScaleMode', function () {
        it('works for F dorian scale', function () {
            const notes = fretson.notesInScaleMode(fretson.note("A"), "dorian");
            const noteNames = notes.map(function (note) {
                return note.toString();
            });
            assert.deepEqual(noteNames, ["A4", "B4", "C5", "D5", "E5", "F#5", "G5"]);
        });
    });

    describe('Note.equals', function () {
        it('works with name and octave', function () {
            assert.equal(fretson.note("G4").equals(fretson.noteFromObj({name: "G", octave: 4})), true);
            assert.equal(fretson.note("G4").equals(fretson.noteFromObj({name: "D", octave: 4})), false);
            assert.equal(fretson.note("G3").equals(fretson.noteFromObj({name: "G", octave: 3})), true);
            assert.equal(fretson.note("G3").equals(fretson.noteFromObj({name: "G", octave: 2})), false);
        });
    });

    describe('tuningForName', function () {
        it('works', function () {
            assert.equal(fretson.tuningFromName("Drop D"), fretson.tunings.drop_d);
            assert.equal(fretson.tuningFromName("Drop D"), fretson.tunings.drop_d);
        });
    });
});
