import React, {useMemo} from 'react'
import Link from 'next/link'
import {resolve} from 'url'

const links = [
  { href: 'https://zeit.co/now', label: 'ZEIT' },
  { href: 'https://github.com/zeit/next.js', label: 'GitHub' },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

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
      if (typeof document !== 'undefined') {
        baseURI_as = resolve(document.baseURI, baseURI_as)
        // => <a href="https://gateway.ipfs.io/ipfs/Qm<hash>/about">About</a>
      }
    }
    return baseURIAs
  }, [as, href])

  return <Link {...rest} href={href} as={newAs} />
}

const Nav = () => (
  <nav>
    <ul>
      <li>
        <BaseLink href="/">
          <a>Home</a>
        </BaseLink>
      </li>
      <li>
        <BaseLink href="/about">
          <a>About</a>
        </BaseLink>
      </li>
      <li>
        <BaseLink href="/deep/p">
          <a>Deep Page</a>
        </BaseLink>
      </li>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <a href={href}>{label}</a>
        </li>
      ))}
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
)

export default Nav
