;

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

$(function () {

        var canvas = document.getElementById('dragonParadise');
        //获得 2d 上下文对象
        var ctx = canvas.getContext('2d');

        var bgReady = false;
        var bgImage = renderBG();//渲染背景
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        var speed = 5;

        //霸王龙
        var dragon = {
            prefix: "stay",
            frameNumber: 16,
            x: x,
            y: y,
            index: 1
        };

        //霸王龙向左走
        var dragonRunLeft = {
            prefix: "left",
            frameNumber: 8,
            x: x,
            y: y,
            index: 1
        };

        //霸王龙向右走
        var dragonRunRight = {
            prefix: "right",
            frameNumber: 8,
            x: x,
            y: y,
            index: 1
        };

        //剑龙
        var monsters = [];
        for (var i = 0; i < 4; i++) {
            addMonster();
        }

        //定义所有image对象
        for (idx in monsters) {
            var info = monsters[idx];
            for (var i = 1; i <= info.frameNumber; i++) {
                var imgName = info.prefix + i;
                eval("var " + imgName + "=new Image();  " + imgName + ".src='image/" + imgName + ".png'; ");
            }
        }
        for (var i = 1; i <= dragon.frameNumber; i++) {
            var imgName = dragon.prefix + i;
            eval("var " + imgName + "=new Image();  " + imgName + ".src='image/" + imgName + ".png'; ");
        }
        for (var i = 1; i <= dragonRunLeft.frameNumber; i++) {
            var imgName = dragonRunLeft.prefix + i;
            eval("var " + imgName + "=new Image();  " + imgName + ".src='image/" + imgName + ".png'; ");
        }
        for (var i = 1; i <= dragonRunRight.frameNumber; i++) {
            var imgName = dragonRunRight.prefix + i;
            eval("var " + imgName + "=new Image();  " + imgName + ".src='image/" + imgName + ".png'; ");
        }

        var infos = {
            hero: dragon,
            monsters: monsters
        };

        setInterval(function () {
            moveDragon();
            renderDragon(bgImage);//渲染所有恐龙
        }, 100);

        // 处理按键
        var keysDown = {};
        addEventListener("keydown", function (e) {
            keysDown[e.keyCode] = true;
        }, false);

        addEventListener("keyup", function (e) {
            delete keysDown[e.keyCode];
            dragon.x = infos.hero.x;
            dragon.y = infos.hero.y;
            infos.hero = dragon;
        }, false);

        function addMonster() {
            monsters.push({
                prefix: "sword_dragon",
                frameNumber: 6,
                x: 32 + (Math.random() * (canvas.width - 64)),
                y: 32 + (Math.random() * (canvas.height - 64)),
                index: 1
            });
        }

        //渲染背景
        function renderBG() {
            var bgImage = new Image();
            bgImage.onload = function () {
                bgReady = true;
            };
            bgImage.src = "image/background.png";
            return bgImage;
        }

        //渲染恐龙
        function renderDragon(bgImage) {
            if (bgReady) {
                ctx.drawImage(bgImage, 0, 0);

                //渲染怪物
                for (idx in infos.monsters) {
                    var info = infos.monsters[idx];
                    eval("ctx.drawImage(" + info.prefix + info.index + ",info. x, info.y);");
                    ++info.index;
                    if (info.index === info.frameNumber) info.index = 1;
                }

                //渲染英雄
                var hero = infos.hero;
                eval("ctx.drawImage(" + hero.prefix + hero.index + ",hero.x, hero.y);");
                ++hero.index;
                if (hero.index === hero.frameNumber) hero.index = 1;
            }
        }

        //移动恐龙
        function moveDragon() {
            if (38 in keysDown) { // 用户按的是↑
                dragonRunLeft.y = infos.hero.y - speed;
                dragonRunLeft.x = infos.hero.x;
                infos.hero = dragonRunLeft;
            }
            if (40 in keysDown) { // 用户按的是↓
                dragonRunRight.y = infos.hero.y + speed;
                dragonRunRight.x = infos.hero.x;
                infos.hero = dragonRunRight;
            }
            if (37 in keysDown) { // 用户按的是←
                dragonRunLeft.x = infos.hero.x - speed;
                dragonRunLeft.y = infos.hero.y;
                infos.hero = dragonRunLeft;
            }
            if (39 in keysDown) { // 用户按的是→
                dragonRunRight.x = infos.hero.x + speed;
                dragonRunRight.y = infos.hero.y;
                infos.hero = dragonRunRight;
            }
            //吃掉怪物
            for (var idx = 0; idx < infos.monsters.length; idx++) {
                var monster = infos.monsters[idx];
                if (
                    infos.hero.x <= (monster.x + 32)
                    && monster.x <= (infos.hero.x + 32)
                    && infos.hero.y <= (monster.y + 32)
                    && monster.y <= (infos.hero.y + 32)
                ) {
                    console.log(monster);
                    console.log(infos.hero);
                    monsters.splice(idx, 1);
                    addMonster();
                }
            }
        }

    }
);

