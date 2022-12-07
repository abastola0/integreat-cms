/**
 * Generate a page preview pop-up.
 */

export const openPreviewWindowInPageTree = (overlay: HTMLElement, btn: Element) => {
    fetch(btn.getAttribute("data-preview-page"))
        .then((response) => response.json())
        .then((data) => {
            // Set preview arguments based on database entries of the page.
            const { title } = data;
            const pageContent = data.page_translation;
            const mirroredPageContent = data.mirrored_translation;
            const mirroredPageFirst = data.mirrored_page_first;
            const rightToLeft = data.right_to_left;
            // If the language is read from right to left, change the text layout to align right.
            if (rightToLeft) {
                overlay.classList.add("text-right");
            } else {
                overlay.classList.remove("text-right");
            }
            // Insert title and page content.
            document.getElementById("preview-content-header").textContent = title;
            document.getElementById("preview-content-block").innerHTML = pageContent;
            // Insert mirrored page content before or after page content.
            const firstBlock = document.getElementById("preview-content-block-first");
            const lastBlock = document.getElementById("preview-content-block-last");
            if (mirroredPageFirst) {
                firstBlock.innerHTML = mirroredPageContent;
                lastBlock.innerHTML = "";
            } else {
                firstBlock.innerHTML = "";
                lastBlock.innerHTML = mirroredPageContent;
            }
            overlay.classList.remove("hidden");
            overlay.classList.add("flex");
        })
        .catch(() => {
            overlay.classList.remove("hidden");
            overlay.classList.add("flex");
            document.getElementById("preview-content-block").textContent =
                "Something went wrong. Please try again later.";
        });
};

const closePreviewWindow = (overlay: HTMLElement) => {
    overlay.classList.add("hidden");
    overlay.classList.remove("flex");
};

export const addPreviewWindowListeners = (callback: (overlay: HTMLElement, btn: Element) => void) => {
    const overlay = document.getElementById("preview_overlay");
    if (overlay) {
        document.querySelectorAll("[data-preview-page]").forEach((btn) => {
            if (!btn.hasAttribute("data-has-listener")) {
                btn.addEventListener("click", () => {
                    callback(overlay, btn);
                });
                btn.setAttribute("data-has-listener", "");
            }
        });
        document.getElementById("btn-close-preview").addEventListener("click", () => {
            closePreviewWindow(overlay);
        });
        // Close window by clicking on backdrop.
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                closePreviewWindow(overlay);
            }
        });
    }
};
