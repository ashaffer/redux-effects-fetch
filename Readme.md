# redux-effects-fetch 
(DEPRECATED: official project is here (https://github.com/redux-effects/redux-effects-fetch)

Declarative data fetching for [redux](https://github.com/rackt/redux)

## Installation

`npm install redux-effects-fetch`

## Usage

This package is designed to be used in conjunction with [redux-effects](https://github.com/ashaffer/redux-effects).  Use it like this:

```javascript
import effects from 'redux-effects'
import fetch from 'redux-effects-fetch'

applyMiddleware(effects(fetch))(createStore)
```

## Action creators

You can create your own action creators for this package, or you can use [declarative-fetch](https://github.com/ashaffer/declarative-fetch).  The action format is simple:

`{type: 'EFFECT', payload: {type: 'FETCH', url, params}}`

Where `url` and `params` are what you would pass as the first and second arguments to the native `fetch` API.  If you want your action creators to support some async flow control, you should wrap your action in a [declarative-promise](https://github.com/ashaffer/declarative-promise) (the [declarative-fetch](https://github.com/ashaffer/declarative-fetch) package does this for you).

## Examples

### Creating a user

```javascript
import fetch from 'declarative-fetch'
import {createAction} from 'redux-actions'

function signupUser (user) {
  return fetch(api + '/user', {
    method: 'POST',
    body: user
  }).then(userDidLogin, setError)
}

const userDidLogin = createAction('USER_DID_LOGIN')
const setError = createAction('SET_ERROR')
```

This works exactly as if you were working with the native `fetch` API, except your request is actually being executed by middleware.

### Handling loading states

For this I recommend the use of [redux-multi](https://github.com/ashaffer/redux-multi), which allows you to dispatch more than one action at a time.

```javascript
import fetch from 'declarative-fetch'
import {createAction} from 'redux-actions'

function signupUser (user) {
  return [
    signupIsLoading(),
    fetch(api + '/user', {
      method: 'POST',
      body: user
    }).then(userDidLogin, setError)
  ]
}

const signupIsLoading = createAction('SIGNUP_IS_LOADING')
const userDidLogin = createAction('USER_DID_LOGIN')
const setError = createAction('SET_ERROR')
```

