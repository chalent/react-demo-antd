import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const counterReducer = createSlice({
    name: "counter",
    initialState: {
        count: 0,
        poemText: "九霄龙吟惊天变，遇见风云便化龙。"
    },
    reducers: {
        increasement(state) {
            state.count++;
        },
        decreasement(state) {
            state.count--;
        },
        changeCount(state, action) {
            // console.log("参数：", state, action);
            state.count = action.payload;
        },
        addPoem(state, action) {
            state.poemText += action.payload;
        }
    }
});

const { addPoem } = counterReducer.actions;

const getPoemText = () => {
    return async (dispatch: any) => {
        let res = await axios.get("http://localhost:3000/api/getPoem");
        dispatch(addPoem(res.data));  // 调用action方法改变state
    }
}

export { getPoemText };  // 异步方法另外导出
// 将actions方法解构并按需导出
export const { increasement, decreasement, changeCount } = counterReducer.actions;

export default counterReducer.reducer;