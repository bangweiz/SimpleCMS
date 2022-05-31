import React, {useState} from "react";
import {CmsModal} from "../../../components/cms-modal";
import {InputGroup} from "../../../components/input-group";
import {usePage} from "../../../utils/page";
import {PageStatus} from "../../../types/page";
import {useAuth} from "../../../utils/auth";

export const PageCreate = (props: PageCreateProps) => {
    const {isVisible, setVisible} = props
    const [pageData, setPageData] = useState({
        title: '',
        url: ''
    })
    const {createPage, error, removePageError} = usePage()
    const {user} = useAuth()

    const onDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'title') {
            setPageData({
                title: e.target.value,
                url: e.target.value.replace(/ {1,}/g," ").trim().toLowerCase().replaceAll(' ', '-')
            })
        } else {
            setPageData({
                ...pageData,
                [e.target.name]: e.target.value
            })
        }
    }

    const onOk = async () => {
        const trimmedTitle = pageData.title.replace(/ {1,}/g," ").trim()
        const page = await createPage({
            title: trimmedTitle,
            url: pageData.url,
            status: PageStatus.DRAFT,
            userId: user?.id
        })
        if (page) {
            await onCancel()
        }
    }

    const onCancel = async () => {
        setVisible(false)
        await removePageError()
    }

    return (
        <CmsModal
            isVisible={isVisible}
            title="Create a New Page"
            onOk={onOk}
            onCancel={onCancel}
        >
            <InputGroup
                label="Page Title:"
                value={pageData.title}
                name="title"
                onChange={onDataChange}
                error={error && error.hasOwnProperty('title') ? error.title : undefined}
            />
            <InputGroup
                label="Page Url:"
                value={pageData.url}
                name="url"
                onChange={onDataChange}
                error={error && error.hasOwnProperty('url') ? error.url : undefined}
                addonBefore={<label>http://yourdomain.com/</label>}
            />
        </CmsModal>
    )
}

interface PageCreateProps {
    isVisible: boolean,
    setVisible: (isVisible: boolean) => void
}