import Localization from './localization';
import {useLocale} from "../hooks";

function format(str, args) {
    let a = str
    for (let k in args) {
        a = a.replace("{" + k + "}", args[k])
    }

    return a
};

function t(key, values) {
    if(!key || key === '' || key === undefined || key === null) return;
    const { locale } = useLocale();
    const keys = key.split('.');
    if (values && values.length > 0) {
        return format(Localization[keys[0]][keys[1]][locale], values);
    } else {
        return Localization[keys[0]][keys[1]][locale]
    }
}

export default t;
