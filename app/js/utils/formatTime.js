const pad = num => num < 10 ? `0${num}` : num;

const formatTime = time => {
  let h = time / 3600;
  let m = h > 99 ? 59 : time % 3600 / 60;
  let s = h > 99 ? 59 : time % 60;

  h = Math.min(h, 99);
  [h, m, s] = [h, m, s]
  .map(val => pad(Math.floor(val)));

  return `${h}:${m}:${s}`;
};


export default formatTime;
