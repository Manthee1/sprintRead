setup = document.querySelector('setup');
read = document.querySelector('read');
footer = document.querySelector('footer');
footer_text = document.querySelector('footer > text');

read_display_text = document.querySelector('read_display > text');
text_input = document.querySelector('.text_input');

readingInterval = false;
wpm = 200;
updateWordScreenTime = () => {
    wordScreenTime = ((60 / wpm) * 1000) - 60; //(sec / wpm ) * 1000  - to convert it onto milliseconds
    //- 60 just as a weigh.
}

text_input.addEventListener('submit', (event) => {
    event.preventDefault();
    form_data = new FormData(text_input);
    startReading(form_data.get('text'))
});

read.style.display = "none";
async function startReading(text) {
    pause = false
    setup.style.display = "none";
    read.style.display = "flex";
    document.body.focus()

    text.replaceAll('\n', ' ')
    text_array = text.trim().split(' ')
    footer_text.innerHTML = text_array.map(x => `<w>${x}</w>`).join(' ')
    updateWordScreenTime();
    word = '';
    textArrayIndex = 0;
    setWordDisplay("Press space to start");
}

const mainTimeoutLoop = (start) => {
    if (start) {
        mainTimeoutLoop(false);
        readingInterval = setInterval(() => {
            if (textArrayIndex >= text_array.length - 1) {
                read_display_text.innerHTML = "<span style='font-size:150%' class='redText'>END_</span>"
                mainTimeoutLoop(false);

            } else {
                word = text_array[textArrayIndex];
                setWordDisplay(word);
                if (read.style.display != "flex") mainTimeoutLoop(false);
                textArrayIndex++
                mainTimeoutLoop(true)
            }
        }, wordScreenTime + word.length * 10);
    } else {
        typeof readingInterval == 'number' && clearInterval(readingInterval)
        readingInterval = false
    }
}

function stopReading() {
    setup.style.display = "";
    read.style.display = "none";
}


function setWordDisplay(word) {
    read_display_text.style.fontSize = ''
    if (word.length > 8) {
        read_display_text.style.fontSize = (300 - word.length * 8) + "%";// make sure the text fits te display
    }
    read_display_text.innerHTML = word;
}

document.body.addEventListener('keydown', keyControlHandler = async (event) => {
    if (read.style.display != "flex") return false;
    if (event.keyCode == 27) { stopReading() } // Escape
    else if (event.keyCode == 38 /*up*/ || event.keyCode == 40 /*down*/) {
        wpm > 20 && wpm < 800 && (wpm += -(event.keyCode - 39) * 10) // get either -1 or 1 and 10x time it. clever right?
        updateWordScreenTime();
    }
    else if (event.keyCode == 37 /*left*/ || event.keyCode == 39 /*right*/) {
        (textArrayIndex += event.keyCode - 38)
        if (textArrayIndex < 0) textArrayIndex = 0;
        else if (textArrayIndex > text_array.length - 1) textArrayIndex = text_array.length--;
        if (readingInterval) {
            mainTimeoutLoop(false);
            typeof pauseIn1000 != 'undefined' && clearTimeout(pauseIn1000);
            pauseIn1000 = setTimeout(() => {
                mainTimeoutLoop(true)
            }, 500);
        }

        setWordDisplay(text_array[textArrayIndex])
    }

    else if (event.keyCode == 32 /*space*/) {
        if (readingInterval) mainTimeoutLoop(false)
        else mainTimeoutLoop(true)
    }
});



function delay(timeDelay) {
    timeDelay = timeDelay || 2000;
    return new Promise(done => {
        setTimeout(() => {
            done();
        }, timeDelay);
    });
}





// Settings are gonna be finished later

// settings = {
//     mtw: { text: "Make the things work", value: [1, 2, 3], type: 'radio', css: null, },
//     patch: { text: "Patch bugs", value: true, type: 'checkbox', css: null, },
//     stopWork: { text: "Stop working", value: 0, type: 'value', css: null, },
//     background_color: { text: "Background Color", value: null, type: 'color', css: { variableName: 'background-color', prefix: '', } },
//     color_1: { text: "color-1", value: null, type: 'color', css: { variableName: 'color-1', prefix: '', } },
// }


// settings_container = document.querySelector('settings')

// settings_container.innerHTML = "";
// Object.entries(settings).forEach(x => {
//     let [id, content] = [x[0], x[1]]
//     let inputHTML = "";
//     if (content.type == "radio") {
//         content.value.forEach(x => {
//             inputHTML += `<label for='${id}'></label><input id='#${id}' value='${content.value}' type="${content.type}"></input>`;
//         })
//     } else {
//         inputHTML += `<input id='#${id}' value='${content.value}' type="${content.type}"></input>`;
//     }


//     settings_container.innerHTML +=
//         `
//     <div>
//         <settings_text>${content.text}</settings_text>
//         <setting_input>
//         ${inputHTML}
//         </setting_input>
//     </div>
//     `
// });

//