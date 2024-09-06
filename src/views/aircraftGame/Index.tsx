import React, { useState } from "react";
import "./Index.css";
import PlayGame from "./PlayGame";

const Index: React.FC = () => {

    const [isReady, setisReady] = useState<boolean>(true);
    const [maxScore, setmaxScore] = useState<number>(0);

    function handleGameOver(data: any) {
        console.log("处理游戏结束~~~", data);
        setisReady(true);
        setmaxScore(data);
    }

    return (
        <div className="game-container">
            {/* <div className="bg-wrapper bg1"></div> */}
            {isReady ? <div className="ready-game">
                <div style={{ margin: '200px 0' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>飞机大战</div>
                    <div style={{ fontSize: '12px', marginTop: '20px' }}>当前得分：<span style={{ color: '#f00' }}>{ maxScore }</span></div>
                </div>
                <div className="ready">
                    <div className="btn-chost" onClick={() => setisReady(false)}>
                        <div>开始游戏</div>
                    </div>
                </div>
            </div> : <PlayGame onGameOver={handleGameOver} />}
        </div>
    )
}

export default Index;