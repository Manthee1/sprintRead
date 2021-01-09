setup = document.querySelector('setup');
read = document.querySelector('read');
footer = document.querySelector('footer');
footer_text = document.querySelector('footer > text');

read_display_text = document.querySelector('read_display > text');
text_input = document.querySelector('.text_input');

wpm = 200;
setWordScreenTime = () => {
    wordScreenTime = (60 / wpm) * 1000; //(sec / wpm ) * 1000  - to convert it onto milliseconds
}


text_input.addEventListener('submit', (event) => {
    event.preventDefault();


    form_data = new FormData(text_input);



    startReading(form_data.get('text'))
});

read.style.display = "none";
async function startReading(text) {
    setup.style.display = "none";
    read.style.display = "flex";
    text.replaceAll('\n', ' ')
    text_array = text.split(' ')
    document.body.focus()
    setWordScreenTime();
    footer_text.innerHTML = text_array.map(x => `<w>${x}</w>`).join(' ')
    for (const word of text_array) {
        if (read.style.display != "flex") break;
        if (word.length > 8) read_display_text.style.fontSize = (200 - word.length) + "%"
        read_display_text.innerHTML = word;
        await delay(wordScreenTime)
    }
    read_display_text.innerHTML = "<span style='font-size:150%' class='redText'>END_</span>"

}

function stopReading() {
    setup.style.display = "";
    read.style.display = "none";
}


function keyControlHandler(event) {
    console.log(event);
    if (read.style.display != "flex") return false;
    if (event.keyCode == 27) { stopReading() } // Escape
    if (event.keyCode == 38 || event.keyCode == 40) {
        wpm > 20 && wpm < 800 && (wpm += -(event.keyCode - 39) * 10) // get either -1 or 1 and 10x time it. clever right?
        setWordScreenTime();
    }
    //up = 38
    //down = 40
    //left = 37
    //right = 39
    //space = 32

}


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