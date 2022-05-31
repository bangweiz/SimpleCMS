import React from "react";
import {PageStatus} from "../types/page";
import {Button, Card, Popconfirm} from "antd";
import {getPageStatus} from "../utils/page";
import {formatDateTime} from "../utils/date";
import {Paragraph} from "./paragraph";
import {Link} from "react-router-dom";

export const InfoCard = (props: InfoCardProps) => {
    const {status, createAt, createBy, updateAt, link, saveOrUpdate, isUpdate, cancelOrDelete} = props
    const s = getPageStatus(status)
    return (
        <Card title={<h3 style={{textAlign: 'center'}}>General Info</h3>} bordered={false} style={{ width: '30rem' }}>
            <div>
                <Link to={link ? '/' + link : '/'}>
                    <Button type="primary" style={{width: '100%'}}>
                        Visit
                    </Button>
                </Link>
            </div>
            <Item label="Status:" text={s} />
            <Item label="Created By:" text={createBy} />
            <Item label="Updated At:" text={formatDateTime(updateAt)} />
            <Item label="Created At:" text={formatDateTime(createAt)} />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button type="primary" style={{width: '45%'}} onClick={saveOrUpdate}>
                    {isUpdate ? 'Update' : 'Save'}
                </Button>
                <Popconfirm
                    title="Are you sure to delete this page?"
                    onConfirm={cancelOrDelete}
                >
                    <Button danger style={{width: '45%'}}>
                        {isUpdate ? 'Delete' : 'Cancel'}
                    </Button>
                </Popconfirm>
            </div>
        </Card>
    )
}

const Item = (props: {label: string, text: string}) => {
    return (
        <div style={{
            margin: '.8rem 0'
        }}>
            <Paragraph
                content={props.label}
                width="7rem"
                textAlign="left"
                fontSize="1.4rem"
                fontWeight="500"
            />
            <Paragraph content={props.text} />
        </div>
    )
}

interface InfoCardProps {
    updateAt: string,
    createAt: string,
    status: PageStatus
    createBy: string,
    link?: string,
    saveOrUpdate: () => void,
    cancelOrDelete: () => void
    isUpdate: boolean
}
