const player = document.querySelector('.video-player');
const video = player.querySelector('.video-player__video');
const playButton = player.querySelector('.video-player__button--play');

const playVideo = async () => {
  video
    .play()
    .then(() => player.classList.add('video-player--playing'))
    .then(() => (playButton.title = 'Pause'))
    .catch(() => player.classList.remove('video-player--playing'), (playButton.title = 'Play'));
};

const handlePlayButton = () => {
  if (video.paused) {
    playVideo();
  } else {
    video.pause();
    player.classList.remove('video-player--playing');
    playButton.title = 'Play';
  }
};

playButton.addEventListener('click', handlePlayButton);
