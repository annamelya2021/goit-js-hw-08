import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY = 'videoplayer-current-time';

const onPlay = function (data) {
  const time = data.seconds;
  localStorage.setItem(KEY, time);
};

player.on('play', throttle(onPlay, 1000));

const getStorageData = localStorage.getItem(KEY);
if (getStorageData) {
  player.setCurrentTime(getStorageData);
}
