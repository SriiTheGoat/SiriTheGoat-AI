const btn = document.getElementById('button');
const content = document.getElementById('content')
function speak(text){
    const textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 0.8; // Slower speed
    textSpeak.pitch = 1;
    textSpeak.volume = 1;

    // Get UK English voice

    window.speechSynthesis.speak(textSpeak);
}

function WishMe(){
    var day = new Date();
    var hour = day.getHours();

    if(hour >= 0 && hour<12){
        speak("Good Morning, Srijan");
    }
    else if(hour >= 12 && hour<16){
        speak("Good Afternoon, Srijan");
    }
    else if(hour >= 16 && hour<24){
        speak("Good Evening, Srijan");
    }

}

window.addEventListener('load', ()=>{
    speak("Siri The Goat");
    WishMe();
});

const speechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition =new speechRec();


recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener('click', () => {
    content.textContent = "Listening to you..."; // Updated content indication
    recognition.start(); // Start speech recognition
});

function takeCommand(message){
    if(message.includes('hey') || message.includes('hello')){
        speak("What is up Srijan, Bussiness is good?");
    }
    else if(message.includes("open google")){
        window.open("https://google.com", "_blank");
        speak("Opening Google...")
    }
    else if(message.includes("open youtube")){
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...")
    }
    else if(message.includes("open facebook")){
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...")
    }

    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
	    speak(finalText);
  
    }

    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speak(finalText);
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speak(finalText);
    }

    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speak(finalText);
    }

    else if(message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speak(finalText);
    }

    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speak(finalText);
    }
}