const CLIENT_ID = '9d352c74265941a'
const CARDS_DOCUMENT = document.querySelector("#cards");

const fetchAlbums = (albums = []) => {
    albums.forEach(album => fetchImages(album))
}

const fetchImages = (albumId) => {
    axios.get(`https://api.imgur.com/3/album/${albumId}/images`, {
        headers: {
            'Authorization': `Client-ID ${CLIENT_ID}`
        }
    }).then((res) => {
        let json = res.data;

        appendToDOM(json.data);
        createPagination()

    }).catch(() => {
        console.log("failed to fetch album images")
    })
}

let getCardElement = (post) => {

    let text = post.description != null ? post.description : "";
    let splitText = text.split("|");

    let title = splitText.length > 0 ? splitText[0] : "Plugin Development";
    let description = splitText.length > 1 ? splitText[1] : text;
    let link = splitText.length > 2 ? splitText[2] : "#";

    return createElementFromHTML(`<a href="${link}" target="_blank"><div class="card">
        <div class="caption">
          <div class="caption-content">
            <h2>${title}</h2>
            <p>${description}</p>
          </div>
        </div>
        <img src="${post.link}" alt="${description}">
      </div></a>`);
}

let appendToDOM = (posts) => {
    posts.map(post => {
        let fileType = getFileType(post.link);
        if (fileType === 'gif' || fileType === 'png' || fileType === 'jpg' || fileType === 'webp') {
            CARDS_DOCUMENT.appendChild(getCardElement(post));
        }
    });
};

function createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

function getFileType(filename) {
    return filename.split('.').pop();
}

/* -- */
fetchAlbums(["0mTZz2I"])