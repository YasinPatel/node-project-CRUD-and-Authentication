// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1584867501533643', // your App ID
        'clientSecret'  : '3fb918ff6794dc187be80a4ef144478b', // your App Secret
        'callbackURL'   : 'http://localhost:8081/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'K9gSI4hkyDb9tNg1fAazn3CiL',
        'consumerSecret'    : 'QQAn5YbWWvXDFvgYzPU4Gm0KMug9AxjvFIkdYij7PXTHS3u2zq',
        'callbackURL'       : 'http://yasin.com:8081/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '331542046444-pirnvbee65mg96cqjbn3qa914hl0mei9.apps.googleusercontent.com',
        'clientSecret'  : 'Pdbcix1Uuppqc4rn9XqhbqUy',
        'callbackURL'   : 'http://yasin.com:8081/auth/google/callback'
    },
    'linkedinAuth' : {
        'consumerKey'      : '78pjkj7jr8834o',
        'consumerSecret'  : 'PPD6gxbRs8X4JReb',
        'callbackURL'   : 'http://localhost:8081/auth/linkedin/callback'
    },
    'githubAuth' : {
        'clientID'      : 'bd166a7475faaa6aa7f7',
        'clientSecret'  : '3291170fa184e91290a87af3046bd0bd61d8ed11',
        'callbackURL'   : 'http://localhost:8081/auth/github/callback'
    }

};
