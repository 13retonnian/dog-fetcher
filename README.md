# fetch GET: Retrieving data asynchronously
## Problem
Sometimes an asynchronous callback needs to happen after another asynchronous callback occurs. In the past, we had to use a callback within a callback. In the case of fetch, we need to:

1. Request JSON from a server. There is a network delay so we do this asynchronously; otherwise the browser will hang.
2. The browser receives `json` data from the server.
3. _Then_ we need to convert the `json` data into a javascript object. It could be a lot of data (that could hang the browser) so we also do this asynchronously.

**Problem**: How do we ensure that Step 3 happens after Step 2 when our original script ended at Step 1?

## Solution 1: Nested callbacks (the old way)
The old way was to place a callback function inside another callback function. This works but it can lead to [callback hell](http://callbackhell.com/).

## Solution 2: Promises
ES6 added [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) which allows us to do the same thing with (arguably) cleaner code. 

The `fetch` API uses promises to chain two asynchronous functions:
1. We request data from the server:

    ```js
    fetch(url)
    ```

2. This function returns a _promise_ containing `json` data, which we can access by attaching a function using the `.then()` syntax:

    ```js
    fetch(url).then(jsonHandler);
    ```

3. This function _also_ returns a promise containing the converted Javascript object, which we can access by attaching a function using the (you guessed it) `.then()` syntax:

    ```js
    fetch(url).then(jsonHandler).then(dataHandler);
    ```

4. This is great, but there could be errors along the way. If this happens in any part of the chain, the error will be caught by a `.catch()` function placed at the end of the chain.

    ```js
    fetch(url).then(jsonHandler).then(dataHandler).catch(error);
    ```

5. To make things more readable, we indent promise chains like so:

    ```js
    fetch(url)
      .then(jsonHandler)
      .then(dataHandler)
      .catch(error);
    ```

See the code in `script.js` for a working exampe using anonymous functions.

## Key Takeaways
1. You don't need to know how promises work under the hood in order to use them. You just need to know that only two things can happen when a promise is used:
    - `success`: A value is passed to the next `.then()`.
    - `failure`: An error is passed to the `.catch()` sitting at the end of the chain.
2. There is only one `.catch()` in a promise chain. If an error happens at any point in the chain, `.catch()` will be invoked.
3. Functions passed to `.then()` _must_ use the `return` statement in order for values to be passed to the next `.then()`.
4. The last `.then()` function doesn't need a `return` statement because it doesn't need a `return` statement.
5. `fetch` will only throw an error when there's a network problem, `404 Not Found` responses need to be handled in the first `.then()`:

    ```js
    if (!response.ok) {
      throw new Error('Not 200 OK');
    }
    ```
