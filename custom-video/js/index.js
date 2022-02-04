const player = document.querySelector('.video-player');
const video = player.querySelector('.video-player__video');
const playButton = player.querySelector('.video-player__play');
const controlsPlayButton = player.querySelector('.video-player__play-btn');
const progress = player.querySelector('.video-player__progress');
const progressBar = player.querySelector('.video-player__progress-filled');
const volumeButton = player.querySelector('.video-player__volume-btn');
const volumeRange = player.querySelector('.video-player__volume-range');

const toggleVideoPlay = () => (video.paused ? video.play() : video.pause());
const toggleVideoMute = () => (video.muted = !video.muted);

const updatePlayer = () => {
  if (video.paused) {
    player.classList.remove('video-player--playing');
    controlsPlayButton.title = 'Play';
  } else {
    player.classList.add('video-player--playing');
    controlsPlayButton.title = 'Pause';
  }
};

const updateVolumeBtn = () => {
  if (video.volume && !video.muted) {
    volumeButton.classList.remove('video-player__volume-btn--muted');
    volumeButton.title = 'Mute';
  } else {
    volumeButton.classList.add('video-player__volume-btn--muted');
    volumeButton.title = 'Unmute';
  }
};

const handleVolumeRangeUpdate = (e) => {
  video.volume = e.target.value;
  if (e.target.value) {
    video.muted = false;
  }
};

const scrub = (e) => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

const progressLoop = () => {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  requestAnimationFrame(progressLoop);
};

video.addEventListener('click', toggleVideoPlay);
video.addEventListener('play', updatePlayer);
video.addEventListener('pause', updatePlayer);
video.addEventListener('play', progressLoop);
video.addEventListener('volumechange', updateVolumeBtn);
playButton.addEventListener('click', toggleVideoPlay);
controlsPlayButton.addEventListener('click', toggleVideoPlay);
volumeButton.addEventListener('click', toggleVideoMute);

let volumeMousedown = false;
volumeRange.addEventListener('change', handleVolumeRangeUpdate);
volumeRange.addEventListener('mousemove', (e) => volumeMousedown && handleVolumeRangeUpdate(e));
volumeRange.addEventListener('mouseup', () => (volumeMousedown = false));
volumeRange.addEventListener('mousedown', () => (volumeMousedown = true));

let progressMousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => progressMousedown && scrub(e));
progress.addEventListener('mouseup', () => (progressMousedown = false));
progress.addEventListener('mousedown', () => (progressMousedown = true));
