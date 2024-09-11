import { useEffect, useContext } from "react";
import MyContext from "./MyContext";



export default function Child() {


    const context = useContext(MyContext);


    function modify() {
        context.setcName("张三")
    }

    useEffect(() => {
        
       console.log("跨组件-传递值：", context);
       
    }, []);


    return (
        <div>
            孙子组件，跨组件传的值：{ context.cName }
            <button onClick={ modify }>点击修改传递的值</button>
        </div>
    )
}