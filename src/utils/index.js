export const getWelcomeConsole = () => {
    console.log('%c這是什麼!? https://www.youtube.com/watch?v=dQw4w9WgXcQ','color: red; font-size: 18px;');
}
 //取得隨機亂數
export const getRandomNum = (shop) => {
  // 陣列的最大、小值
  let max = shop.length - 1;
  let min = 0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}