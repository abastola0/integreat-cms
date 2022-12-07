/*
 * This file contains all functions used for the icon field
 */
import { render } from "preact";
import SelectMedia from "../media-management/select-media";

// Set event handlers
window.addEventListener("load", () => {
    const iconField = document.getElementById("id_icon");
    const setIconButton = document.getElementById("set-icon-button");
    const removeButton = document.getElementById("remove-icon");
    const restoreButton = document.getElementById("restore-icon");

    /**
     * Handles all UI elements when an icon is removed
     */
    const removeIcon = () => {
        // Hide preview
        document.getElementById("icon_preview").classList.add("hidden");
        // Change icon label
        document.getElementById("change-icon-label").classList.add("hidden");
        document.getElementById("set-icon-label").classList.remove("hidden");
        // Toggle remove/restore buttons
        document.getElementById("remove-icon").classList.add("hidden");
        document.getElementById("restore-icon").classList.remove("hidden");
        // Remove any association from field
        (iconField as HTMLInputElement).value = null;
    };

    /**
     * Handles all UI elements when an icon is selected or restored
     */
    const setIcon = () => {
        // Show preview
        document.getElementById("icon_preview").classList.remove("hidden");
        // Change icon label
        document.getElementById("set-icon-label").classList.add("hidden");
        document.getElementById("change-icon-label").classList.remove("hidden");
        // Toggle remove/restore buttons
        document.getElementById("restore-icon").classList.add("hidden");
        document.getElementById("remove-icon").classList.remove("hidden");
    };

    /**
     * Updates the icon preview and UI for clearing.
     *
     * @param string - path of the selected icon
     */
    const updateIconDisplay = (file: any) => {
        // Fill in uploaded file path
        document.querySelector("#icon_preview img").setAttribute("src", file.thumbnailUrl);
        document.getElementById("icon_filename").innerText = file.name;
        // Update UI elements
        setIcon();
    };

    const setIconWithMediaLibrary = () => {
        const el: HTMLElement = document.createElement("div");
        document.body.append(el);
        const mediaConfigData = JSON.parse(document.getElementById("media_config_data").textContent);
        render(
            <SelectMedia
                {...mediaConfigData}
                onlyImage
                cancel={() => el.remove()}
                selectMedia={(file) => {
                    console.debug("File selected as icon:", file);
                    (iconField as HTMLInputElement).value = file.id.toString();
                    el.remove();
                    updateIconDisplay(file);
                    setIcon();
                }}
            />,
            el
        );
    };

    if (iconField) {
        iconField.addEventListener("change", updateIconDisplay);
    }
    if (removeButton) {
        removeButton.addEventListener("click", removeIcon);
    }
    if (restoreButton) {
        restoreButton.addEventListener("click", setIcon);
    }
    if (setIconButton) {
        setIconButton.addEventListener("click", setIconWithMediaLibrary);
    }
});
