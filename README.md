# fretsonjs

Simple music theory library with a focus on guitar. Comes with a CLI tool
for exploring scales and chords.

## Install

Instal the CLI tool using `npm`
```
$ npm install -g fretsonjs
```

## Use examples

Show the composition of a chord on the fretboard (also works with scales and scale modes)
```
$ fretson show chord C# major --fretboard 12 --tuning "Drop D"
.           .           .           .                 :
E |--F--|-----|-----|--G#-|-----|-----|-----|-----|--C#-|-----|-----|-----|
B |-----|--C#-|-----|-----|-----|--F--|-----|-----|--G#-|-----|-----|-----|
G |--G#-|-----|-----|-----|-----|--C#-|-----|-----|-----|--F--|-----|-----|
D |-----|-----|--F--|-----|-----|--G#-|-----|-----|-----|-----|--C#-|-----|
A |-----|-----|-----|--C#-|-----|-----|-----|--F--|-----|-----|--G#-|-----|
D |-----|-----|--F--|-----|-----|--G#-|-----|-----|-----|-----|--C#-|-----|
```

List all available scales
```
$ fretson list-scales
major                         R 2M 3M 4 5 6M 7M
harmonic_minor                R 2M 3m 4 5 6m 7M
melodic_minor_ascending       R 2M 3m 4 5 6M 7M
melodic_minor_descending      R 2M 3m 4 5 6m 7m
chromatic                     R 2m 2M 3m 3M 4 4a 5 6m 6M 7m 7M
whole_tone                    R 2M 3M 4a 6m 7m
major_pentatonic              R 2M 3M 5 6M
minor_pentatonic              R 3m 4 5 7m
pentatonic_blues              R 3m 4 4a 5 7m
pentatonic_neutral            R 2M 4 5 7m
octatonic_h_w                 R 2m 3m 3M 4a 5 6M 7m
octatonic_w_h                 R 2M 3m 4 4a 6m 6M 7M
...
```

Explain the composition of a scale (work in progress)
```
$ fretson explain scale major_pentatonic
intervals: R 2M 3M 5 6M
steps:     w w 3 w 3
```
