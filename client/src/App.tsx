import React, {useEffect} from 'react';
import './App.css';
import {AppRouter} from "./router";
import {useWebsite} from "./utils/website";

function App() {
    const {websiteSettings, getWebsiteSettings} = useWebsite()
    useEffect(() => {
        if (!websiteSettings.settings) {
            getWebsiteSettings()
        }
    }, [websiteSettings, getWebsiteSettings])

    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = websiteSettings.settings?.favicon || '';

    return (
        <div>
            <AppRouter />
        </div>
    );
}

export default App;
