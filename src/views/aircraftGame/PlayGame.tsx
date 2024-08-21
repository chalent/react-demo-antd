import React, { useEffect, useRef, useState } from "react";
import "./PlayGame.css";

interface EnemyAttribute {
    width: number,
    height: number,
    score: number,
    hp: number
}

// 初始定义游戏桌布属性（TODO 按照实际尺寸进行适配）
const gw = 375 - 4,  // 游戏画布尺寸（需要减去边框间距等）
    gh = 667 - 4,
    pw = 56, ph = 50;  // 玩家飞机宽高
const bulletWidth = 6,  // 子弹宽高
    bulletHeight = 14;

// 敌机属性数据对象
const enemyAttrs: Array<EnemyAttribute> = [
    {
        width: 34,
        height: 24,
        score: 5,
        hp: 30
    },
    {
        width: 60,
        height: 40,
        score: 10,
        hp: 50
    },
    {
        width: 80,
        height: 100,
        score: 20,
        hp: 100
    },
]


let bulletTimer: number | NodeJS.Timeout;  // 子弹定时器
let enemyTimer: number | NodeJS.Timeout;  // 创建敌机定时器


const PlayGame: React.FC = () => {

    const playerRef = useRef<HTMLDivElement | null>(null);
    // 游戏状态：1 游戏中；0 暂停游戏
    const [gameStatus, setgameStatus] = useState<number>(1);
    const gameStatusRef = useRef(gameStatus);
    const [playerStyle, setplayerStyle] = useState({});
    const [bullets, setbullets] = useState<Array<HTMLImageElement>>([]);
    const [enemies, setenemies] = useState<Array<HTMLImageElement>>([]);

    useEffect(() => {
        console.log("游戏状态改变：", gameStatus);
        gameStatusRef.current = gameStatus;
    }, [gameStatus])

    // 开始或重新游戏
    function onPlay() {
        // console.log("开始游戏~~~~");
        setgameStatus(1);
        // 绑定键盘控制事件
        window.addEventListener("keydown", handleKeydown);
        startShot();

        appearEnemy();  // 创建敌机
    }
    // 暂停游戏
    function onPaused() {
        // console.log("暂停游戏~~~~");
        setgameStatus(0);
        window.removeEventListener("keydown", handleKeydown);
        clearInterval(bulletTimer);  // 不再创建子弹
        clearInterval(enemyTimer);  // 不再创建敌机
    }

    // 设置玩家初始位置
    function initPlayer() {
        setplayerStyle({
            top: gh - ph - 40,
            left: Math.floor(gw / 2 - pw / 2)
        })
        onPlay();
    }
    function startShot() {
        // 间隔时间内从玩家飞机发射子弹 
        bulletTimer = setInterval(() => {
            createBullet();
        }, 1000)
    }
    // 获取飞机坐标位置
    function getPlayerLocation() {
        const el = playerRef.current;
        if (el) {
            let top = parseInt(el.style.top);
            let left = parseInt(el.style.left);
            return { x: left, y: top };  // 返回左上角的xy坐标
        } else {
            return { x: 0, y: 0 }
        }
    }
    // 绑定键盘操作事件
    function handleKeydown(e: KeyboardEvent) {
        const el = playerRef.current;
        if (el) {

            // console.log("键盘按下事件：", e);
            let { x, y } = getPlayerLocation() || {};
            if (e.key === "ArrowRight") {  // 暂时只支持横向移动
                // 超过边界不再移动
                if (x > (gw - pw)) {
                    return;
                }

                setplayerStyle({
                    top: y,
                    left: x + 5 + 'px'
                })
            }
            if (e.key === "ArrowLeft") {
                if (x < 4) {
                    return;
                }
                setplayerStyle({
                    top: y,
                    left: x - 5 + 'px'
                })
            }
        }
    }

    // 创建子弹
    function createBullet() {
        const bullet = new Image(bulletWidth, bulletHeight);
        bullet.src = require("./images/bullet.png");
        let { x, y } = getPlayerLocation();  // 获取当前飞机的坐标
        // console.log("飞机坐标 - 创建子弹时", x, y);
        bullet.setAttribute("style", `position: absolute;left: ${x + pw / 2 - bulletWidth / 2}px;top: ${y - bulletHeight}px;`)
        const game = document.querySelector(".game");
        game?.appendChild(bullet);
        setbullets(prev => [...prev, bullet]);
        // console.log("创建子弹", bullet);
        bulletMove(bullet);  // 创建完成后子弹开始运动
    }
    // 子弹运动（匀速运动）
    function bulletMove(elBullet: HTMLImageElement) {
        const speed = 8;  // 运动速度
        const moveTimer = setInterval(() => {
            const bulletTop = parseInt(elBullet.style.top);
            if (bulletTop < 1) {
                elBullet.parentNode?.removeChild(elBullet);
                clearInterval(moveTimer);
                setbullets(prev => prev.slice(0, -1));
                return;
            }
            elBullet.style.top = bulletTop - speed + "px";
        }, 30);
    }
    function togglePlay(e: KeyboardEvent) {
        // 按下空格键时“暂停”或“重新开始”游戏  
        // console.log("当前游戏状态", gameStatusRef.current);
        if (e.code === "Space") {
            if (gameStatusRef.current === 1) {
                onPaused();
            } else {
                onPlay();
            }
        }
    }

    // 间隔时间出现敌机
    function appearEnemy() {
        enemyTimer = setInterval(() => {
            createEnemy();
        }, 5000);
    }
    // 制造敌机的函数
    function createEnemy() {
        // 机型出现概率
        const percentData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3];
        // 敌机类型：大 中 小
        const enemyType = percentData[Math.floor(Math.random() * percentData.length)];
        const enemyAttr = enemyAttrs[enemyType - 1];
        const enemy = new Image(enemyAttr.width, enemyAttr.height);
        enemy.src = require("./images/enemy.png");
        enemy.setAttribute("score", enemyAttr.score + "");
        enemy.setAttribute("hp", enemyAttr.hp + "");
        const left = Math.floor(Math.random() * (gw - enemyAttr.width + 1));
        const top = enemyAttr.height;
        enemy.style.position = "absolute";
        enemy.style.left = left + "px";
        enemy.style.top = top + "px";
        // 添加到画布中
        const game = document.querySelector(".game");
        game?.append(enemy);
        // console.log("添加敌机~~~~~");
        setenemies(prev => [...prev, enemy]);

        // 调用运动函数
        moveEnemy(enemy);
    }
    // 敌机运动
    function moveEnemy(elEnemy: HTMLImageElement) {
        const speed = 8;  // 运动速度
        const moveTimer = setInterval(() => {
            const top = parseInt(elEnemy.style.top);
            if (top > gh) {
                elEnemy.parentNode?.removeChild(elEnemy);
                clearInterval(moveTimer);
                setenemies(prev => prev.slice(0, -1));
                return;
            }
            elEnemy.style.top = top + speed + "px";
            attacked();  // 检测敌机与子弹碰撞
        }, 300);
    }
    // 敌机被攻击（即敌机与子弹发生碰撞）
    function attacked() {
        // TODO 遍历所有子弹和敌机，是否发生碰撞。若碰撞，销毁子弹，切计算敌机血量，血量小于0销毁敌机
        // TODO 敌机血量小于0销毁并增加积分
    }



    // 临时测试 监听器
    useEffect(() => {
        console.log("敌机数量变化：", enemies.length);
        console.log("子弹数量变化：", bullets.length);
    }, [enemies, bullets])

    useEffect(() => {
        initPlayer();

        window.addEventListener("keydown", togglePlay);

 
        // 销毁定时器等
        return () => {
            if (bulletTimer) {
                clearInterval(bulletTimer);
            }
            if (enemyTimer) {
                clearInterval(enemyTimer);
            }
            window.removeEventListener("keydown", togglePlay);
            window.removeEventListener("keydown", handleKeydown);
        }
    }, []);

    return (
        <div className="game">
            {/* palyer  */}
            <div ref={playerRef} style={playerStyle} className="palayer"></div>


        </div>
    )
}

export default PlayGame;