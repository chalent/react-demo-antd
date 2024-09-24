### react的渲染规律
只要父组件进行setState操作，父组件本身会重新render，所有子组件也会重新render


### useEffect使用
代码示例：
`
    useEffect(() => {
        console.log("useEffect使用")
    }, [])
`
useEffect和useLayoutEffect都可用于监听页面状态变化，第二个参数可在数组中特殊指定监听某些状态


### useMemo使用
适用场景：对状态进行缓存，如子组件需要大量计算后更新父组件的时候，在父组件的state值使用useMemo，可提升性能

React.memo 用于渲染优化，可以阻止父组件引起的子组件更新。
    使用该方法包裹的子组件，仅有在props发生改变后，才会更新子组件。若传入Object或Function时，因为引用类型变量不相等，所以会依旧每次更新，这种场景可以分别使用useMemo包裹对象 和 使用useCallback包裹方法来进行优化

结论：useMemo和useCallback使用都要结合React.memo，否则无意义。两者没有本质区别，只是一个用于缓存引用类型数据，一个用于缓存函数。

### useRef使用
用于操作dom元素。可配合React.forwardRef使用获取子组件的dom ref实例

React.forwardRef作用：实现组件实例转发，在函数式组件中是没有Ref实例的，如果想拿到函数式组件内部的dom实例，需要通过forwardRef进行转发，然后在父组件使用useRef获取到


### useContext使用
用于解决跨组件传值，配合createContext方法，在子或孙子组件中获取或修改父组件传递的值

使用步骤：1. 在单独文件使用creatContext方法，并导出对象
    2. 在顶层组件中引用导出的Context实例，用其Provider属性向下传递数据
    3. 子组件中使用useContext，并将引入的Context对象当做参数传入。此时便可在子组件中拿到顶层组件传的值

场景1：若要在子组件中改变跨组件传的值，可在传值时传递一个对象，将修改方法(如：setName)传递下去，在子组件中即可使用。   


### useTransition使用
用于性能，用于用户体验。
特性：并发更新(fiber架构)，16.8版本之后

react组件渲染过程，实际上是js的执行，因为js执行不可中断，所以如果一个组件中js执行时间过长，会导致页面卡住渲染

react 更新父组件时，会由上而下更新子组件，这里更新的时候，采用深度优先遍历原则
数据结构:
    parent
    /   \
child1  child2
 /   \ 
sun1  sun2


》》当组件更新时，会逐个执行组件里面的js代码，此时若其中一个组件js代码消耗时间过长，会导致页面卡主。利用fiber架构，可利用浏览器空闲时间。即比如说当一个组件中js的执行花费超过了浏览器一帧的刷新时间，只要当前开始了useTransition(表示开启并发更新)，然后会将消耗长时间的执行任务拆分之后，分别放在各帧渲染的空闲时间去执行，这样即可避免页面被卡住。所以并发更新也叫分片更新。

【浏览器空闲时间 解释：如浏览器渲染一帧需要20ms，其中js执行了5ms，浏览器渲染话费了5ms，那么剩余的10ms就是浏览器空闲时间】

浏览器空闲时间 执行回调函数是 requestIdleCallback （window对象的属性方法）
另外，因为requestIdleCallback兼容性不好，React目前是使用PostMessage去模拟实现的


### useDeferredValue使用
useDeferredValue 是 React 18 引入的一个 Hook，主要用于减少高优先级任务的延迟感，帮助应用在渲染高优先级内容的同时，推迟低优先级的更新操作，从而提高交互的响应速度。

用途
useDeferredValue 可以在需要渲染较大的或较复杂的数据时使用，避免用户在进行快速输入或交互时，界面卡顿或延迟更新的现象。

【总结：useTransition和useDeferredValue都是用于延迟低优先级代码执行，useTransiton主要用于组件，后者主要用于组件中的state】

