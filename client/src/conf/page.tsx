import React from "react";
import {ColumnsType} from "antd/es/table/Table";
import {Button, Popconfirm, Space} from "antd";
import {Link} from "react-router-dom";

export const pageColumns: ColumnsType<any> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: 'Url',
        dataIndex: 'url',
        key: 'url'
    },
    {
        title: 'Crated At',
        dataIndex: 'createdAt',
        key: 'createdAt'
    },
    {
        title: 'Action',
        key: 'action',
        render: (value) => (
            <Space size="middle">
                <Link to={`/${value.url}`} >
                    <Button type="primary">
                        Visit
                    </Button>
                </Link>
                <Link to={`/admin/pages/${value.id}`}>
                    <Button type="primary">
                        Edit
                    </Button>
                </Link>
                <Popconfirm
                    title="Are you sure to delete this page?"
                >
                    <Button danger>
                        Delete
                    </Button>
                </Popconfirm>
            </Space>
        )
    }
]