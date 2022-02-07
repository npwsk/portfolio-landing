const player = document.querySelector('.video-player');
const video = player.querySelector('.video-player__video');
const playBtn = player.querySelector('.video-player__play');
const controls = player.querySelector('.controls');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playControl = player.querySelector('.play-btn');
const volumeContainer = player.querySelector('.volume-controls');
const muteControl = player.querySelector('.volume-btn');
const volumeSlider = player.querySelector('.volume-range');
const timerCurrent = player.querySelector('.timer__current-time');
const timerTotal = player.querySelector('.timer__total-time');
const fullscreenBtn = player.querySelector('.fullscreen-btn');
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
    playControl.title = 'Pause (space/k)';
  }
  if (playerState.state === PAUSED) {
    playBtn.classList.add('video-player__play--visible');
    playControl.classList.add('play-btn--paused');
    controls.classList.add('video-player__controls--fixed');
    progress.classList.add('video-player__progress--fixed');
    shadow.classList.add('video-player__shadow--visible');
    playControl.title = 'Play (space/k)';
  }
};

const initVideoTimer = () => {
  timerCurrent.textContent = formatSeconds(0);
  timerTotal.textContent = formatSeconds(video.duration);
};

const updateVolumeBtn = () => {
  if (video.volume && !video.muted) {
    muteControl.classList.remove('volume-btn--muted');
    muteControl.title = 'Mute (m)';
  } else {
    muteControl.classList.add('volume-btn--muted');
    muteControl.title = 'Unmute (m)';
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

const openFullscreen = () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
};

const handleVideoKeys = (e) => {
  switch (e.keyCode) {
    case 32:
    case 75:
      toggleVideoPlay();
      return;
    case 77:
      toggleVideoMute();
      return;
    case 70:
      openFullscreen();
      return;
  }
};

const showVolumeSlider = () => volumeContainer.classList.add('volume-controls--active');
const hideVolumeSlider = () => volumeContainer.classList.remove('volume-controls--active');

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

video.addEventListener('play', (e) => {
  video.focus();
});

video.addEventListener('keydown', handleVideoKeys);

video.addEventListener('volumechange', updateVolumeBtn);

muteControl.addEventListener('click', toggleVideoMute);
muteControl.addEventListener('focus', showVolumeSlider);
muteControl.addEventListener('blur', hideVolumeSlider);
volumeSlider.addEventListener('focus', showVolumeSlider);
volumeSlider.addEventListener('blur', hideVolumeSlider);

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

fullscreenBtn.addEventListener('click', openFullscreen);
