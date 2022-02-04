const player = document.querySelector('.video-player');
const video = player.querySelector('.video-player__video');
const playBtn = player.querySelector('.video-player__play');
const controls = player.querySelector('.controls');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playControl = player.querySelector('.play-btn');
const volumeControl = player.querySelector('.volume-btn');
const volumeRange = player.querySelector('.volume-range');
const poster = player.querySelector('.video-player__poster');
const shadow = player.querySelector('.video-player__shadow');

const INITIAL = 'initial';
const PLAYING = 'playing';
const PAUSED = 'paused';

const playerState = {
  state: INITIAL,
  isMuted: false,
};

const toggleVideoPlay = () => {
  if (video.paused) {
    video.play();
    playerState.state = PLAYING;
  } else {
    video.pause();
    playerState.state = PAUSED;
  }
};

const toggleVideoMute = () => (video.muted = !video.muted);
const hidePoster = () => poster.classList.add('video-player__poster--hidden');

const updatePlayer = () => {
  if (playerState.state === PLAYING) {
    playBtn.classList.remove('video-player__play--visible');
    playControl.classList.remove('play-btn--paused');
    controls.classList.remove('video-player__controls--fixed');
    progress.classList.remove('video-player__progress--fixed');
    shadow.classList.remove('video-player__shadow--visible');
  }
  if (playerState.state === PAUSED) {
    playBtn.classList.add('video-player__play--visible');
    playControl.classList.add('play-btn--paused');
    controls.classList.add('video-player__controls--fixed');
    progress.classList.add('video-player__progress--fixed');
    shadow.classList.add('video-player__shadow--visible');
  }
};

const updateVolumeBtn = () => {
  if (video.volume && !video.muted) {
    volumeControl.classList.remove('volume-btn--muted');
    volumeControl.title = 'Mute';
  } else {
    volumeControl.classList.add('volume-btn--muted');
    volumeControl.title = 'Unmute';
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

poster.addEventListener('click', toggleVideoPlay, { once: true });
poster.addEventListener('click', hidePoster, { once: true });
playBtn.addEventListener('click', hidePoster, { once: true });
playBtn.addEventListener('click', toggleVideoPlay);
playControl.addEventListener('click', toggleVideoPlay);
video.addEventListener('click', toggleVideoPlay);

video.addEventListener('play', updatePlayer);
video.addEventListener('play', progressLoop);
video.addEventListener('pause', updatePlayer);

video.addEventListener('volumechange', updateVolumeBtn);

volumeControl.addEventListener('click', toggleVideoMute);

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
