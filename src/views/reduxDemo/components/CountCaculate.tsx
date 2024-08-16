// import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "antd";
// import type { AppDispatch } from "../../../store/index";
import type { AppDispatch } from "@/store/index"

import { increasement, decreasement, changeCount, getPoemText } from "../../../store/modules/counterStore";

export default function CountCaculate() {

    const { count, poemText } = useSelector((state: any) => state.counter);
    const dispatch = useDispatch<AppDispatch>();

    const checkMore = () => {
        dispatch(getPoemText());
    }

    // useEffect(() => {

    //     getPoemText();
    // }, []);

    return (
        <div>
            <Button onClick={ () => dispatch(decreasement()) }> - </Button> &nbsp;
            <Input value={ count } style={{ width: '60px', display: 'inline-block' }} /> &nbsp;
            <Button onClick={ () => dispatch(increasement()) }> + </Button> &nbsp;
            <Button type="primary" onClick={() => dispatch(changeCount(100))}>加到一百</Button>

            <div style={{ marginTop: '40px', textAlign: 'center' }}>异步状态操作：</div>
            <p>{ poemText }</p>
            <Button type="primary" onClick={ () => checkMore() }>查看预言</Button>
        </div>
    )
}