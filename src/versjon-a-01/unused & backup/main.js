/*
simple router to route <a href="#/team-member/mathias"> to function or url given in map<path, RouteObject> 
note that the following will happen in order:
- if route is not found, log error to console and return
- if RouteObject.action is defined, it will be called and function will return
- if url is defined, it will be assigned to window.location which will load the url
*/

const createRouter = function() {
    let router = {};
    router.routes = {
        '/team-member/mathias': { url: 'team-member-mathias.htm', /*action: function () { alert('not going anywhere'); }*/ },
        '/team-member/magnus': { url: 'team-member-magnus.htm' },
        '/team-member/julian': { url: 'team-member-julian.htm' },
        '/team-member/hallvard': { url: 'team-member-hallvard.htm' },
        '/team-member/fahad': { url: 'team-member-fahad.htm' },
        '/team-member/price-nixon': { url: 'team-member-prince-nixon.htm' },
        '/team-member/bjarte': { url: 'team-member-bjarte.htm' },

        '/not-implemented': { action: function () { alert('#/not-implemented, not implemented route, catched by router'); } },
        '/catch': { action: function () { alert('#/catch in href, not implemented route, catched by router'); } },
    };
    //router.base_path = window.location.pathname;
    router.route = function () {
        let reset_hash = function () {
            // Temporarily change the hash to a dummy value
            location.hash = 'reset';

            // Reset the hash after a short delay
            setTimeout(function () {
                location.hash = ''; // Reset the hash
            }, 50); // Small delay to ensure the 'hashchange' event triggers

            // Use history.replaceState to remove the hash without triggering another hashch
            history.replaceState(null, null, window.location.pathname);
        };

        let get_path = function () {
            return location.hash.slice(1).toLowerCase() || '/';
        }

        console.log('routing...');

        // get path from location.hash, remove leading # and convert to lowercase
        let path = get_path();

        // Reset the hash without relying on the hashchange event
        lastHash = ''; // Clear the stored hash
        history.pushState("", document.title, window.location.pathname + window.location.search); // Reset the URL without hash


        let matched = router.routes[path];
        if (matched) {
            console.log('found route');
            console.log(arguments);
            console.log(path);
            console.log(matched);

            if (matched.action !== undefined) {
                matched.action();
            } else if (matched.url !== undefined) {
                console.log('redirecting to', matched.url);
                window.location = matched.url;
            }

        } else {
            console.log('unknown route');
            console.log(arguments);
            console.log(path);
        }
        return true;
    }
    return router;
}

const onDocumentReady = function () {
    // Add an event listener to the document to catch all clicks on <a> elements
    document.addEventListener('click', function (event) {
        console.log('something clicked', event.target.tagName.toLowerCase());
        // Check if the clicked element is an <a> tag
        if (event.target.tagName.toLowerCase() === 'a') {
            // Prevent the default behavior (optional)
            event.preventDefault();

            // Get the href attribute of the clicked <a> element
            const href = event.target.getAttribute('href');

            // Log or perform any action with the href
            console.log('Link clicked:', href);

            // Modify the hash or perform other actions
            location.hash = href;

            // Additional logic can be handled here
        }
    });

    /*
    erstatt <img type="link-to-main-page"> lenke til hovedside dynamisk
    */
    document.querySelectorAll('a[href="link-to-main-page"]').forEach(tag => {
        // Create the new <a> element
        const linkElement = document.createElement('a');
        linkElement.href = 'index.htm';
        linkElement.className = 'link-to-main-page';
        linkElement.textContent = 'Tilbake til hovedside';

        // Replace the found element with the new <a> element
        tag.replaceWith(linkElement);
    });


};


// create router and setup event listener for it
let router = createRouter();

// let hashchanges trigger routing to check location.hash
//window.addEventListener('hashchange', () => router.route());

// call onDocumentReady when document is ready
document.addEventListener('DOMContentLoaded', () => {
    onDocumentReady();
});