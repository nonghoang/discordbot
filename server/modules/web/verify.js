import {
    findById
} from 'services/active';

import {
    activeUser
} from 'services/user';

import {
    URL_WEBSITE
} from 'config/config';

export async function verifyEmail(req, res, next) {
    const active = await findById(req.params.activeId);

    if (!active) {
        return res.send('Verify email error!');
    }

    const user = await activeUser(active.userId);

    if (!user) {
        return res.send('Verify email error!');
    }

    const html = `<h3>Signalleaks verification success. Redirect to login page.</h3><script>setTimeout(function(){window.location.href = "${URL_WEBSITE}"}, 1000)</script>`;
    res.send(html);
}
