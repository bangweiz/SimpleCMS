import React from "react";
import {BladeType} from "../../types/blade";
import {Content} from "./content/content";

export const Blade = (props: BladeProps) => {
    const {id, name} = props

    switch (name) {
        case BladeType.CONTENT:
            return <Content bladeId={id} />
        case BladeType.BANNER:
            return <div>This is A Banner Blade</div>
        case BladeType.NULL:
            return <div>Hello</div>
    }
}

interface BladeProps {
    id: number,
    name: BladeType,
}