import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Button, Input, Divider, InputProps, InputRef } from "antd"
import MyContext from "./MyContext"

import Child from "./Child";

// Bpp将用于演示，使用React.memo之后，只有props改变，才会重新渲染子组件
const Bpp = (props: any) => {

    console.log("子组件Bpp执行~~~~");

    return (
        <div>我是{props.name}，是一个嵌套子组件</div>
    )
}
const BppMemo = React.memo(Bpp);

// RefBapp用于演示useRef和forwardRef使用
const RefBapp = React.forwardRef<InputRef, InputProps>((props, ref) => {

    return (
        <div>
            <Input ref={ref} value="forwardRef用法：父组件中获取实例" />
        </div>
    )
})


export default function Parent() {

    const [count, setcount] = useState(0);
    const [bname, setbname] = useState("yoBPP");

    const inputRef = useRef<InputRef>(null);  // 子组件的ref实例


    function handleClick() {
        setcount(count + 1);

        // setbname("yeyou");  // 取消注释此行，点击时才会重新渲染子组件。使用React.memo包裹子组件时，不执行这行改变子组件的props，不会更新子组件
    }

    const data = useMemo(() => {
        return {}
    }, [])
    const callback = useCallback(() => {
        alert(11111);
    }, [])

    
    // 跨组件传的值：传递动态值，并演示在子组件修改该值
    const [cName, setcName] = useState<string>("小明");

    useEffect(() => {

        console.log("子组件input实例：", inputRef);

    }, []);



    return (
        <div>
            <div>当前计数：{count}<Button onClick={handleClick}>点我增加计数</Button></div>
            <Divider />
            <BppMemo name={bname} data={data} callback={callback} />
            <Divider />
            <RefBapp ref={inputRef} />

            <Divider />
            <MyContext.Provider value={{ cName, setcName }}>
                <div>
                    <Child />
                </div>
            </MyContext.Provider>

        </div>
    )
}