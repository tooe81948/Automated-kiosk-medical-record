let recognizing = true;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || 
    window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'th-TH';
recognition.continuous = true;
recognition.interimResults = true;
recognition.maxAlternatives = 2;

async function recog_Event() {
    return new Promise((resolve, reject) => {
        let finalText = '';
        recognition.addEventListener('result', function(event) {
            const texts = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript);
            if (event.results[0].isFinal) {
                finalText = texts[texts.length-1];
            }
        });
        recognition.addEventListener('end', () => {
            resolve(finalText);
        });
    });
}

function STT(){
    if(recognizing){
        recognition.start();
        document.getElementById("Text_Start_MIC").innerHTML = "STOP"
        recognizing = false;
    }
    else if(recognizing === false){
        recognition.stop();
        recog_Event().then((finalText) => {
            document.getElementById("Text_Start_MIC").innerHTML = "START" 
            console.log(finalText)
            var s = Date.now();
            console.log(s)
            predict_asdserve(finalText,s);
            recognizing = true;  
        });
    }
}
