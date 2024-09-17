/*
simple router to route <a href="#/team-member/mathias"> to function or url given in map<path, RouteObject> 
note that the following will happen in order:
- if route is not found, log error to console and return
- if RouteObject.action is defined, it will be called and function will return
- if url is defined, it will be assigned to window.location which will load the url
*/

const dummyRouteAction = function () {
    alert('"#/catch" or "#/not-implemented", not implemented route, catched by router');
};

const createRouter = function () {
    let router = {};
    router.routes = {
        /*
        '/team-member/mathias': { url: 'team-member-mathias.htm' },
        '/team-member/magnus': { url: 'team-member-magnus.htm' },
        '/team-member/julian': { url: 'team-member-julian.htm' },
        '/team-member/hallvard': { url: 'team-member-hallvard.htm' },
        '/team-member/fahad': { url: 'team-member-fahad.htm' },
        '/team-member/price-nixon': { url: 'team-member-prince-nixon.htm' },
        '/team-member/bjarte': { url: 'team-member-bjarte.htm' },
        */
        '/team-member/mathias': { url: 'team-member-mathias.htm' },
        '/team-member/magnus': { url: 'team-member-mathias.htm' },
        '/team-member/julian': { url: 'team-member-mathias.htm' },
        '/team-member/hallvard': { url: 'team-member-mathias.htm' },
        '/team-member/fahad': { url: 'team-member-mathias.htm' },
        '/team-member/prince-nixon': { url: 'team-member-mathias.htm' },
        '/team-member/bjarte': { url: 'team-member-mathias.htm' },

        '/team-members': { url: 'team-members.htm' },
        '/data-collection': { url: 'data-collection.htm' },
        '/semantic-content': { url: 'semantic-content.htm' },
        '/service-subscribe': { url: 'service-subscribe.htm' },
        '/contact': { url: 'contact.htm' },
        '/about': { url: 'about.htm' },

        '/not-implemented': { action: dummyRouteAction },
        '/catch': { action: dummyRouteAction },
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

        console.group('routing...');

        // get path from location.hash, remove leading # and convert to lowercase
        let path = get_path();

        // Reset the hash without relying on the hashchange event
        //lastHash = ''; // Clear the stored hash
        //history.pushState("", document.title, window.location.pathname + window.location.search); // Reset the URL without hash

        let matched = router.routes[path];
        if (matched !== undefined) {
            console.log('found route');
            console.log(path);
            console.log(matched);

            if (matched.action !== undefined) {
                matched.action();
            } else if (matched.url !== undefined) {
                console.log('redirecting to', matched.url);
                window.location = matched.url;
            }

        } else {
            console.log('unknown route', path);
            console.log('routes', router.routes);
            console.log(path);
        }

        console.groupEnd();
        return true;
    }
    return router;
}

const onDocumentReady = function () {

    // Add an event listener to the document to catch all clicks on <a> elements
    document.addEventListener('click', function (event) {
        function findParentLinkCatcher() {
            // Start with the clicked element
            let element = event.target;

            // Traverse up the DOM tree to find the nearest <a> element with href="#/catch"
            while (element && element !== document) {
                // Check if the element is an <a> tag with the specified href
                if (element.tagName.toLowerCase() === 'a' && element.getAttribute('href') === '#/catch') {
                    // Found the target <a> element
                    //console.log('Found parent <a> with href="#/catch":', element);
                    dummyRouteAction();
                    // Perform your logic here
                    // ...

                    // Break the loop
                    return true;
                }

                // Move up to the parent element
                element = element.parentElement;
            }
            return false;
        }

        if (findParentLinkCatcher()) {
            // Prevent the default action of the <a> element
            event.preventDefault();
        };
    });
 
    /*
    erstatt <img type="link-to-main-page"> lenke til hovedside dynamisk
    */
    document.querySelectorAll('a[href="link-to-main-page"]').forEach(tag => {
        // Create the new <a> element
        const linkElement = document.createElement('a');
        linkElement.href = 'index.htm';
        linkElement.className = 'link-to-main-page ' + tag.className;
        linkElement.textContent = 'Tilbake til hovedside';

        // Replace the found element with the new <a> element
        tag.replaceWith(linkElement);
    });


};


// create router and setup event listener for it
let router = createRouter();

// let hashchanges trigger routing to check location.hash
window.addEventListener('hashchange', () => router.route());

// call onDocumentReady when document is ready
document.addEventListener('DOMContentLoaded', () => {
    onDocumentReady();
});