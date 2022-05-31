import React, {useState} from "react";
import {usePages} from "../../../utils/page";
import {useMount} from "../../../utils";
import {Button, Table} from "antd";
import {pageColumns} from "../../../conf/page";
import {PageCreate} from "./page-create";

export const PageList = () => {
    const { pages, getPages } = usePages()
    const [newPageVisible, setNewPageVisible] = useState(false)
    useMount(() => {
        if (pages.length === 0) {
            getPages()
        }
    })

    return (
        <div>
            <div>
                <h2>
                    <span style={{marginRight: '1rem'}}>Pages</span>
                    <Button type="primary" onClick={() => setNewPageVisible(true)}>New Page</Button>
                </h2>
            </div>
            <div>
                <Table columns={pageColumns} dataSource={pages} rowKey="id" />
            </div>
            <PageCreate
                isVisible={newPageVisible}
                setVisible={setNewPageVisible}
            />
        </div>
    )
}
