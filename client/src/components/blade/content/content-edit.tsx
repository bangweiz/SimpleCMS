import React, {useEffect} from "react";
import {Button, Form, Input} from "antd";
import {Content} from "../../../types/blade";

export const ContentEdit = (props: ContentEditProps) => {
    const {onFinish , content} = props
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue(content)
    }, [content, form])

    return (
        <Form
            autoComplete="off"
            form={form}
            onFinish={onFinish}
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[
                    {required: true, message: 'Please input blade title'}
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Subtitle"
                name="subtitle"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Content"
                name="content"
                rules={[
                    {required: true, message: 'Please input blade content'}
                ]}
            >
                <Input.TextArea rows={6} />
            </Form.Item>
            <Form.Item
                label="Button Text"
                name="buttonText"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Button Link"
                name="buttonLink"
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
}

interface ContentEditProps {
    onFinish: (data: Partial<Content>) => void
    content: Partial<Content>
}