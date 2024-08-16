import { useState, useEffect } from "react";
import { useLocation, useMatch, useSearchParams } from "react-router-dom";

import { Button } from "antd";
import axios from "axios";

export default function Index() {

    // const location = useLocation();
    const [ routeSearch, setrouteSearch ] = useSearchParams();  // 使用该方法需改变测试地址：/main/routeDemo?name=admin&pwd=11235；且此方法不能与navigate传递的state参数共用
    console.log("当前路由参数", routeSearch);  // 这里可能会打印两次，可能是开启了StrictMode模式


    // useMatch方法：测试的当前路由是否匹配
    const match = useMatch("/main/routeDemo")
    console.log("当前路由匹配：", match);

    useEffect(() => {
        axios.get("http://localhost:3000/api/getHello").then(res => {
            console.log("模拟接口测试：", res.data);
        })
    }, []);
    

    return (
        <div>
            {/* <p>当前菜单内容是路由：{ location.state.menuKey }</p> */}

            <div>
                <p>当前路由参数展示 - 用户名：{ routeSearch.get("name") }，密码： { routeSearch.get("pwd") }</p>
                <Button type="primary" onClick={() => setrouteSearch({name: 'admin12'})}>设置路由参数</Button>
            </div>

            <div>
                <p>传统路由：解决了路由与UI渲染之间的关系</p>
                <p>数据路由：UI渲染和数据状态之间的关系，相比传统路由多了一层数据状态的抽象</p>

                <p>数据路由写法与BrowserRouter路由方式略有不同</p>
            </div>
        </div>
    )
}