function log(n){}function onUriKnown(n){if(!n.pinned){var o=n.url,a=parseUri(o).host;chrome.tabs.query({pinned:!0},function(e){var t=_.find(e,function(n){return parseUri(n.url).host===a});t&&(chrome.tabs.update(t.id,{url:o,active:!0}),chrome.tabs.remove(n.id),chrome.windows.update(t.windowId,{focused:!0}))})}}function onTabCreated(n){var o=n.url;o?(log("Opening "+o),onUriKnown(n)):tabsToWatch.push(n.id)}function onTabUpdated(n,o,a){if(log("Updating: "+a.url),o.url){var e=tabsToWatch.indexOf(n);e>=0&&(tabsToWatch.splice(e,1),onUriKnown(a))}}var tabsToWatch=[];chrome.tabs.onCreated.addListener(onTabCreated),chrome.tabs.onUpdated.addListener(onTabUpdated);