import React, {useEffect} from "react";
import {CmsModal} from "../../../components/cms-modal";
import {useBlade} from "../../../utils/blade";
import {BladeType, Content} from "../../../types/blade";
import {ContentEdit} from "../../../components/blade/content/content-edit";

export const BladeDetail = (props: BladeDetailProps) => {
    const {bladeData, setBladeDate} = props
    const {blade, getBlade, updateBlade, removeBlade} = useBlade()

    useEffect(() => {
        if (bladeData.id !== 0 && bladeData.type !== '' && blade?.id !== bladeData.id) {
            removeBlade()
            getBlade(bladeData.id, bladeData.type)
        }
    }, [bladeData, getBlade, removeBlade, blade])

    const onOk = () => {
        setBladeDate({
            id: 0,
            type: BladeType.NULL
        })
    }

    const onCancel = () => {
        setBladeDate({
            id: 0,
            type: BladeType.NULL
        })
    }

    const onFinish = (data: Partial<Content>) => {
        if (blade) {
            updateBlade(blade.id, blade.name, {content: data}).then(() => {
                onOk()
            })
        }
    }

    const renderForm = () => {
        switch (blade?.name) {
            case BladeType.CONTENT:
                return <ContentEdit onFinish={onFinish} content={blade?.content} />
            case BladeType.BANNER:
                return <div />
            case BladeType.NULL:
                return <div />
        }
    }

    return (
        <CmsModal
            isVisible={bladeData.id !== 0 && bladeData.type !== ''}
            title="Edit Blade"
            onOk={onOk}
            onCancel={onCancel}
            width="80%"
        >
            {renderForm()}
        </CmsModal>
    )
}

interface BladeDetailProps {
    bladeData: {
        id: number,
        type: BladeType
    },
    setBladeDate: (data: {id: number, type: BladeType}) => void
}