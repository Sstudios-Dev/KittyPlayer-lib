# KittyPlayer-lib
KittyPlayer-lib is a library of components for creating modern and customizable video players.

## Installation
You can install KittyPlayer-lib via npm:

```bash
npm i kittyplayer
```

To use KittyPlayer-lib, first ensure you include the library in your project. Then, you can create a KittyPlayer instance and add it to your page:

```html
<link rel="stylesheet" href="/node_modules/kittyplayer/src/components/video/playVideo.css">

<script src="/node_modules/kittyplayer/src/scripts/js/PlayVideo-Script.js"></script>
```

These two files must always be imported so that the library works 100% and does not fail.

### Dependencies

at the moment the library has only one dependency for it to work correctly, which is the icon dependency.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
```

# Components

KittyPlayer-lib includes a variety of components for customizing and enhancing the video playback experience, such as customizable controls, play buttons, progress bars, and more:

## Warning ⚠

adding this is very important to be able to use the library

```html
            <div class="video-container" id="videoContainer">
                <video class="video" id="video" src="test/Path of your video"></video>
                <div class="seek-icon" id="seekIcon"></div>
                <div class="pause-icon" id="pauseIcon">&#10074;&#10074;</div>
                <div class="controls" id="controls">
                    <button class="btn" id="playPause"><i class="fas fa-play"></i></button>
                    <input type="range" id="progress" class="progress" min="0" max="100" value="0">
                    <div class="time" id="time">00:00 / 00:00</div>
                    <div id="volumeContainer" class="volume-container">
                        <input type="range" id="volume" class="volume-slider" min="0" max="1" step="0.01">
                        <div id="volumeIcon" class="volume-icon">
                            <i class="fas fa-volume-up"></i>
                        </div>
                    </div>                                      
                    <button class="btn" id="fullscreen">
                        <i class="fas fa-expand"></i>
                    </button>
                </div>
            </div>
```

# Video Player Components

- `.video-container` (`div`) - Main container of the video player.
  - `.video` (`video`) - Video element.
  - `.seek-icon` (`div`) - Seek icon.
  - `.pause-icon` (`div`) - Pause icon.
  - `.controls` (`div`) - Player controls.
    - `#playPause` (`button`) - Play/pause button.
      - Play/pause icon (`i` with class `fas fa-play`).
    - `#progress` (`input[type="range"]`) - Progress bar.
    - `#time` (`div`) - Elapsed time/duration of the video.
    - `#volumeContainer` (`div`) - Volume container.
      - `#volume` (`input[type="range"]`) - Volume control.
      - `#volumeIcon` (`div`) - Volume icon (`i` with class `fas fa-volume-up`).
    - `#fullscreen` (`button`) - Fullscreen button (`i` with class `fas fa-expand`).
   
## Images

<details>
  <summary>Preview 1</summary>

  ![Image 1](path_to_image_1)
  ![Image 2](path_to_image_2)
</details>

<details>
  <summary>Preview 2</summary>

  ![Image 3](path_to_image_3)
  ![Image 4](path_to_image_4)
</details>

# Contribution

Feel free to contribute to KittyPlayer-lib! You can submit suggestions, report bugs, or add new components through pull requests.

<a href="https://github.com/staFF6773"><img src="https://avatars.githubusercontent.com/u/108166164?v=4" height="128" width="128" /></a>
<a href="https://github.com/Sstudiosdev"><img src="https://avatars.githubusercontent.com/u/149289426?v=4" height="128" width="128" /></a>
