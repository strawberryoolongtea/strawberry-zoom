const colors = ["#74ebd5", "#ACB6E5", "#e1eec3", "#f05053"];
const body = document.body;
const topColor = colors[Math.floor(Math.random() * colors.length)];
const bottomColor = colors[Math.floor(Math.random() * colors.length)];
const randomDeg = Math.floor(Math.random() * 180);
body.style.background = `no-repeat linear-gradient(${randomDeg}deg, ${topColor}, ${bottomColor})`;
console.log(body);
