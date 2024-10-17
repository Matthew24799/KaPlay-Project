import kaplay from "https://unpkg.com/kaplay@3001.0.0-alpha.20/dist/kaplay.mjs";


kaplay({
    width: 412,
    height: 915,
    letterbox: true,
})



loadSprite("player", "assets/bean.png");

setGravity(1400)

const player = add([
    sprite("player"),
    pos(200,830), 
    anchor("botleft"),
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
    pos(206, 750),
    anchor("topleft"),
    body({ isStatic: true }), 
    "platform",
]);

onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump()
    }
})

onUpdate(()=>{
    if (player.pos.y < platform.pos.y)
    platform.use(area())
    }
    )
});

const scoreLabel = add([
    text(score),
    anchor("center"),
    pos(width() / 2, 100),
    fixed(),
    z(100),
]);

 onUpdate(() => {
    score++;
    scoreLabel.text = score;
 });
