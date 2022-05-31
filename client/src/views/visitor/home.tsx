import React, {useEffect} from "react";
import {Outlet} from "react-router";
import {Header} from "./layout/header";
import {Footer} from "./layout/footer";
import styled from "@emotion/styled";
import {useWebsite} from "../../utils/website";

export const Home = () => {
    const {websiteSettings} = useWebsite()

    return (
        <div>
            <Header title={websiteSettings.settings?.title || ''} />
            <Main>
                <Outlet />
            </Main>
            <Footer footerText={websiteSettings.settings?.footerText || ''} />
        </div>
    )
}

const Main = styled.main`
  min-height: calc(100vh - 10rem - 8.2rem);
  padding: 3rem 0;
`