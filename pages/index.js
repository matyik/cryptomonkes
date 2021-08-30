import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function Home() {
  const leftbenefit = useRef(null)
  const centerbenefit = useRef(null)
  const rightbenefit = useRef(null)
  useEffect(() => {
    // Create the observer
    const observer = new IntersectionObserver((entries) => {
      // Loop over the entries
      entries.forEach((entry) => {
        // If the element is visible
        if (entry.isIntersecting) {
          // Add the animation class
          entry.target.classList.add('benefit-card-inview')
          return
        }
        // entry.target.classList.remove('benefit-card-inview')
      })
    })

    // Tell the observer which elements to track
    observer.observe(leftbenefit.current)
    observer.observe(centerbenefit.current)
    observer.observe(rightbenefit.current)
  }, [])

  const connectMetamask = async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
  }

  return (
    <>
      <Head>
        <title>Crypto Monkes</title>
      </Head>
      <nav>
        <span className='logo'>
          <Image
            width='50'
            height='50'
            src='/mainmonke.png'
            alt='Crypto Monkes'
          />{' '}
          <span>Crypto Monkes</span>
        </span>
        <span className='nav-links'>
          <Link href='#my'>My Monkes</Link>
          <Link href='#owners'>Owner Benefits</Link>
          <Link href='#claim'>Claim a Monke</Link>
        </span>
      </nav>
      <div className='slide-container left-slide'>
        <div className='monkestrip left1'>
          <Image src='/monkes.png' alt='Monkes' width='100' height='1000' />
        </div>
        <div className='monkestrip left2'>
          <Image src='/monkes.png' alt='Monkes' width='100' height='1000' />
        </div>
      </div>
      <div className='slide-container right-slide'>
        <div className='monkestrip right1'>
          <Image src='/monkes.png' alt='Monkes' width='100' height='1000' />
        </div>
        <div className='monkestrip right2'>
          <Image src='/monkes.png' alt='Monkes' width='100' height='1000' />
        </div>
      </div>
      <div className='hero'>
        <h1>
          Cr<span className='offset'>y</span>pto{' '}
          <span className='offset offset2'>M</span>onkes
        </h1>
        <p>
          A collection of 1,000 unique, 1 of 1, randomly generated Monkes on the
          Polygon network.
        </p>
        <button>Claim a Monke</button>
      </div>
      <div className='main' id='owners'>
        <h2>Owner Benefits</h2>
        <div className='benefits'>
          <div className='benefit-card leftcard' ref={leftbenefit}>
            <h3>Access to owners-only website</h3>
            <p>
              Monke owners get access to owners.cryptomonkes.com, where they can
              vote on community decisions and more.
            </p>
          </div>
          <div className='benefit-card' ref={centerbenefit}>
            <h3>Access to owners-only Discord server</h3>
            <p>
              Monke owners can join the Crypto Monkes Discord server, a place
              where they can chat and keep in touch with the community.
            </p>
          </div>
          <div className='benefit-card rightcard' ref={rightbenefit}>
            <h3>NFT Airdrops</h3>
            <ul>
              <li>
                Once all 1,000 Monkes are claimed, a random Monke owner will win
                this 1 of 1 Return to Monke NFT.
              </li>
              <li>
                The first 5 wallets to own 5 Monkes will receive a something.
              </li>
            </ul>
          </div>
        </div>
        <div className='claim-monke' id='claim'>
          <h2>Claim a Monke</h2>
          <div className='claim-box'>
            <button onClick={connectMetamask}>Connect Wallet</button>
          </div>
        </div>
      </div>
    </>
  )
}
