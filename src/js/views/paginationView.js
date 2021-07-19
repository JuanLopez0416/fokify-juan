import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector(`.pagination`);

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupBtn('next', currentPage);
    }

    // last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupBtn('prev', currentPage);
    }

    // other page
    if (currentPage < numPages) {
      return (
        this._generateMarkupBtn('prev', currentPage) +
        this._generateMarkupBtn('next', currentPage)
      );
    }

    // Page 1, and there are no more pages
    return '';
  }

  _generateMarkupBtn(direction, page) {
    return `
          <button class="btn--inline pagination__btn--${direction}" data-goto="${
      direction === 'next' ? page + 1 : page - 1
    }">
          ${direction === 'next' ? '<span>Page ' + (page + 1) + '</span>' : ''}
          
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-${
      direction === 'next' ? 'right' : 'left'
    }"></use>
            </svg>
            ${
              direction === 'prev' ? '<span>Page ' + (page - 1) + '</span>' : ''
            }
        </button>
          `;
  }
}

export default new PaginationView();
