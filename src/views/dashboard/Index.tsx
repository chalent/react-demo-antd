import "./Index.css"
import { useState } from "react";
import { Button } from "antd";

import InputSubmit from "./components/InputSubmit";

export default function Dashboard() {

    const [count, setcount] = useState(0);
    const [inputText, setinputText] = useState("13445");

    function onChange(data: any) {
        // console.log("子组件改变了输入框的值", data);
        setinputText(data)
    }

    return (
        <div>
            <h2>工作台</h2>
            <div className="section">
                <div>
                    <span>{count}</span>&emsp;&emsp;&emsp;&emsp;
                    <Button onClick={() => setcount(count + 1)}>点我加一</Button>
                </div>

                <div className="main-flex">
                    <div style={{ width: '50%' }}>
                        <p style={{ textAlign: 'left' }}>【父子组件传值】请输入你的文字：{ inputText }</p>
                        <InputSubmit text={ inputText } onTextChange={ onChange } />
                    </div>
                </div>
            </div>
        </div>
    )
}