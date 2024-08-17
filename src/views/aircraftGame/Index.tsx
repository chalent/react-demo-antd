import React, { useState } from "react";
import "./Index.css";
import PlayGame from "./PlayGame";

const Index: React.FC = () => {

    const [isReady, setisReady] = useState<boolean>(true);

    return (
        <div className="game-container">
            {/* <div className="bg-wrapper bg1"></div> */}
            { isReady ? <div className="ready">
                <div className="btn-chost" onClick={ () => setisReady(false) }>
                    <div>开始游戏</div>
                </div>
            </div> : <PlayGame />  }
        </div>
    )
}

export default Index;