// Shafin Kazi, Alvin Sze, Thamidur Rahman, Sean Takahashi
// Tachyons Guinea Pigs
// SoftDev pd4
// p02
// 2026-01-16f

var dead = false

function update() {
  console.log("pop");

  requestAnimationFrame(update);
}

if (!dead){
  update();
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") endgame();
});

function endgame() {
  console.log("pop1111111111111111111");
  cancelAnimationFrame(update);
  dead = true
}
