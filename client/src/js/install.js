const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log("Event:" + event);

    // Store the triggered events
    window.deferredPrompt = event;

    // Remove hidden class from the imported button.
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Assign prompt event to the window.deferredPrompt to reference the beforeinstallprompt event to fire before install
    const promptEvent = window.deferredPrompt;

    // if promptEvent is falsey, function returns early
    if (!promptEvent) {
     return;
    }

    // Else show prompt to allow user to install 
    promptEvent.prompt();
    
    // Clear reference to the install prompt after it's been triggered
    window.deferredPrompt = null;
    
    // Re-hide class from the imported button 
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clear prompt
    window.deferredPrompt = null;

    console.log("App installed.")
});
