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
    };
    //router.base_path = window.location.pathname;
    router.route = function () {
        console.log('routing...');

        let path = location.hash.slice(1).toLowerCase() || '/';

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
window.addEventListener('hashchange', () => router.route());

// call onDocumentReady when document is ready
document.addEventListener('DOMContentLoaded', () => {
    onDocumentReady();
});