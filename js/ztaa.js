
import { makeDynamicRules, deleteDynamicRules } from "./functions.js";

document.addEventListener('DOMContentLoaded', function() {

    const header_name = document.getElementById('ztaa-header-name');
    const key = document.getElementById('ztaa-key');
    const server = document.getElementById('ztaa-server');

    // ZTAA Params
    chrome.storage.local.get(['ztaa-rules']).then( (rules) => {
        if(rules['ztaa-rules'] && Array.isArray(rules['ztaa-rules']) && rules['ztaa-rules'].length > 0) {
            const rule = rules['ztaa-rules'][0];
            server.value = rule[0];
            header_name.value = rule[1];
            key.value = rule[2];
        }
    });

    // Button
    const update_button = document.getElementById('ztaa-update-button');
    update_button.addEventListener('click', updateSettings);
});

function updateSettings() {

    // Get rules from UI
    const header_name = document.getElementById('ztaa-header-name').value;
    const key = document.getElementById('ztaa-key').value;
    const server = document.getElementById('ztaa-server').value;

    const rules_params = [];

    if( server && header_name && key ) {
        rules_params.push([server, header_name, key])
    }

    // Save rules in storage
    chrome.storage.local.set({ 'ztaa-rules': rules_params})
    .then( () => deleteDynamicRules())
    .then( () => { 
        if( rules_params.length > 0 ) {  makeDynamicRules(rules_params) }
    })

}


