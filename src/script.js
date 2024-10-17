import kaplay from "https://unpkg.com/kaplay@3001.0.0-alpha.20/dist/kaplay.mjs";


kaplay({
    width: 412,
    height: 915,
    letterbox: true,
})



loadSprite("player", "assets/bean.png");

let score = 0;
let speed = 300;
setGravity(1400)

const player = add([
    sprite("player"),
    anchor("bot"),
    pos(200,830),
    area(),
    body(),
]);

add([
    rect(width(), 48),
    outline(4),
    area(),
    pos(0, height() - 40),
    body({ isStatic: true }),
]);

const platform = add([
    rect(100, 50),
    outline(4),
    anchor("top"),
    pos(206, 750),
    body({ isStatic: true }),
]);


onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump()
    }
});

onKeyDown("a", () => {
    player.move(-speed, 0);
})


onKeyDown("d", () => {
    player.move(speed, 0)
})

const scoreLabel = add([
    text(score),
    anchor("center"),
    pos(width() / 2, 100),
    fixed(),
    z(100),
]);


loop(0.5, () => {
    score++;
    scoreLabel.text = score;
})


onUpdate(()=>{
    if (player.pos.y < platform.pos.y) {
    platform.use(area());
    }
});