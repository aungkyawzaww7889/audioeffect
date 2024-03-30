// GET UI 
const head = document.querySelector('.head');
const audioscreen = document.getElementById('audioscreen');
const musicnames = document.getElementById('musicnames');
const imgs = document.querySelector('.imgs');
const progress = document.getElementById('progress'),
    progressbar = document.getElementById('progressbar');

const volumecontrols = document.getElementById('volumecontrols'),
    volumesbtn = document.getElementById('volumesbtn'),
    volumeprogress = document.getElementById('volumeprogress');
const displaytime = document.getElementById('displaytime');

const nextbtn = document.getElementById('next'),
    playbtn = document.getElementById('play'),
    prevbtn = document.getElementById('prev');


let getidx = ["sample1","sample2","sample3"];
let curridx = 0;






// loadmusic(getidx[curridx]);
function loadmusic(audio){
    audioscreen.src = `./libs/${audio}.mp3`;
    imgs.src = `./libs/imgs/${audio}.avif`;
    musicnames.innerText = audio.toUpperCase();
}



function playaudio(){
    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add("fa-pause");
    audioscreen.play();

    head.classList.add('centers');
}




function pauseaudio(){
    playbtn.querySelector('i.fas').classList.remove("fa-pause");
    playbtn.querySelector('i.fas').classList.add("fa-play");
    audioscreen.pause();
    head.classList.remove('centers');

}




function playandpauseaudio(){
    if(audioscreen.paused){
        audioscreen.play();
    }else{
        audioscreen.pause();
    }
}


function nextaudio(){

    curridx++;
    if(curridx > getidx.length-1){
        curridx = 0;
        
    }

    loadmusic(getidx[curridx]);
    playaudio();
    // console.log(curridx);
}


function previousaudio(){
    
    curridx--;
    if(curridx < 0){
        curridx = getidx.length-1;
    }

    loadmusic(getidx[curridx]);
    playaudio();

    // console.log(curridx);
}


function updateprogressbar(e){
    // console.log(e.target);
    // console.log(this);

    // console.log(e.target.duration);
    // console.log(e.target.currentTime);

    const {duration} = e.target;
    const {currentTime} = e.target;

    if(currentTime === 0){
        progressbar.style.width = "0%";
    }else{
        const progresspercent = (currentTime/duration)*100;
        progressbar.style.width = `${progresspercent}%`;
    }


    const mins = Math.floor((duration-currentTime)/60);
    const secs = Math.floor((duration-currentTime)%60);

    const minsvalues = mins.toString().padStart(2,'0');
    const secsvalues = secs.toString().padStart(2,'0');


    displaytime.textContent = `${minsvalues}:${secsvalues}`;
  
}



function progressbarclick(e){
    // console.log(e.target);

    const width = this.clientWidth;
    // console.log(width); //270

    const clientx = e.offsetX;
    // console.log(clientx);

    const getduration = audioscreen.duration
    // console.log(getduration); //217...


    audioscreen.currentTime = (clientx/width) * getduration;
    // console.log(audioscreen.currentTime);
}



function updatevolumes(){
    // console.log("hay");
    volumecontrols.classList.toggle('shows');

}


function getvolumeupdates(){
    // console.log(volumeprogress.value);
    // console.log(audioscreen.volume);

    audioscreen.volume = volumeprogress.value /100;
}



audioscreen.addEventListener('play',playaudio);
audioscreen.addEventListener('pause',pauseaudio);
audioscreen.addEventListener('timeupdate',updateprogressbar);
playbtn.addEventListener('click',playandpauseaudio);
nextbtn.addEventListener('click',nextaudio);
prevbtn.addEventListener("click",previousaudio);
progress.addEventListener('click',progressbarclick);
volumesbtn.addEventListener('click',updatevolumes);
volumeprogress.addEventListener('change',getvolumeupdates);

// sound ended 
audioscreen.addEventListener('ended',nextaudio);
