import React, {useEffect} from "react";
import {usePages} from "./utils/page";
import {Navigate, Route, Routes} from "react-router";
import {Home} from "./views/visitor/home";
import {BrowserRouter as Router} from "react-router-dom";
import {Admin} from "./views/admin/admin";
import {Login} from "./views/admin/login";
import {PageList} from "./views/admin/page/page-list";
import {PageDetail} from "./views/admin/page/page-detail";
import {useAuth} from "./utils/auth";
import {Page} from "./views/visitor/page";
import {Users} from "./views/admin/users";
import {Images} from "./views/admin/images";
import {WebsiteSettings} from "./views/admin/website-settings";

export const AppRouter = () => {
    const {pages, getPages} = usePages()
    const {user, bootstrap} = useAuth()

    useEffect(() => {
        if (!user) {
            bootstrap()
        }
    }, [user, bootstrap])

    useEffect(() => {
        if (pages.length === 0) {
            getPages()
        }
    }, [pages, getPages])


    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}>
                    {
                        pages.map(page => (
                            <Route key={page.id} path={page.url} element={<Page pageId={page.id} />} />
                        ))
                    }
                </Route>
                <Route path="/admin" element={user ? <Admin /> : <Login />}>
                    <Route path="pages" element={<PageList />} />
                    <Route path="pages/new" element={<PageDetail />} />
                    <Route path="pages/:pageId" element={<PageDetail />} />
                    <Route path="users" element={<Users />} />
                    <Route path="images" element={<Images />} />
                    <Route path="website-settings" element={<WebsiteSettings />} />
                    <Route path="" element={<Navigate to="pages" />} />
                </Route>
            </Routes>
        </Router>
    )
}
