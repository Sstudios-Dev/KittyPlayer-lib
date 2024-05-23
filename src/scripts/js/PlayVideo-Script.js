const video = document.getElementById('video');
const playPauseBtn = document.getElementById('playPause');
const progress = document.getElementById('progress');
const time = document.getElementById('time');
const pauseIcon = document.getElementById('pauseIcon');
const fullscreenBtn = document.getElementById('fullscreen');
const videoContainer = document.getElementById('videoContainer');
const controls = document.getElementById('controls');
const volumeUpBtn = document.getElementById('volumeUp');
const volumeDownBtn = document.getElementById('volumeDown');
const volumeIcon = document.getElementById('volumeIcon');

playPauseBtn.addEventListener('click', togglePlayPause);
video.addEventListener('click', togglePlayPause);
video.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', setVideoProgress);
fullscreenBtn.addEventListener('click', toggleFullscreen);
videoContainer.addEventListener('mousemove', showControls);
volumeUpBtn.addEventListener('click', increaseVolume);
volumeDownBtn.addEventListener('click', decreaseVolume);

let hideControlsTimeout;

function togglePlayPause() {
    if (video.paused || video.ended) {
        video.play();
        playPauseBtn.textContent = 'Pause';
        pauseIcon.classList.remove('active');
    } else {
        video.pause();
        playPauseBtn.textContent = 'Play';
        pauseIcon.classList.add('active');
    }
}

function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;
    updateTimer();
}

function setVideoProgress() {
    video.currentTime = (progress.value * video.duration) / 100;
}

function updateTimer() {
    const current = formatTime(video.currentTime);
    const duration = formatTime(video.duration);
    time.textContent = `${current} / ${duration}`;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        videoContainer.classList.add('fullscreen');
        videoContainer.requestFullscreen().catch(err => {
            alert(`Error when trying to enter full screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
        videoContainer.classList.remove('fullscreen');
    }
}

function showControls() {
    controls.classList.remove('hidden');
    clearTimeout(hideControlsTimeout);
    hideControlsTimeout = setTimeout(() => {
        controls.classList.add('hidden');
    }, 2000);
}

hideControlsTimeout = setTimeout(() => {
    controls.classList.add('hidden');
}, 2000);

function increaseVolume() {
    if (video.volume < 1) {
        video.volume = Math.min(1, video.volume + 0.1);
        updateVolumeIcon();
    }
}

function decreaseVolume() {
    if (video.volume > 0) {
        video.volume = Math.max(0, video.volume - 0.1);
        updateVolumeIcon();
    }
}

function updateVolumeIcon() {
    if (video.volume === 0) {
        volumeIcon.innerHTML = '&#128263;'; // Mute icon
    } else if (video.volume < 0.5) {
        volumeIcon.innerHTML = '&#128265;'; // Volume down icon
    } else {
        volumeIcon.innerHTML = '&#128266;'; // Volume up icon
    }
}

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    const arrowLeftKeyCode = 37;
    const arrowRightKeyCode = 39;
    const spaceKeyCode = 32;
    const fKeyCode = 70;

    if (event.keyCode === arrowLeftKeyCode) {
        const targetTime = Math.max(0, video.currentTime - 10);
        animateSeek(targetTime);
    } else if (event.keyCode === arrowRightKeyCode) {
        const targetTime = Math.min(video.duration, video.currentTime + 10);
        animateSeek(targetTime);
    } else if (event.keyCode === spaceKeyCode) {
        event.preventDefault();
        togglePlayPause();
    } else if (event.keyCode === fKeyCode) {
        toggleFullscreen();
    }
}

function animateSeek(targetTime) {
    const start = video.currentTime;
    const end = targetTime;
    const duration = Math.abs(end - start);
    const startTime = performance.now();

    function update() {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        video.currentTime = start + (end - start) * easedProgress;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
}


const videoInfo = document.createElement('div');
videoInfo.id = 'videoInfo';
videoInfo.classList.add('hidden');
document.body.appendChild(videoInfo);

const style = document.createElement('style');
style.innerHTML = `
    #videoInfo {
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        z-index: 1000;
        max-width: 300px;
        font-family: Arial, sans-serif;
    }
    #videoInfo.hidden {
        display: none;
    }
    #videoInfo strong {
        display: block;
        margin-bottom: 10px;
        font-size: 16px;
    }
    #videoInfo p {
        margin: 5px 0;
    }
    #videoInfo .section-title {
        margin-top: 10px;
        font-size: 14px;
        text-decoration: underline;
    }
`;
document.head.appendChild(style);

function showVideoInfo(event) {
    event.preventDefault();

    const libraryName = "KittyPlayer Lib";
    const developerName = "Developer: Sstudiosdev";

    const currentTime = formatTime(video.currentTime);
    const duration = formatTime(video.duration);
    const volume = Math.round(video.volume * 100);
    const isPaused = video.paused ? 'Yes' : 'No';

    videoInfo.innerHTML = `
        <strong>Video Player information</strong>
        <p>${libraryName}</p>
        <p>${developerName}</p>
        <div class="section-title">Video Information</div>
        <p><strong>Current Time:</strong> ${currentTime}</p>
        <p><strong>Duration:</strong> ${duration}</p>
        <p><strong>Volume:</strong> ${volume}%</p>
        <p><strong>Paused:</strong> ${isPaused}</p>
    `;

    videoInfo.style.top = `${event.clientY}px`;
    videoInfo.style.left = `${event.clientX}px`;
    videoInfo.classList.remove('hidden');
}

video.addEventListener('contextmenu', showVideoInfo);

document.addEventListener('click', () => {
    videoInfo.classList.add('hidden');
});