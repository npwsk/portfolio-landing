const player = document.querySelector('.video-player');
const video = player.querySelector('.video-player__video');
const playBtn = player.querySelector('.video-player__play');
const controls = player.querySelector('.controls');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playControl = player.querySelector('.play-btn');
const volumeControl = player.querySelector('.volume-btn');
const volumeSlider = player.querySelector('.volume-range');
const timerCurrent = player.querySelector('.timer__current-time');
const timerTotal = player.querySelector('.timer__total-time');
const poster = player.querySelector('.video-player__poster');
const shadow = player.querySelector('.video-player__shadow');

const INITIAL = 'initial';
const PLAYING = 'playing';
const PAUSED = 'paused';

const playerState = {
  state: INITIAL,
  isMuted: false,
};

const formatSeconds = (seconds) => {
  return seconds < 3600
    ? new Date(seconds * 1000).toISOString().slice(14, 19)
    : new Date(seconds * 1000).toISOString().slice(11, 19);
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

const initVideoTimer = () => {
  timerCurrent.textContent = formatSeconds(0);
  timerTotal.textContent = formatSeconds(video.duration);
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

const updateVolumeSliderColor = () => {
  const { value, min, max } = volumeSlider;
  const valuePercent = ((value - min) / (max - min)) * 100;

  volumeSlider.style.background =
    'linear-gradient(to right, var(--color-volume-before-thumb) 0%,' +
    'var(--color-volume-before-thumb) ' +
    valuePercent +
    '%, var(--color-volume-after-thumb) ' +
    valuePercent +
    '%, var(--color-volume-after-thumb)';
};

const handleVolumeSliderUpdate = (e) => {
  const { value } = e.target;
  video.volume = value;

  if (value) {
    video.muted = false;
  }

  updateVolumeSliderColor();
};

const scrub = (e) => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

const updateProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
  timerCurrent.textContent = formatSeconds(video.currentTime);
  if (percent === 100) {
    playerState.state = PAUSED;
    updatePlayer();
  }
  requestAnimationFrame(updateProgress);
};

window.addEventListener('load', updateVolumeSliderColor);
video.addEventListener('loadedmetadata', initVideoTimer);

poster.addEventListener('click', toggleVideoPlay, { once: true });
poster.addEventListener('click', hidePoster, { once: true });
playBtn.addEventListener('click', hidePoster, { once: true });
playBtn.addEventListener('click', toggleVideoPlay);
playControl.addEventListener('click', toggleVideoPlay);
video.addEventListener('click', toggleVideoPlay);

video.addEventListener('play', updatePlayer);
video.addEventListener('play', updateProgress);
video.addEventListener('pause', updatePlayer);

video.addEventListener('volumechange', updateVolumeBtn);

volumeControl.addEventListener('click', toggleVideoMute);

let volumeMousedown = false;
volumeSlider.addEventListener('change', handleVolumeSliderUpdate);
volumeSlider.addEventListener('mousemove', (e) => volumeMousedown && handleVolumeSliderUpdate(e));
volumeSlider.addEventListener('mouseup', () => (volumeMousedown = false));
volumeSlider.addEventListener('mousedown', () => (volumeMousedown = true));

let progressMousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => progressMousedown && scrub(e));
progress.addEventListener('mouseup', () => (progressMousedown = false));
progress.addEventListener('mousedown', () => (progressMousedown = true));
