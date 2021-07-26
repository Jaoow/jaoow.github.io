// How many items per page to show
const SHOW_PER_PAGE = 6;

let createPagination = () => {

    // Cards element
    const cards = $('#cards')

    // Getting the amount of elements inside cards div
    const numberOfItems = cards.children().length;

    // Calculate the number of pages we are going to have
    const pagesNum = Math.ceil(numberOfItems / SHOW_PER_PAGE);

    // Set the value of our hidden input fields
    $('#current_page').val(0);

    let navigation_html =
        '<li class="pagination-item is-prev">' +
        '<a class="previous_link" href="javascript:previous();">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>' +
        '</a></li>';

    let current_link = 0;
    while (pagesNum > current_link) {
        navigation_html += '<li class="pagination-item is-page" id="' + current_link + '"><a class="page_link" href="javascript:goToPage(' + current_link + ')">' + (current_link + 1) + '</a></li>';
        current_link++;
    }

    navigation_html +=
        '<li class="pagination-item is-next">' +
        '<a class="next_link" href="javascript:next();">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' +
        '</a></li>';

    $('#page_navigation').html(navigation_html);

    // Add Active class to the first page link
    $('.is-page:first').addClass('is-active');

    // Hide all the elements inside cards div
    cards.children().css('display', 'none');

    // And show the first n (show_per_page) elements
    cards.children().slice(0, SHOW_PER_PAGE).css('display', 'block')
}

// Pagination JS
function previous() {
    let new_page = parseInt($('#current_page').val()) - 1;
    // If there is an item before the current active link run the function
    if ($('.is-active').prev('.is-page').length === 1) {
        goToPage(new_page);
    }
}

function next() {
    let new_page = parseInt($('#current_page').val()) + 1;
    // If there is an item after the current active link run the function
    if ($('.is-active').next('.is-page').length === 1) {
        goToPage(new_page);
    }
}

function goToPage(pageNum) {

    // Get the element number where to start the slice from
    let startFrom = pageNum * SHOW_PER_PAGE;

    // Get the element number where to end the slice
    let endOn = startFrom + SHOW_PER_PAGE;

    // Hide all children elements of cards div, get specific items and show them
    $('#cards').children().css('display', 'none').slice(startFrom, endOn).css('display', 'block');
    $('.pagination-item[id=' + pageNum + ']').addClass('is-active').siblings('.is-active').removeClass('is-active');

    // update the current page input field
    $('#current_page').val(pageNum);
}

/* -- */
createPagination()