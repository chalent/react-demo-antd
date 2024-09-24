function SlowList(props: any) {

    console.log("组件入参：", props);
    

    return (
        <div>
            { props.list.map((item: any) => {
                return <div key={ item }>{item}</div>
            }) }
        </div>
    )
}

export default SlowList