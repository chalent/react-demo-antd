import { render } from "@testing-library/react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";



const App: React.FC = () => {
   const navigate = useNavigate();

    return (
        <Result status="404" title="404" subTitle="抱歉，未找到当前页面" extra={<Button type="primary" onClick={() => navigate("/")}>返回首页</Button>} />
    )
}

export default App;