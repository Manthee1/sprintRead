setup = document.querySelector('setup');
read = document.querySelector('read');

read_display = document.querySelector('read_display');
read_display_text = document.querySelector('read_display > text');
text_input = document.querySelector('.text_input');
text_input_button = document.querySelector('.text_input > input');
text_input.addEventListener('submit', (event) => {
    event.preventDefault();


    form_data = new FormData(text_input);



    startReading(form_data.get('text'))
});

read.style.display = "none";

async function startReading(text) {

    setup.style.display = "none";
    read.style.display = "flex";
    text_array = text.split(' ')
    timeToWait = (60 / 200) * 1000;

    document.querySelector('exit').addEventListener('click', event => {
        event.preventDefault();
        console.log('click');
        stopReading();

    })
    // await delay(4000)

    for (const word of text_array) {
        if (read.style.display != "flex") break;
        console.log(word, word.length);
        if (word.length > 8) read_display_text.style.fontSize = (200 - word.length) + "%"
        read_display_text.innerHTML = word;
        await delay(timeToWait)
    }
    document.querySelector('controls').innerHTML += "end_"

}

function stopReading() {
    setup.style.display = "";
    read.style.display = "none";
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