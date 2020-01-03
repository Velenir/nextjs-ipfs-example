import React from 'react'
import Head from 'next/head'
import Nav from '../../components/nav'

const Deeper = () => (
  <div>
    <Head>
      <title>deep/p</title>
      <link rel="icon" href="favicon.ico" />
    </Head>

    <Nav />

    <div className="hero">
      <h1 className="title">Deeper Page</h1>
      <p className="description">
        To get started, edit <code>pages/index.js</code> and save to reload.
      </p>
      {/* all resources must be linked relaviely ("example.png" or "./example.png") for base.href to take effect */}
      <img src="example.png"/>
    </div>
  </div>
)

export default Deeper
