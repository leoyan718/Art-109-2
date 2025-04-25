

let song = document.querySelector("#song");
let playBtn = document.querySelector("#play-button")
let stopBtn = document.querySelector("#stop-button")
let volBtn = document.querySelector("#volume-change")

playBtn.addEventListener('click', function(){
    song.play();
})

song.onloadeddata = function(){
    playBtn.style.visibility = "visible";
    console.log("song loaded")
}

stopBtn.addEventListener('click', function(){
    song.pause();
})

volBtn.addEventListener('click', function(){
    song.volume = 0.1;
})
