import kaplay from "https://unpkg.com/kaplay@3001.0.0-alpha.20/dist/kaplay.mjs";


kaplay({
    width: 412,
    height: 915,
    letterbox: true,
})



loadSprite("player", "assets/bean.png");

//Keeps track of how many platforms have been made after starting.
let platforms = 0;

let score = 0;
let speed = 300;
setGravity(1400)

const player = add([
    sprite("player"),
    anchor("bot"),
    pos(206,830),
    area(),
    body(),
]);

//Ground
add([
    rect(width(), 48),
    outline(4),
    area(),
    pos(0, height() - 40),
    body({ isStatic: true }),
]);

//Starting platform
add([
    rect(100, 25),
    outline(4),
    anchor("top"),
    pos(206, 750),
    body({ isStatic: true }),
    "platform",
]);


onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump()
    }
});

onKeyDown("a", () => {
    player.move(-speed, 0);
});


onKeyDown("d", () => {
    player.move(speed, 0)
});

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
});

//Gives collision to the highest platform if the player goes above it.
onUpdate(()=>{
        if (player.pos.y < get("platform")[platforms].pos.y) {
            get("platform")[platforms].use(area());
            }
});

//Upon landing on a platform, creates a new, higher platform.
//This *does* make new platforms even when landing on lower platforms,
//but that can be fixed later. I'm tired.
player.onCollide("platform", () => {
    const x = rand(50, width() - 50);
    const y = get("platform")[platforms].pos.y - 130;
    platforms++
    add([
        rect(100, 25),
        outline(4),
        anchor("top"),
        pos(x, y),
        body({ isStatic: true }),
        "platform",
    ]);
});