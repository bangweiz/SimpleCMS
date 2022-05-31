import React, {useEffect} from "react";
import {HeadText} from "../../../components/head-text";
import {InputGroup} from "../../../components/input-group";
import {ImageUpload} from "../../../components/image-upload";
import {SelectGroup} from "../../../components/select-group";
import {usePages} from "../../../utils/page";
import {useWebsite, useWebsiteSettings} from "../../../utils/website";

export const WebsiteSettings = () => {
    const {websiteSettings} = useWebsite()
    const {pages} = usePages()
    const {settings, onInputChange, onSelectChange, setSettings, files, setFiles} = useWebsiteSettings()

    useEffect(() => {
        if (websiteSettings.settings)  {
            setSettings({
                ...websiteSettings.settings
            })
        }
    }, [websiteSettings, setSettings])

    const linkOptions = pages.map(page => {
        return {value: page.id + '', text: page.title}
    })

    return (
        <div>
            <div style={{marginBottom: '1.5rem'}}>
                <HeadText
                    textAlign="left"
                    content="Website Settings"
                    margin='1rem 0'
                />
                <div>
                    <InputGroup
                        label="Website Title:"
                        value={settings.title}
                        name="title"
                        onChange={onInputChange}
                    />
                    <ImageUpload files={files} setFiles={setFiles} />
                </div>
            </div>
            <div>
                <HeadText
                    textAlign="left"
                    content="Header Settings"
                    margin='1rem 0'
                />
                <div>
                    <SelectGroup
                        label="Nav Link 1:"
                        onChange={onSelectChange}
                        options={linkOptions}
                        value={settings.headerLinks}
                    />
                </div>
            </div>
            <div>
                <HeadText
                    textAlign="left"
                    content="Footer Settings"
                    margin="1rem 0"
                />
                <div>
                    <InputGroup
                        label="Footer Text:"
                        value={settings.footerText}
                        name="footerText"
                        onChange={onInputChange}
                    />
                </div>
            </div>
        </div>
    )
}