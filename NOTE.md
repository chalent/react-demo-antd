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
