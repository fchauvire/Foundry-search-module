import { MODULE_ID } from "./constants.mjs";
import { registerSettings } from "./settings.mjs";
import { SearchDialog } from "./search.mjs";

Hooks.once("init", () => {
  console.log(`${MODULE_ID} | Initializing Search and Highlight for Foundry VTT v12`);
  registerSettings();
});

Hooks.on("renderJournalDirectory", (app, html, data) => {
  const button = $(`
    <button type="button" class="fullsearch-btn">
      <i class="fas fa-search"></i> ${game.i18n.localize("FULLSEARCH.SearchButton")}
    </button>
  `);

  button.on("click", () => {
    new SearchDialog().render(true);
  });

  html.find(".directory-header .action-buttons").append(button);
});

Hooks.on("renderJournalSheet", (app, html, data) => {
  // Check if a page target was set during search navigation
  const targetPageId = app._fullsearchTargetPageId;
  if (!targetPageId) return;

  delete app._fullsearchTargetPageId;

  // Locate the page element within the v12 journal sheet view
  const pageElement = html.find(`[data-page-id="${targetPageId}"]`)[0];
  if (!pageElement) return;

  // Remove highlight class from any previously selected page
  html.find(".fullsearch-selected-page").removeClass("fullsearch-selected-page");

  // Apply rectangle highlight class
  pageElement.classList.add("fullsearch-selected-page");

  // Instantly jump to the target page positioned directly in the middle of Journal height
  pageElement.scrollIntoView({
    behavior: "instant",
    block: "center",
    inline: "nearest"
  });
});
