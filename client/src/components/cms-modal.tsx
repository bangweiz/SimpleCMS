import React from "react";
import {Modal} from "antd";


export const CmsModal = (props: CmsModelProps) => {
    const {isVisible, title, onOk, onCancel, children, width} = props
    return (
        <Modal
            title={title}
            visible={isVisible}
            onOk={onOk}
            onCancel={onCancel}
            width={width}
        >
            {children}
        </Modal>
    )
}

interface CmsModelProps {
    isVisible: boolean
    title: string
    onOk: () => void
    onCancel: () => void
    children?: React.ReactNode,
    width?: string | number
}