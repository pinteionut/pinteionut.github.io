let booksArray = [];
let lastOrd = 0;

class Book {
    constructor(props) {
        this.chapter = props.chapter;
        this.title = props.title;
        this.imageLink = props.imageLink;
        this.author = props.author;
        this.publisher = props.publisher;
        this.year = props.year;
        this.price = props.price;
        this.link = props.link;
    }

    description() {
        return `${this.author}, ${this.publisher}, ${this.year}`;
    }

    info() {
        return [this.author, '$' + this.price, this.year]
    }
}

const renderBooks = () => {
    const container = $('.main');
    let uniqChapters =  getUniqChapters(booksArray);
    uniqChapters.forEach((chapter) => {
        let chapterRow = `
            <div class='row chapter-row'>
                    <div class='col-1 border centered-flex'>
                        <div>${chapter}</div>
                    </div>
                    <div class='col-11 container'>
                        ${booksRows(booksArray, chapter)}
                    </div>
            </div>
        `;
        container.append(chapterRow);
    })
    bindInfoClick();
}

const booksRows = (booksArray, chapter) => {
    let booksWithChapter = booksArray.filter((book) => book.chapter === chapter);
    rows = [];
    booksWithChapter.forEach((book) => {
        bookInfo = book.info().map((information) => `<span class='d-block'>${information}</span>`).join('');
        rows.push(`
            <div class='row book-row'>
                <div class='col-1 border centered-flex'>${++lastOrd}</div>
                <div class='col-9 border title'>
                    <div class='row font-weight-bold book-title'>${book.title}</div>
                    <div class='row font-italic book-description'>${book.description()}</div>
                </div>
                <div class='col-2 border centered-flex info-container'>
                    <img src="${book.imageLink}" />
                    <div class='d-none book-info' data-url="${book.link}" data-toggle="tooltip" title="Click aici pentru detalii!">
                        ${bookInfo}
                    </div>
                </div>
            </div>
        `)
    })
    return rows.join('');
}

const getUniqChapters = (booksArray) => {
    let chapters = [];
    booksArray.forEach((book) => {
        chapters.push(book.chapter);
    });
    return Array.from(new Set(chapters));
}

const populateDefaultBooks = () => {
    defaultBooks.forEach((book) => booksArray.push(new Book(book)));
}

const bindInfoClick = () => {
    $('.book-info').click((e) => {
        bookLink = $($(e.target).closest('.book-info')).attr('data-url');
        window.open(bookLink);
    })
}

const bindAddTestBookButton = () => {
    $('#add-test-book').click((e) => {
        e.preventDefault();
        e.stopPropagation();
        book = {
            chapter: 'Ruby',
            title: 'Ruby on Rails Tutorial',
            imageLink: 'https://images-na.ssl-images-amazon.com/images/I/41mVTCm%2Bg-L._SX380_BO1,204,203,200_.jpg',
            author: 'Michael Hartl',
            publisher: 'Addison-Wesley',
            year: '2019',
            link: 'https://www.amazon.com/Ruby-Rails-Tutorial-Addison-Wesley-Professional/dp/0134598628?ref_=fsclp_pl_dp_1',
            price: '37.99'
        }
        Object.keys(book).forEach((key) => {
            $(`#${key}`).val(book[key]); 
        })
    })
}

const bindAddBookButton = () => {
    $('#add-book-form').submit((e) => {
        e.preventDefault();
        e.stopPropagation();
        props = {}
        $('input').each((index, input) => {
            props[input.id] = input.value;
        })
        booksArray.push(new Book(props));
        rerenderBooks();
    })
}

const rerenderBooks = () => {
    lastOrd = 0;
    $('.chapter-row').remove();
    renderBooks();
}

$(document).ready(() => {
    populateDefaultBooks();
    renderBooks();
    bindAddTestBookButton();
    bindAddBookButton();
})
