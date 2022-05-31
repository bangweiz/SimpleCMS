import React, {useState} from "react";
import {Label} from "./input-group";
import {Upload} from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {UploadChangeParam} from "antd/es/upload";
import {UploadFile} from "antd/es/upload/interface";

export const ImageUpload = (props: ImageUploadProps) => {
    const {files, setFiles} = props
    const [loading, setLoading] = useState(false)

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

    const onChange = (info:  UploadChangeParam) => {
        setLoading(true)
        if (info.file.status === 'removed') {
            setFiles(info.fileList)
        } else {
            setFiles([info.file])
        }
        setLoading(false)
    }

    const customRequest = (e: any) => {
        setTimeout(() => {
            e.onSuccess("ok");
        }, 0);
    }

    return (
        <div>
            <Label>Favicon:</Label>
            <Upload
                name="favicon"
                listType="picture-card"
                onChange={onChange}
                fileList={files}
                customRequest={customRequest}
            >
                {uploadButton}
            </Upload>
        </div>
    )
}

interface ImageUploadProps {
    files: UploadFile[],
    setFiles: (files: UploadFile[]) => void
}