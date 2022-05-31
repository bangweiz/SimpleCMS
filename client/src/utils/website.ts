import {useDispatch, useSelector} from "react-redux";
import * as websiteSlice from "../store/website.slice";
import React, {useCallback, useEffect, useState} from "react";
import {WebsiteSettings} from "../types/website";
import {UploadFile} from "antd/es/upload/interface";

export const useWebsite = () => {
    const dispatch: (...args: any[]) => Promise<WebsiteSettings> = useDispatch()
    const websiteSettings = useSelector(websiteSlice.selectWebsite)

    const getWebsiteSettings = useCallback(
        () => dispatch(websiteSlice.getWebsiteSettings()),
        [dispatch]
    )

    return {
        websiteSettings,
        getWebsiteSettings
    }
}

export const useWebsiteSettings = () => {
    const [settings, setSettings] = useState<WebsiteSettings>({
        title: '',
        favicon: '',
        footerText: '',
        headerLinks: ''
    })

    const [files, setFiles] = useState<UploadFile[]>([
        {
            uid: '-1',
            status: 'done',
            name: 'favicon',
            url: settings.favicon
        }
    ])

    useEffect(() => {
        setFiles([{
            uid: '-1',
            status: 'done',
            name: 'favicon',
            url: settings.favicon
        }])
    }, [settings.favicon])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        })
    }

    const onSelectChange = (value: any) => {

    }

    return {
        files,
        setFiles,
        settings,
        setSettings,
        onInputChange,
        onSelectChange
    }
}