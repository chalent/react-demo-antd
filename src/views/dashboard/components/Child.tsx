import { useEffect } from "react";

import Sun from "./Sun"



export default function Child() {


    // useEffect(() => {
        
    //    console.log("子组件执行~~~~~");
       
    // }, []);


    return (
        <div>
            子组件
            <Sun />
        </div>
    )
}