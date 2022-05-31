import React from "react";
import {Input, Typography} from "antd";
import styled from "@emotion/styled";

export const InputGroup = (props: InputGroupProps) => {
    return (
        <Group>
            <Label
                htmlFor={props.label}
            >
                {props.label}
            </Label>
            <MyInput>
                <Input
                    id={props.label}
                    addonBefore={props.addonBefore}
                    value={props.value}
                    name={props.name}
                    onChange={props.onChange}
                    status={props.error ? 'error' : undefined}
                />
                {props.error && <Typography.Text type="danger">{props.error}</Typography.Text>}
            </MyInput>
        </Group>
    )
}

interface InputGroupProps {
    label: string,
    addonBefore?: React.ReactNode
    value: string,
    name: string,
    onChange: (e: any) => void,
    error?: string
}

export const Group = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`

export const Label = styled.label`
  display: inline-block;
  width: 10rem;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 3.2rem;
`

const MyInput = styled.div`
  display: inline-block;
  width: calc(100% - 10rem);
`
