import {useDispatch, useSelector} from "react-redux";
import * as pageSlice from "../store/page.slice";
import React, {useCallback, useState} from "react";
import {Page, RawPage} from "../types/page";
import {PageStatus} from "../types/page";
import {SwapOrderArg} from "../types/auth";
import {Blade} from "../types/blade";

export const usePages = () => {
    const dispatch: (...args: any[]) => Promise<Page> = useDispatch()
    const pages = useSelector(pageSlice.selectPages)

    const getPages = useCallback(
        () => dispatch(pageSlice.getPages()),
        [dispatch]
    )

    return {
        pages,
        getPages,
    }
}

export const usePage = () => {
    const dispatch: (...args: any[]) => Promise<Page | null> = useDispatch()
    const page = useSelector(pageSlice.selectPage)
    const error = useSelector(pageSlice.selectPageError)

    const setPage = useCallback(
        (page: Page | null) => dispatch(pageSlice.setPage(page)),
        [dispatch]
    )

    const getPage = useCallback(
        (pageId: number | string) => dispatch(pageSlice.getPage(pageId)),
        [dispatch]
    )

    const swapBlades = useCallback(
        (blade1: SwapOrderArg, blade2: SwapOrderArg, oldBlades: Blade[]) => {
            return dispatch(pageSlice.swapBlades(blade1, blade2, oldBlades))
        },
        [dispatch]
    )

    const setBlades = useCallback(
        (blades: Blade[]) => dispatch(pageSlice.setBlades(blades)),
        [dispatch]
    )

    const updatePage = useCallback(
        (page: Partial<RawPage>, pageId: number | string) => dispatch(pageSlice.updateOnePage(page, pageId)),
        [dispatch]
    )

    const createPage = useCallback(
        (page: Partial<RawPage>) => dispatch(pageSlice.createPage(page)),
        [dispatch]
    )

    const deletePage = useCallback(
        (pageId: number | string) => dispatch(pageSlice.deletePage(pageId)),
        [dispatch]
    )

    const trashPage = useCallback(
        (pageId: number | string) => dispatch(pageSlice.trashPage(pageId)),
        [dispatch]
    )

    const removePageError = useCallback(
        () => dispatch(pageSlice.removePageError()),
        [dispatch]
    )

    return {
        page,
        error,
        setPage,
        getPage,
        swapBlades,
        setBlades,
        updatePage,
        createPage,
        deletePage,
        trashPage,
        removePageError
    }
}

export const usePageParams = (userId: number) => {
    const [pageData, setPageData] = useState({
        title: '',
        url: '',
        status: 1,
        userId
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPageData({
            ...pageData,
            [e.target.name]: e.target.value
        })
    }

    return {
        pageData,
        setPageData,
        onChange
    }
}

export const getPageStatus = (status: PageStatus) => {
    switch (status) {
        case PageStatus.DRAFT:
            return 'Draft'
        case PageStatus.PRIVATE:
            return 'Private'
        case PageStatus.PUBLISHED:
            return 'Published'
        case PageStatus.TRASH:
            return 'Trash'
    }
}
