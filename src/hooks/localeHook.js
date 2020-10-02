import { useState } from 'react';
import { useStore } from 'outstated';
import { Defaults } from 'utils';
import { Settings } from 'utils';

function localeStore() {
    const [locale, setRawLocale] = useState(Defaults.locale);

    const setLocale = (locale) => {
        setRawLocale(locale);
        Defaults.locale = locale;
        Settings.setLocale(locale);
    }

    return { locale, setLocale };
}

function useLocale() {
    return useStore(localeStore);
}

export { localeStore, useLocale };