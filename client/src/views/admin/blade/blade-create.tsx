import React, {useState} from "react";
import {CmsModal} from "../../../components/cms-modal";
import {SelectGroup} from "../../../components/select-group";
import {bladeOptions} from "../../../conf/blade";
import {useBlade} from "../../../utils/blade";
import {BladeType} from "../../../types/blade";

export const BladeCreate = (props: BladeCreateProps) => {
    const {isVisible, pageId, order, setVisible} = props
    const {createBlade, error, removeBladeError} = useBlade()
    const [bladeType, setBladeType] = useState(BladeType.NULL)

    const onSelectChange = (value: BladeType) => {
        setBladeType(value)
    }

    const onOk = async () => {
        if (pageId && order) {
            const blade = await createBlade({
                name: bladeType,
                order,
                pageId
            })
            if (blade) {
                await onCancel()
            }
        }
    }

    const onCancel = async () => {
        setVisible(false)
        await removeBladeError()
    }

    return (
        <CmsModal
            isVisible={isVisible}
            title="Create a Blade"
            onOk={onOk}
            onCancel={onCancel}
        >
            <SelectGroup
                label="Blade Type:"
                onChange={onSelectChange}
                options={bladeOptions}
                error={error && error.hasOwnProperty('name') ? error.name : undefined}
            />
        </CmsModal>
    )
}

interface BladeCreateProps {
    isVisible: boolean
    setVisible: (isVisible: boolean) => void,
    pageId: number,
    order: number
}