import { fetchUtils } from "react-admin";
import jsonServerProvider from "ra-data-json-server";

const fetchJsonUtil = (url, options={})=>{
    if(!options.headers){
        options.headers=new Headers({Accept: "application/json"})
    }
    options.headers.set("Authentication", localStorage.getItem("auth"));
    return fetchUtils.fetchJson(url, options);
};


export const dataProvider = jsonServerProvider("http://localhost:1337", fetchJsonUtil);