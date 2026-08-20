/**
 * Opens a Journal Entry to a specific page, centering it without animation.
 * @param {string} journalId 
 * @param {string} pageId 
 */
export async function openJournalToPage(journalId, pageId) {
  const journal = game.journals.get(journalId);
  if (!journal) return;

  const sheet = journal.sheet;

  // Store the target page ID on the sheet instance so renderJournalSheet hook processes it
  sheet._fullsearchTargetPageId = pageId;

  if (sheet.rendered) {
    await sheet.maximize();
    sheet.render(true, { pageId });
  } else {
    await sheet.render(true, { pageId });
  }
}
