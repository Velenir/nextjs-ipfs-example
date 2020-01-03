import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'

const About = () => (
  <div>
    <Head>
      <title>About</title>
      <link rel="icon" href="favicon.ico" />
    </Head>

    <Nav />

    <div className="hero">
      <h1 className="title">About Page</h1>
      <p className="description">
        To get started, edit <code>pages/index.js</code> and save to reload.
      </p>

      <img src="example.png"/>
    </div>
  </div>
)

export default About
