const player = document.querySelector('.video-player');
const video = player.querySelector('.video-player__video');
const playButton = player.querySelector('.video-player__button--play');
const progress = player.querySelector('.video-player__progress');
const progressBar = player.querySelector('.video-player__progress-filled');

const toggleVideoPlay = () => (video.paused ? video.play() : video.pause());

const updatePlayer = () => {
  if (video.paused) {
    player.classList.remove('video-player--playing');
    playButton.title = 'Play';
  } else {
    player.classList.add('video-player--playing');
    playButton.title = 'Pause';
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
playButton.addEventListener('click', toggleVideoPlay);

video.addEventListener('play', () => requestAnimationFrame(progressLoop));
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mouseup', () => (mousedown = false));
progress.addEventListener('mousedown', () => (mousedown = true));
