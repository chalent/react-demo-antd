import React, { useState, useTransition } from "react"
import "./TabDemo.css"

import TabAbout from "./TabAbout";
import TabPost from "./TabPost";
import TabContact from "./TabContact";

const TabDemo: React.FC = () => {

    const TabPostMemo = React.memo(TabPost);

    const [tabKey, settabKey] = useState<number>(1);
    const [isPending, startTransition] = useTransition();

    function clickTab(key: number) {
        // 将tab切换变成并发更新
        startTransition(() => {
            settabKey(key);
        })
    }

    return (
        <div>
            <div className="tab-container">
                <div className="tab-btns">
                    <div className={ `tab-btn ${ tabKey === 1 && 'active' }` } onClick={ () => clickTab(1) } >选项一</div>
                    <div className={ `tab-btn ${ tabKey === 2 && 'active' }` } onClick={ () => clickTab(2) } >选项二</div>
                    <div className={ `tab-btn ${ tabKey === 3 && 'active' }` } onClick={ () => clickTab(3) } >选项三</div>
                </div>
                <div className="tab-content">
                    { tabKey === 1 && <TabAbout /> }
                    { tabKey === 2 && <TabPostMemo /> }
                    { tabKey === 3 && <TabContact /> }
                </div>
            </div>
        </div>
    )
}

export default TabDemo;