import { useState } from "react";
import { Button, Input } from "antd";
import { SmileOutlined } from '@ant-design/icons';

const InputSubmit = (props: any) => {

    const { text, onTextChange } = props;
    const [inputValue, setinputValue] = useState(text);

    function onChange(e: any) {
        // console.log("输入框改变回调", e);
        setinputValue(e.target.value);
    }

    return (
        <div style={{ textAlign: 'left' }}>
            <Input value={inputValue} onChange={onChange} style={{ width: '60%' }} />
            <SmileOutlined style={{  fontSize: '20px', marginLeft: '10px', cursor: 'pointer' }} />
            <Button style={{ marginLeft: '10px' }} onClick={() => onTextChange(inputValue)}>发送</Button>
            <Button style={{ marginLeft: '10px' }} onClick={() => setinputValue(null)}>清除</Button>
            {/* TODO 在里面再嵌套一个表情组件，用useContext跨组件传值 */}

        </div>
    )
}

export default InputSubmit;