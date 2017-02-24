/**
 * To be called from http://www.all-guitar-chords.com/guitar_scales.php
 * NB: this makes 110+ requests to the all-guitar-chords.com server, one for each scale. DO NOT ABUSE!
 *
 * @param callback function to be called with a map of all the scales present on the website.
 */
scrape_scales = function (callback) {
    let promises = [];
    let scale_names = document.querySelectorAll('#forum_main > table:nth-child(8) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(4) > select:nth-child(3) > option');
    scale_names.slice(0, 5)
        .forEach((option) => {
            let scale = option.innerHTML;
            let url = "http://www.all-guitar-chords.com/guitar_scales.php?scchnam=" + scale.replace(/\s/gi, "+") + "&get2=Get&t=0&choice=1";

            promises.push(fetch(url)
                .then(function (response) {
                    return response.text();
                }));
        });

    scales = {};

    Promise.all(promises).then(values => {
        values.forEach(html => {
            const document = new DOMParser().parseFromString(html, "text/html");
            let scale = document.evaluate('//*[@id="forum_main"]/table[4]/tbody/tr[2]/td[2]/form/table/tbody/tr/td/b', document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML;
            const value = document.evaluate('//*[@id="forum_main"]/table[4]/tbody/tr[2]/td[2]/form/table/tbody/tr/td/text()[2]', document, null, XPathResult.ANY_TYPE, null).iterateNext().data;
            scales[scale] = value;
        });
        callback(scales);
    });
};

// result of running the scraper
let scrape_scales_result = {
    "Major": "1,2,3,4,5,6,7",
    "Harmonic Minor": "1,2,b3,4,5,b6,7",
    "Melodic Minor (Ascending)": "1,2,b3,4,5,6,7",
    "Melodic Minor (Descending)": "1,2,b3,4,5,b6,b7",
    "Chromatic": "1,b2,2,b3,3,4,b5,5,#5,6,b7,7",
    "Whole Tone": "1,2,3,#4,#5,b7",
    "Pentatonic Major": "1,2,3,5,6",
    "Pentatonic Minor": "1,b3,4,5,b7",
    "Pentatonic Blues": "1,b3,4,b5,5,b7",
    "Pentatonic Neutral": "1,2,4,5,b7",
    "Octatonic (H-W)": "1,b2,b3,3,b5,5,6,b7",
    "Octatonic (W-H)": "1,2,b3,4,b5,b6,6,7",
    "Ionian": "1,2,3,4,5,6,7",
    "Dorian": "1,2,b3,4,5,6,b7",
    "Phrygian": "1,b2,b3,4,5,b6,b7",
    "Lydian": "1,2,3,#4,5,6,7",
    "Lydian Augmented": "1,2,3,#4,#5,6,7",
    "Lydian Minor": "1,2,3,#4,5,b6,b7",
    "Lydian Diminished": "1,2,b3,#4,5,6,7",
    "Mixolydian": "1,2,3,4,5,6,b7",
    "Aeolian": "1,2,b3,4,5,b6,b7",
    "Locrian": "1,b2,b3,4,b5,b6,b7",
    "Bebop Major": "1,2,3,4,5,#5,6,7",
    "Bebop Minor": "1,2,b3,3,4,5,6,b7",
    "Bebop Dominant": "1,2,3,4,5,6,b7,7",
    "Bebop Half Diminished": "1,b2,b3,4,b5,5,b6,7",
    "Blues Variation 1": "1,b3,4,b5,5,b7,7",
    "Blues Variation 2": "1,b3,3,4,b5,5,b7,7",
    "Blues Variation 3": "1,b3,3,4,b5,5,6,b7,7",
    "Mixo-Blues": "1,b3,3,4,b5,5,b7",
    "Major Blues Scale": "1,2,b3,3,5,6",
    "Dominant Pentatonic": "1,2,3,5,b7",
    "Chinese 2": "1,2,4,5,6",
    "Hirajoshi 2": "1,3,4,6,7",
    "Iwato": "1,b2,4,b5,b7",
    "Japanese (in sen)": "1,b2,4,5,b7",
    "Kumoi 2": "1,b2,4,5,b6",
    "Pelog 2": "1,b2,b3,5,b7",
    "Locrian 6": "1,b2,b3,4,b5,6,b7",
    "Ionian ": "1,2,3,4,5,6,7",
    "Dorian ": "1,2,b3,4,5,6,b7",
    "Phrygian Major": "1,b2,3,4,5,b6,b7",
    "Lydian ": "1,2,3,#4,5,6,7",
    "Ultralocrian": "1,b2,b3,3,b5,b6,6",
    "Moorish Phrygian": "1,b2,b3,3,4,5,#5,b7,7",
    "Algerian": "1,2,b3,4,#4,5,b6,7",
    "Altered": "1,b2,b3,b4,b5,b6,b7",
    "Arabian (a)": "1,2,b3,4,#4,#5,6,7",
    "Arabian (b)": "1,2,3,4,#4,#5,b7",
    "Augmented": "1,#2,3,#4,#5,7",
    "Auxiliary Diminished": "1,2,b3,4,#4,#5,6,7",
    "Auxiliary Augmented": "1,2,3,#4,#5,#6",
    "Auxiliary Diminished Blues": "1,b2,b3,3,b5,5,6,b7",
    "Balinese": "1,b2,b3,5,b6",
    "Blues": "1,b3,4,#4,5,b7",
    "Byzantine": "1,b2,3,4,5,b6,7",
    "Chinese": "1,3,#4,5,7",
    "Chinese Mongolian": "1,2,3,5,6",
    "Diatonic": "1,2,3,5,6",
    "Diminished": "1,2,b3,4,b5,b6,6,7",
    "Diminished, Half": "1,b2,b3,3,b5,5,6,b7",
    "Diminished,   Whole": "FULL-th pattern",
    "Diminished Whole Tone": "1,b2,b3,3,b5,b6,b7",
    "Dominant 7th": "1,2,3,4,5,6,b7",
    "Double Harmonic": "1,b2,3,4,5,b6,7",
    "Egyptian": "1,2,4,5,b7",
    "Eight Tone Spanish": "1,b2,#2,3,4,b5,b6,b7",
    "Enigmatic": "1,b2,3,#4,#5,#6,7",
    "Ethiopian (A raray)": "1,2,3,4,5,6,7",
    "Ethiopian (Geez ": "FULL-th pattern",
    "Half Diminished (Locrian)": "1,b2,b3,4,b5,b6,b7",
    "Half Diminished ": "FULL-th pattern",
    "Hawaiian": "1,2,b3,4,5,6,7",
    "Hindu": "1,2,3,4,5,b6,b7",
    "Hindustan": "1,2,3,4,5,b6,b7",
    "Hirajoshi": "1,2,b3,5,b6",
    "Hungarian Major": "1,#2,3,#4,5,6,b7",
    "Hungarian Gypsy": "1,2,b3,#4,5,b6,7",
    "Hungarian Gypsy Persian": "1,b2,3,4,5,b6,7",
    "Hungarian Minor": "1,2,b3,#4,5,b6,7",
    "Japanese (A)": "1,b2,4,5,b6",
    "Japanese (B)": "1,2,4,5,b6",
    "Japanese (Ichikosucho)": "1,2,3,4,#4,5,6,7",
    "Japanese (Taishikicho)": "1,2,3,4,#4,5,6,#6,7",
    "Javaneese": "1,b2,b3,4,5,6,b7",
    "Jewish (Adonai Malakh)": "1,b2,2,b3,4,5,6,b7",
    "Jewish (Ahaba Rabba)": "1,b2,3,4,5,b6,b7",
    "Jewish (Magen Abot)": "1,b2,#2,3,#4,#5,#6,7",
    "Kumoi": "1,2,b3,5,6",
    "Leading Whole Tone": "1,2,3,#4,#5,#6,7",
    "Major Locrian": "1,2,3,4,b5,b6,b7",
    "Mohammedan": "1,2,b3,4,5,b6,7",
    "Natural (Pure) Minor": "1,2,b3,4,5,b6,b7",
    "Neopolitan": "1,b2,b3,4,5,b6,7",
    "Neoploitan Major": "1,b2,b3,4,5,6,7",
    "Neopolitan Minor": "1,b2,b3,4,5,b6,b7",
    "Nine Tone Scale": "1,2,#2,3,#4,5,#5,6,7",
    "Oriental (a)": "1,b2,3,4,b5,b6,b7",
    "Oriental (b)": "1,b2,3,4,b5,6,b7",
    "Overtone": "1,2,3,#4,5,6,b7",
    "Overtone Dominant": "1,2,3,#4,5,6,b7",
    "Pelog": "1,b2,b3,5,b6",
    "Persian": "1,b2,3,4,b5,b6,7",
    "Prometheus": "1,2,3,b5,6,b7",
    "Prometheus Neopolitan": "1,b2,3,b5,6,b7",
    "Roumanian Minor": "1,2,b3,#4,5,6,b7",
    "Six Tone Symmetrical": "1,b2,3,4,#5,6",
    "Spanish Gypsy": "1,b2,3,4,5,b6,b7",
    "Super Locrian": "1,b2,#2,3,#4,#5,b7"
};

function semitones_for_interval(interval) {
    let natural_semitones = [0, 2, 4, 5, 7, 9, 11];
    if (interval.length == 2) {
        if (interval[0] == "b") {
            return natural_semitones[Number.parseInt(interval.substr(1)) - 1] - 1;
        }
        if (interval[1] == "b") {
            return natural_semitones[Number.parseInt(interval.substr(0, 1)) - 1] - 1;
        }
        if (interval[0] == "#") {
            return natural_semitones[Number.parseInt(interval.substr(1)) - 1] + 1;
        }
        if (interval[1] == "#") {
            return natural_semitones[Number.parseInt(interval.substr(0, 1)) - 1] + 1;
        }
    } else {
        return natural_semitones[Number.parseInt(interval) - 1];
    }
}

// major: {name: "Major", intervals: [0, 2, 4, 5, 7, 9, 11]},

let scales = {
    major: {
        name: "Major",
        intervals: [0, 2, 4, 5, 7, 9, 11]
    },
    harmonic_minor: {
        name: "Harmonic Minor",
        intervals: [0, 2, 3, 5, 7, 8, 11]
    },
    melodic_minor_ascending: {
        name: "Melodic Minor (Ascending)",
        intervals: [0, 2, 3, 5, 7, 9, 11]
    },
    melodic_minor_descending: {
        name: "Melodic Minor (Descending)",
        intervals: [0, 2, 3, 5, 7, 8, 10]
    },
    chromatic: {
        name: "Chromatic",
        intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    },
    whole_tone: {
        name: "Whole Tone",
        intervals: [0, 2, 4, 6, 8, 10]
    },
    pentatonic_major: {
        name: "Pentatonic Major",
        intervals: [0, 2, 4, 7, 9]
    },
    pentatonic_minor: {
        name: "Pentatonic Minor",
        intervals: [0, 3, 5, 7, 10]
    },
    pentatonic_blues: {
        name: "Pentatonic Blues",
        intervals: [0, 3, 5, 6, 7, 10]
    },
    pentatonic_neutral: {
        name: "Pentatonic Neutral",
        intervals: [0, 2, 5, 7, 10]
    },
    octatonic_h_w: {
        name: "Octatonic (H-W)",
        intervals: [0, 1, 3, 4, 6, 7, 9, 10]
    },
    octatonic_w_h: {
        name: "Octatonic (W-H)",
        intervals: [0, 2, 3, 5, 6, 8, 9, 11]
    },
    ionian: {
        name: "Ionian",
        intervals: [0, 2, 4, 5, 7, 9, 11]
    },
    dorian: {
        name: "Dorian",
        intervals: [0, 2, 3, 5, 7, 9, 10]
    },
    phrygian: {
        name: "Phrygian",
        intervals: [0, 1, 3, 5, 7, 8, 10]
    },
    lydian: {
        name: "Lydian",
        intervals: [0, 2, 4, 6, 7, 9, 11]
    },
    lydian_augmented: {
        name: "Lydian Augmented",
        intervals: [0, 2, 4, 6, 8, 9, 11]
    },
    lydian_minor: {
        name: "Lydian Minor",
        intervals: [0, 2, 4, 6, 7, 8, 10]
    },
    lydian_diminished: {
        name: "Lydian Diminished",
        intervals: [0, 2, 3, 6, 7, 9, 11]
    },
    mixolydian: {
        name: "Mixolydian",
        intervals: [0, 2, 4, 5, 7, 9, 10]
    },
    aeolian: {
        name: "Aeolian",
        intervals: [0, 2, 3, 5, 7, 8, 10]
    },
    locrian: {
        name: "Locrian",
        intervals: [0, 1, 3, 5, 6, 8, 10]
    },
    bebop_major: {
        name: "Bebop Major",
        intervals: [0, 2, 4, 5, 7, 8, 9, 11]
    },
    bebop_minor: {
        name: "Bebop Minor",
        intervals: [0, 2, 3, 4, 5, 7, 9, 10]
    },
    bebop_dominant: {
        name: "Bebop Dominant",
        intervals: [0, 2, 4, 5, 7, 9, 10, 11]
    },
    bebop_half_diminished: {
        name: "Bebop Half Diminished",
        intervals: [0, 1, 3, 5, 6, 7, 8, 11]
    },
    blues_variation_1: {
        name: "Blues Variation 1",
        intervals: [0, 3, 5, 6, 7, 10, 11]
    },
    blues_variation_2: {
        name: "Blues Variation 2",
        intervals: [0, 3, 4, 5, 6, 7, 10, 11]
    },
    blues_variation_3: {
        name: "Blues Variation 3",
        intervals: [0, 3, 4, 5, 6, 7, 9, 10, 11]
    },
    mixo_blues: {
        name: "Mixo-Blues",
        intervals: [0, 3, 4, 5, 6, 7, 10]
    },
    major_blues_scale: {
        name: "Major Blues Scale",
        intervals: [0, 2, 3, 4, 7, 9]
    },
    dominant_pentatonic: {
        name: "Dominant Pentatonic",
        intervals: [0, 2, 4, 7, 10]
    },
    chinese_2: {
        name: "Chinese 2",
        intervals: [0, 2, 5, 7, 9]
    },
    hirajoshi_2: {
        name: "Hirajoshi 2",
        intervals: [0, 4, 5, 9, 11]
    },
    iwato: {
        name: "Iwato",
        intervals: [0, 1, 5, 6, 10]
    },
    japanese_in_sen: {
        name: "Japanese (in sen)",
        intervals: [0, 1, 5, 7, 10]
    },
    kumoi_2: {
        name: "Kumoi 2",
        intervals: [0, 1, 5, 7, 8]
    },
    pelog_2: {
        name: "Pelog 2",
        intervals: [0, 1, 3, 7, 10]
    },
    locrian_6: {
        name: "Locrian 6",
        intervals: [0, 1, 3, 5, 6, 9, 10]
    },
    ionian_: {
        name: "Ionian ",
        intervals: [0, 2, 4, 5, 7, 9, 11]
    },
    dorian_: {
        name: "Dorian ",
        intervals: [0, 2, 3, 5, 7, 9, 10]
    },
    phrygian_major: {
        name: "Phrygian Major",
        intervals: [0, 1, 4, 5, 7, 8, 10]
    },
    lydian_: {
        name: "Lydian ",
        intervals: [0, 2, 4, 6, 7, 9, 11]
    },
    ultralocrian: {
        name: "Ultralocrian",
        intervals: [0, 1, 3, 4, 6, 8, 9]
    },
    moorish_phrygian: {
        name: "Moorish Phrygian",
        intervals: [0, 1, 3, 4, 5, 7, 8, 10, 11]
    },
    algerian: {
        name: "Algerian",
        intervals: [0, 2, 3, 5, 6, 7, 8, 11]
    },
    altered: {
        name: "Altered",
        intervals: [0, 1, 3, 4, 6, 8, 10]
    },
    arabian_a: {
        name: "Arabian (a)",
        intervals: [0, 2, 3, 5, 6, 8, 9, 11]
    },
    arabian_b: {
        name: "Arabian (b)",
        intervals: [0, 2, 4, 5, 6, 8, 10]
    },
    augmented: {
        name: "Augmented",
        intervals: [0, 3, 4, 6, 8, 11]
    },
    auxiliary_diminished: {
        name: "Auxiliary Diminished",
        intervals: [0, 2, 3, 5, 6, 8, 9, 11]
    },
    auxiliary_augmented: {
        name: "Auxiliary Augmented",
        intervals: [0, 2, 4, 6, 8, 10]
    },
    auxiliary_diminished_blues: {
        name: "Auxiliary Diminished Blues",
        intervals: [0, 1, 3, 4, 6, 7, 9, 10]
    },
    balinese: {
        name: "Balinese",
        intervals: [0, 1, 3, 7, 8]
    },
    blues: {
        name: "Blues",
        intervals: [0, 3, 5, 6, 7, 10]
    },
    byzantine: {
        name: "Byzantine",
        intervals: [0, 1, 4, 5, 7, 8, 11]
    },
    chinese: {
        name: "Chinese",
        intervals: [0, 4, 6, 7, 11]
    },
    chinese_mongolian: {
        name: "Chinese Mongolian",
        intervals: [0, 2, 4, 7, 9]
    },
    diatonic: {
        name: "Diatonic",
        intervals: [0, 2, 4, 7, 9]
    },
    diminished: {
        name: "Diminished",
        intervals: [0, 2, 3, 5, 6, 8, 9, 11]
    },
    diminished_half: {
        name: "Diminished, Half",
        intervals: [0, 1, 3, 4, 6, 7, 9, 10]
    },
    diminished_whole_tone: {
        name: "Diminished Whole Tone",
        intervals: [0, 1, 3, 4, 6, 8, 10]
    },
    dominant_7th: {
        name: "Dominant 7th",
        intervals: [0, 2, 4, 5, 7, 9, 10]
    },
    double_harmonic: {
        name: "Double Harmonic",
        intervals: [0, 1, 4, 5, 7, 8, 11]
    },
    egyptian: {
        name: "Egyptian",
        intervals: [0, 2, 5, 7, 10]
    },
    eight_tone_spanish: {
        name: "Eight Tone Spanish",
        intervals: [0, 1, 3, 4, 5, 6, 8, 10]
    },
    enigmatic: {
        name: "Enigmatic",
        intervals: [0, 1, 4, 6, 8, 10, 11]
    },
    ethiopian_a_raray: {
        name: "Ethiopian (A raray)",
        intervals: [0, 2, 4, 5, 7, 9, 11]
    },
    ethiopian_geez: {
        name: "Ethiopian (Geez)",
        intervals: [null]
    },
    half_diminished_locrian: {
        name: "Half Diminished (Locrian)",
        intervals: [0, 1, 3, 5, 6, 8, 10]
    },
    hawaiian: {
        name: "Hawaiian",
        intervals: [0, 2, 3, 5, 7, 9, 11]
    },
    hindu: {
        name: "Hindu",
        intervals: [0, 2, 4, 5, 7, 8, 10]
    },
    hindustan: {
        name: "Hindustan",
        intervals: [0, 2, 4, 5, 7, 8, 10]
    },
    hirajoshi: {
        name: "Hirajoshi",
        intervals: [0, 2, 3, 7, 8]
    },
    hungarian_major: {
        name: "Hungarian Major",
        intervals: [0, 3, 4, 6, 7, 9, 10]
    },
    hungarian_gypsy: {
        name: "Hungarian Gypsy",
        intervals: [0, 2, 3, 6, 7, 8, 11]
    },
    hungarian_gypsy_persian: {
        name: "Hungarian Gypsy Persian",
        intervals: [0, 1, 4, 5, 7, 8, 11]
    },
    hungarian_minor: {
        name: "Hungarian Minor",
        intervals: [0, 2, 3, 6, 7, 8, 11]
    },
    japanese_a: {
        name: "Japanese (A)",
        intervals: [0, 1, 5, 7, 8]
    },
    japanese_b: {
        name: "Japanese (B)",
        intervals: [0, 2, 5, 7, 8]
    },
    japanese_ichikosucho: {
        name: "Japanese (Ichikosucho)",
        intervals: [0, 2, 4, 5, 6, 7, 9, 11]
    },
    japanese_taishikicho: {
        name: "Japanese (Taishikicho)",
        intervals: [0, 2, 4, 5, 6, 7, 9, 10, 11]
    },
    javaneese: {
        name: "Javaneese",
        intervals: [0, 1, 3, 5, 7, 9, 10]
    },
    jewish_adonai_malakh: {
        name: "Jewish (Adonai Malakh)",
        intervals: [0, 1, 2, 3, 5, 7, 9, 10]
    },
    jewish_ahaba_rabba: {
        name: "Jewish (Ahaba Rabba)",
        intervals: [0, 1, 4, 5, 7, 8, 10]
    },
    jewish_magen_abot: {
        name: "Jewish (Magen Abot)",
        intervals: [0, 1, 3, 4, 6, 8, 10, 11]
    },
    kumoi: {
        name: "Kumoi",
        intervals: [0, 2, 3, 7, 9]
    },
    leading_whole_tone: {
        name: "Leading Whole Tone",
        intervals: [0, 2, 4, 6, 8, 10, 11]
    },
    major_locrian: {
        name: "Major Locrian",
        intervals: [0, 2, 4, 5, 6, 8, 10]
    },
    mohammedan: {
        name: "Mohammedan",
        intervals: [0, 2, 3, 5, 7, 8, 11]
    },
    natural_pure_minor: {
        name: "Natural (Pure) Minor",
        intervals: [0, 2, 3, 5, 7, 8, 10]
    },
    neopolitan: {
        name: "Neopolitan",
        intervals: [0, 1, 3, 5, 7, 8, 11]
    },
    neoploitan_major: {
        name: "Neoploitan Major",
        intervals: [0, 1, 3, 5, 7, 9, 11]
    },
    neopolitan_minor: {
        name: "Neopolitan Minor",
        intervals: [0, 1, 3, 5, 7, 8, 10]
    },
    nine_tone_scale: {
        name: "Nine Tone Scale",
        intervals: [0, 2, 3, 4, 6, 7, 8, 9, 11]
    },
    oriental_a: {
        name: "Oriental (a)",
        intervals: [0, 1, 4, 5, 6, 8, 10]
    },
    oriental_b: {
        name: "Oriental (b)",
        intervals: [0, 1, 4, 5, 6, 9, 10]
    },
    overtone: {
        name: "Overtone",
        intervals: [0, 2, 4, 6, 7, 9, 10]
    },
    overtone_dominant: {
        name: "Overtone Dominant",
        intervals: [0, 2, 4, 6, 7, 9, 10]
    },
    pelog: {
        name: "Pelog",
        intervals: [0, 1, 3, 7, 8]
    },
    persian: {
        name: "Persian",
        intervals: [0, 1, 4, 5, 6, 8, 11]
    },
    prometheus: {
        name: "Prometheus",
        intervals: [0, 2, 4, 6, 9, 10]
    },
    prometheus_neopolitan: {
        name: "Prometheus Neopolitan",
        intervals: [0, 1, 4, 6, 9, 10]
    },
    roumanian_minor: {
        name: "Roumanian Minor",
        intervals: [0, 2, 3, 6, 7, 9, 10]
    },
    six_tone_symmetrical: {
        name: "Six Tone Symmetrical",
        intervals: [0, 1, 4, 5, 8, 9]
    },
    spanish_gypsy: {
        name: "Spanish Gypsy",
        intervals: [0, 1, 4, 5, 7, 8, 10]
    },
    super_locrian: {
        name: "Super Locrian",
        intervals: [0, 1, 3, 4, 6, 8, 10]
    }
};