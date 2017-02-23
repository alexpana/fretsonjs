/**
 * To be called from http://www.all-guitar-chords.com/guitar_scales.php
 * NB: this makes 110+ requests to the all-guitar-chords.com server, one for each scale. DO NOT ABUSE!
 *
 * @param callback function to be called with a map of all the scales present on the website.
 */
scrape_scales = function (callback) {
    promises = [];
    scale_names = document.querySelectorAll('#forum_main > table:nth-child(8) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(4) > select:nth-child(3) > option');
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
