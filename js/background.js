import { loadAgent, setIcon } from "./functions.js";

chrome.runtime.onStartup.addListener(loadAgent)

setIcon()



