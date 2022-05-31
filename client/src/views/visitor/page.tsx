import React, {useEffect} from "react";
import {usePage} from "../../utils/page";
import {Blade} from "../../components/blade";

export const Page = (props: PageProps) => {
    const {pageId} = props
    const {page, getPage} = usePage()

    useEffect(() => {
        if (!page || page.id !== pageId) {
            getPage(pageId)
        }
    }, [page, getPage, pageId])

    return (
        <>
            {page?.blades.map(blade => (
                <Blade id={blade.id} name={blade.name} key={blade.id} />
            ))}
        </>
    )
}

interface PageProps {
    pageId: number
}