import Router from 'next/router'

export default function redirectTo(destination, {res, status} = {}) {
    if (res) {
        res.writeHead(status || 302, {Location: destination})
        res.end()
    } else {
        if (destination[0] === '/Init' && destination[1] !== '/Init') {
            Router.push(destination)
        } else {
            window.location = destination
        }
    }
}