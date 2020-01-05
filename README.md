## Deploying Next.js site to IPFS

1. Inject `<base href="<dynamic_url>">` into `<head>` at runtime:

```jsx
// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

const scriptTxt = `
(function () {
  const { pathname } = window.location
  const ipfsMatch = /.*\\/Qm\\w{44}\\//.exec(pathname)
  const base = document.createElement('base')

  base.href = ipfsMatch ? ipfsMatch[0] : '/'
  document.head.append(base)
})();
`

class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
            <script dangerouslySetInnerHTML={{__html: scriptTxt}}/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```

2. All local resources must have relative links to make use of **base.href**

```jsx
<img src="example.png"/>
// or
<img src="./example.png"/>
```

3. Compiled JavaScript assets should also respect **base.href**:

```js
// next.config.js
module.exports = {
  assetPrefix: './',
}
```

4. `Route.push|replace()` would normally override **location.pathname**, so need to provide a different **as** parameter.
One way to do it is with a custom  **Link** component:

```jsx
import {resolve} from 'url'

const BaseLink = ({href, as, ...rest}) => {

  const newAs = useMemo(() => {
    let baseURI_as = as || href
  
    // make absolute url relative
    // when displayed in url bar
    if (baseURI_as.startsWith('/')) {
      //  for static html compilation
      baseURI_as = '.' + href
      // <IPFSLink href="/about"> => <a class="jsx-2055897931" href="./about">About</a>
  
      // on the client
    //   document is unavailable when compiling on the server
      if (typeof document !== 'undefined') {
        baseURI_as = resolve(document.baseURI, baseURI_as)
        // => <a href="https://gateway.ipfs.io/ipfs/Qm<hash>/about">About</a>
      }
    }
    return baseURI_as
  }, [as, href])

  return <Link {...rest} href={href} as={newAs} />
}
```

This way a `<BaseLink href="/about">` would lead to `https://gateway.ipfs.io/ipfs/Qm<hash>/about` when clicked.

As IPFS doesn't support automatic redirect to index for 404 routes, which is commonly employed when hosting SPA, one may want `/about` route to lead to `https://gateway.ipfs.io/ipfs/Qm<hash>/about.html` file if that file was statically compiled. In that case there will be need for further **baseURI_as** modification beyond simple `baseURI_as += '.html'` if there's need to preserve hash and search queries, for example.

Or better yet use `exportTrailingSlash: true` in `next.config.js`. Then `pages/about.js` will be compiled to `out/about/index.html` and `/about` route will be available at `https://gateway.ipfs.io/ipfs/Qm<hash>/about/` which will survide page reloads without need for redirect to index for 404 routes:

```js
module.exports = {
  assetPrefix: './',
  exportTrailingSlash: true,
}
```

5. Build and export html files

```sh
yarn build && yarn export
```

6. Add output directory to ipfs

```sh
ipfs add -r out
```