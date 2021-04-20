import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.pagination__btn');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = this._data.totalPages;

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="pagination__btn pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <i class="fas fa-long-arrow-alt-right"></i>
        </button>
      `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="pagination__btn pagination__btn--prev">
          <i class="fas fa-long-arrow-alt-left"></i>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
    }

    // Other page
    if (curPage < numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="pagination__btn pagination__btn--prev">
          <i class="fas fa-long-arrow-alt-left"></i>
          <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="pagination__btn pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <i class="fas fa-long-arrow-alt-right"></i>
        </button>
      `;
    }

    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
