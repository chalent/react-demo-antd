import React, { useEffect, useRef, useState } from "react";
import "./PlayGame.css";


// 初始定义游戏桌布属性（TODO 按照实际尺寸进行适配）
const gw = 375 - 4,  // 游戏画布尺寸（需要减去边框间距等）
    gh = 667 - 4,
    pw = 56, ph = 50;  // 玩家飞机宽高
const bulletWidth = 6,  // 子弹宽高
    bulletHeight = 14;

let bulletTimer: number | NodeJS.Timeout;  // 子弹定时器


const PlayGame: React.FC = () => {

    const playerRef = useRef<HTMLDivElement | null>(null);
    // 游戏状态：1 游戏中；0 暂停游戏
    const [gameStatus, setgameStatus] = useState<number>(1);
    const gameStatusRef = useRef(gameStatus);
    const [playerStyle, setplayerStyle] = useState({});

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
    }
    // 暂停游戏
    function onPaused() {
        // console.log("暂停游戏~~~~");
        setgameStatus(0);
        window.removeEventListener("keydown", handleKeydown);
        clearInterval(bulletTimer);  // 不再创建子弹
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


    useEffect(() => {
        initPlayer();

        window.addEventListener("keydown", togglePlay);


        // 销毁定时器等
        return () => {
            if (bulletTimer) {
                clearInterval(bulletTimer);
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