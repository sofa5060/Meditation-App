const app = () =>{
    const song = document.querySelector('.song')
    const play = document.querySelector('.play')
    const outline = document.querySelector('.moving-outline circle')
    const video = document.querySelector('.vid-container video')

    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    // time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button')
    // lenth of the outline
    const outLineLength = outline.getTotalLength();
    console.log(outLineLength);
    //duration
    let duration = 600;

    outline.style.strokeDasharray = outLineLength;
    outline.style.strokeDashoffset = outLineLength;

    //pick Sounds
    sounds.forEach(sound => {
        sound.addEventListener('click',function(){
            song.src = this.getAttribute('data-sound')
            video.src = this.getAttribute('data-video')
            checkPlaying(song)
        })
    })
    
    //play sound
    play.addEventListener('click',()=>{
        checkPlaying(song)
    })

    // select sound
    timeSelect.forEach(option => {
        option.addEventListener('click',function(){
            duration = this.getAttribute('data-time')
            timeDisplay.textContent =`${Math.floor(duration /60)}:${Math.floor(duration %60)}`
        })
    })

    // stop function
    const checkPlaying = song =>{
        if(song.paused){
            song.play()
            video.play()
            play.src = './svg/pause.svg'
        }else{
            song.pause()
            video.pause()
            play.src ='./svg/play.svg'
        }
    };

    // animate the circle
    song.ontimeupdate = () =>{
        let currentTime = song.currentTime;
        let elapsed = duration - currentTime
        let seconds = Math.floor(elapsed % 60)
        let minutes = Math.floor(elapsed / 60)


        // progress bar
        let progress = outLineLength - (currentTime/duration)* outLineLength
        outline.style.strokeDashoffset = progress;
        // animat the text
        timeDisplay.textContent = `${minutes}:${seconds}`
        if(currentTime  > duration){
            song.pause();
            song.currentTime = 0;
            parseFloat.src ='./svg/play.svg'
            video.pause()
        }
    }
}

app();