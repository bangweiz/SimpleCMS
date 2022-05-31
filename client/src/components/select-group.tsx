import React from "react";
import {Group, Label} from "./input-group";
import {Select, Typography} from "antd";
import {BladeType} from "../types/blade";

export const SelectGroup = (props: SelectGroupProps) => {
    return (
        <Group>
            <Label
                htmlFor={props.label}
            >
                {props.label}
            </Label>
            <div style={{width: '100%'}}>
                <Select
                    defaultValue={BladeType.NULL}
                    id={props.label}
                    style={{ width: '100%' }}
                    onChange={props.onChange}
                    status={props.error ? 'error' : undefined}
                    value={props.value}
                >
                    <Select.Option value="">Please Select</Select.Option>
                    {
                        props.options.map(option => (
                            <Select.Option
                                key={option.value}
                                value={option.value}
                            >
                                {option.text}
                            </Select.Option>
                        ))
                    }
                </Select>
                {props.error && <Typography.Text type="danger">{props.error}</Typography.Text>}
            </div>
        </Group>
    )
}

interface SelectGroupProps {
    label: string,
    onChange: (value: any) => void
    options: Option[],
    error?: string,
    value?: string
}

interface Option {
    value: string,
    text: string
}