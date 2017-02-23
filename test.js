var assert = require('assert');
var it = require("mocha").it;
var describe = require("mocha").describe;
var fretson = require('./index.js').fretson;

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
                        fretson.note("E#4")
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

        describe('semitonesTo', function () {
            it('handles consecutive ordered notes', function () {
                assert.equal(fretson.note("D").semitonesTo(fretson.note("D#")), 1);
                assert.equal(fretson.note("E").semitonesTo(fretson.note("F")), 1);
            });

            it('handles consecutive unordered notes', function () {
                assert.equal(fretson.note("D").semitonesTo(fretson.note("C#")), -1);
                assert.equal(fretson.note("E").semitonesTo(fretson.note("D#")), -1);
            });

            it('handles ordered notes from same scale', function () {
                assert.equal(fretson.note("E").semitonesTo(fretson.note("A")), 5);
                assert.equal(fretson.note("C").semitonesTo(fretson.note("D#")), 3);
                assert.equal(fretson.note("C").semitonesTo(fretson.note("B")), 11);
            });

            it('handles unordered notes from same scale', function () {
                assert.equal(fretson.note("A").semitonesTo(fretson.note("E")), -5);
                assert.equal(fretson.note("D#").semitonesTo(fretson.note("C")), -3);
                assert.equal(fretson.note("B").semitonesTo(fretson.note("C")), -11);
            });

            it('handles ordered notes from different scales', function () {
                assert.equal(fretson.note("A2").semitonesTo(fretson.note("E3")), 7);
                assert.equal(fretson.note("A2").semitonesTo(fretson.note("A6")), 48);
                assert.equal(fretson.note("C2").semitonesTo(fretson.note("B3")), 23);
            });

            it('handles unordered notes from different scales', function () {
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
            var notes = fretson.notesInChord(fretson.note("G"), "major");
            var noteNames = notes.map(function (note) {
                return note.toString();
            });
            assert.deepEqual(noteNames, ["G4", "B4", "D5"]);
        });
    });
});
