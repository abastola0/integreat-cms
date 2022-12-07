import { getCsrfToken } from "../utils/csrf-token";

const updateTranslationForm = (data: any) => {
    // Hide warning
    document.getElementById("currently-in-translation-warning").classList.add("hidden");
    // Hide initial "currently-in-translation" icon
    document.getElementById("currently-in-translation-state").classList.add("hidden");
    // Reset to the new icon (either up to date or outdated)
    document.getElementById(`reset-translation-state-${data.translationState}`).classList.remove("hidden");
};

/*
sends ajax request for updating all pages
to the given translationState
*/
const cancelTranslationState = async (url: string) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "HTTP_X_REQUESTED_WITH": "XMLHttpRequest",
            "X-CSRFToken": getCsrfToken(),
        },
    });
    return response.json();
};

/*
These functions get triggered when user reset the currently_in_translation state
ajax POST request for database update is send, update of translation state icons accordingly
*/
const unsetTranslationState = (event: Event) => {
    event.preventDefault();
    // fetch url from template
    const { url } = document.getElementById("cancel-translation").dataset;
    // send ajax request for database update
    cancelTranslationState(url)
        // on success update GUI
        .then((response) => updateTranslationForm(response));
    console.debug("Cancelled translation process");
};

window.addEventListener("load", () => {
    document.getElementById("cancel-translation")?.addEventListener("click", unsetTranslationState);
});
