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
        var dragonRunNight = {
            prefix: "right",
            frameNumber: 8,
            x: x,
            y: y,
            index: 1
        };

        //剑龙
        var monsters = [];
        for (var i = 0; i < 4; i++) {
            monsters.push({
                prefix: "sword_dragon",
                frameNumber: 6,
                x: 32 + (Math.random() * (canvas.width - 64)),
                y: 32 + (Math.random() * (canvas.height - 64)),
                index: 1
            });
        }

        //定义所有image对象
        for (idx in monsters) {
            var info = monsters[idx];
            for (var i = 1; i <= info.frameNumber; i++) {
                eval("var " + info.prefix + i + "=new Image();  " + info.prefix + i + ".src='image/" + info.prefix + i + ".png'; ");
            }
        }
        for (var i = 1; i <= dragon.frameNumber; i++) {
            eval("var " + dragon.prefix + i + "=new Image();  " + dragon.prefix + i + ".src='image/" + dragon.prefix + i + ".png'; ");
        }
        for (var i = 1; i <= dragonRunLeft.frameNumber; i++) {
            eval("var " + dragonRunLeft.prefix + i + "=new Image();  " + dragonRunLeft.prefix + i + ".src='image/" + dragonRunLeft.prefix + i + ".png'; ");
        }
        for (var i = 1; i <= dragonRunNight.frameNumber; i++) {
            eval("var " + dragonRunNight.prefix + i + "=new Image();  " + dragonRunNight.prefix + i + ".src='image/" + dragonRunNight.prefix + i + ".png'; ");
        }

        var infos = {
            hero: dragon,
            monsters: monsters
        };

        setInterval(function () {
            renderDragon(bgImage);//渲染所有恐龙
        }, 100);

        // 处理按键
        addEventListener("keydown", function (e) {
            moveDragon(e.keyCode);
        }, false);

        addEventListener("keyup", function (e) {
            dragon.x = infos.hero.x;
            dragon.y = infos.hero.y;
            infos.hero = dragon;
        }, false);

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
        function moveDragon(keyCode) {
            if (38 === keyCode) { // 用户按的是↑
                dragonRunLeft.y = infos.hero.y - speed;
                dragonRunLeft.x = infos.hero.x;
                infos.hero = dragonRunLeft;
            }
            if (40 === keyCode) { // 用户按的是↓
                dragonRunNight.y = infos.hero.y + speed;
                dragonRunNight.x = infos.hero.x;
                infos.hero = dragonRunNight;
            }
            if (37 === keyCode) { // 用户按的是←
                dragonRunLeft.x = infos.hero.x - speed;
                dragonRunLeft.y = infos.hero.y;
                infos.hero = dragonRunLeft;
            }
            if (39 === keyCode) { // 用户按的是→
                dragonRunNight.x = infos.hero.x + speed;
                dragonRunNight.y = infos.hero.y;
                infos.hero = dragonRunNight;
            }
        }

    }
);

