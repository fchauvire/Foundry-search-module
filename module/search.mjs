import { MODULE_ID } from "./constants.mjs";
import { openJournalToPage } from "./entryinterface.mjs";

export class SearchDialog extends Application {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "fullsearch-dialog",
      title: game.i18n.localize("FULLSEARCH.DialogTitle"),
      template: `modules/${MODULE_ID}/templates/search/search-dialog.hbs`,
      width: 500,
      height: "auto",
      resizable: true
    });
  }

  getData() {
    return {
      results: this.results || []
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find("#fullsearch-input").on("keyup", (event) => {
      if (event.key === "Enter") this._onSearch(html);
    });

    html.find("#fullsearch-submit").on("click", () => {
      this._onSearch(html);
    });

    html.find(".fullsearch-result-link").on("click", (event) => {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      openJournalToPage(dataset.journalId, dataset.pageId);
    });
  }

  _onSearch(html) {
    const query = html.find("#fullsearch-input").val().trim().toLowerCase();
    if (!query) return;

    const results = [];
    game.journals.forEach((journal) => {
      journal.pages.forEach((page) => {
        const text = page.text?.content || "";
        if (text.toLowerCase().includes(query)) {
          results.push({
            journalId: journal.id,
            journalTitle: journal.name,
            pageId: page.id,
            pageTitle: page.name
          });
        }
      });
    });

    this.results = results;
    this.render(false);
  }
}
