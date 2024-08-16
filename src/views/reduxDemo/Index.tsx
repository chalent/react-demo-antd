import store from "../../store"
import { Provider } from "react-redux"
import CountCaculate from "./components/CountCaculate"

export default function Index() {
    return (
        <Provider store={ store }>
            <p>REDUX使用示例</p>
            {/* 子组件 */}
            <CountCaculate />
        </Provider>
    )
}