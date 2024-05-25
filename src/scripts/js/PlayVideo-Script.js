const video = document.getElementById('video');
const playPauseBtn = document.getElementById('playPause');
const progress = document.getElementById('progress');
const time = document.getElementById('time');
const pauseIcon = document.getElementById('pauseIcon');
const fullscreenBtn = document.getElementById('fullscreen');
const videoContainer = document.getElementById('videoContainer');
const controls = document.getElementById('controls');
const volumeSlider = document.getElementById('volume');
const volumeIcon = document.getElementById('volumeIcon');
const volumeContainer = document.getElementById('volumeContainer');

playPauseBtn.addEventListener('click', togglePlayPause);
video.addEventListener('click', togglePlayPause);
video.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', setVideoProgress);
fullscreenBtn.addEventListener('click', toggleFullscreen);
videoContainer.addEventListener('mousemove', showControls);
volumeSlider.addEventListener('input', setVolume);
volumeContainer.addEventListener('mouseenter', showVolumeSlider);
volumeContainer.addEventListener('mouseleave', hideVolumeSlider);

let hideControlsTimeout;
let customAlert;

video.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // Prevenir el menú contextual

    const alertElement = document.createElement('div');
    alertElement.className = 'alert';
    alertElement.textContent = 'Right click not allowed';

    document.body.appendChild(alertElement);

    // Mostrar la alerta con la animación de entrada
    alertElement.style.opacity = '1';
    alertElement.style.display = 'block';
    alertElement.style.animation = 'slideIn 0.5s forwards';

    // Programar la ocultación de la alerta después de 2 segundos
    setTimeout(() => {
        alertElement.style.animation = 'slideOut 0.5s forwards';
        setTimeout(() => {
            document.body.removeChild(alertElement);
        }, 500); // Eliminar la alerta después de la animación de salida
    }, 2000); // Ocultar la alerta después de 2 segundos
});


function showVolumeSlider() {
    volumeSlider.style.display = 'block';
}

function hideVolumeSlider() {
    volumeSlider.style.display = 'none';
}

let lastToggleTime = 0;
const toggleDelay = 500;

function togglePlayPause() {
    const now = Date.now();
    if (now - lastToggleTime < toggleDelay) {
        return;
    }

    if (video.paused || video.ended) {
        video.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        pauseIcon.classList.remove('active');
    } else {
        video.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        pauseIcon.classList.add('active');
    }

    lastToggleTime = now;
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

function setVolume() {
    video.volume = volumeSlider.value;
    updateVolumeIcon();
}

function updateVolumeIcon() {
    if (video.volume === 0) {
        volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else if (video.volume < 0.5) {
        volumeIcon.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
        volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
}

document.addEventListener('keydown', handleKeyPress);

let lastSeekTime = 0;
const seekDelay = 500;

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
    const now = Date.now();
    if (now - lastSeekTime < seekDelay) {
        return;
    }

    lastSeekTime = now;

    const start = video.currentTime;
    const end = targetTime;
    const duration = Math.abs(end - start);
    const startTime = performance.now();

    const seekIconClass = end > start ? 'forward' : 'backward';
    const seekIcon = document.getElementById('seekIcon');
    seekIcon.innerHTML = `${end > start ? '>>' : '<<'} ${Math.abs(end - start)}s`;
    seekIcon.classList.add(seekIconClass);
    seekIcon.style.display = 'block';

    function update() {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        video.currentTime = start + (end - start) * easedProgress;

        seekIcon.innerHTML = end > start ? '>>' : '<<';

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            setTimeout(() => {
                seekIcon.style.display = 'none';
                seekIcon.classList.remove(seekIconClass);
            }, 500);
        }
    }

    requestAnimationFrame(update);
}

function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
}