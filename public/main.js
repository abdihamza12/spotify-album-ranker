const client_id = "d10044f2d95d49b09c36e3bec519c6de"

const redirect_uri = 'https://rankd-testing.vercel.app/callback.html'

var auth_link = 'https://accounts.spotify.com/authorize?client_id=' +
                client_id + '&response_type=code&scope=user-library-read%20user-library-modify&redirect_uri=' + redirect_uri

/* auth_link is the direct link to the spotify authorization page where it will ask you to
 login to your spotify account and if you have cookies enabled it will save the information */

var login_button = document.getElementById('login-button')

login_button.href = auth_link

