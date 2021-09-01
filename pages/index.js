import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [claimed, setClaimed] = useState(false)
  const [status, setStatus] = useState(['', ''])
  const [wallet, setWallet] = useState(null)
  const [email, setEmail] = useState(null)
  const leftbenefit = useRef(null)
  const centerbenefit = useRef(null)
  const rightbenefit = useRef(null)
  const claim = useRef(null)

  useEffect(() => {
    const claimStatus = localStorage.getItem('claimed')
    setClaimed(claimStatus)
    setStatus([
      claimStatus === 'true'
        ? 'Already claimed Monke!'
        : window.ethereum
        ? ''
        : 'Please install Metamask, a crypto wallet for your browser.',
      'status-red'
    ])

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
    setWallet(accounts[0])
  }

  const sendWallet = async () => {
    if (wallet) {
      try {
        const res = await axios.post(
          `/api/sendwallet?email=${email}&wallet=${wallet}`
        )
        setStatus([res.data.msg, res.data.color])
        setClaimed(true)
        localStorage.setItem('claimed', true)
      } catch (err) {
        setStatus(['An error occurred', 'status-red'])
      }
    } else {
      setStatus(['Please connect to Metamask', 'status-red'])
    }
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
        <button onClick={() => claim.current.scrollIntoView()}>
          Claim a Monke
        </button>
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
        <div className='claim-monke' id='claim' ref={claim}>
          <h2>Claim a Monke</h2>
          <p>
            To make claiming fair, each wallet is allowed to claim one monke.
            Monkes can be claimed for free. To claim, connect your wallet and
            click &quot;Claim&quot;. You can enter your email, which will be
            used to notify you when you are verified and your Monke has been
            transferred. After they are claimed, they can be sold on the
            secondary market.
          </p>
          <div className='claim-box'>
            <h3>Step 1</h3>
            <button disabled={wallet} onClick={connectMetamask}>
              {wallet ? wallet : 'Connect Wallet'}
            </button>
            <h3>Step 2</h3>
            <input
              type='email'
              placeholder='Email Address (optional)'
              onChange={(e) => setEmail(e.target.value)}
            />
            <button disabled={claimed === 'true'} onClick={sendWallet}>
              Claim Monke
            </button>
            <span className={`status ${status[1]}`}>{status[0]}</span>
          </div>
        </div>
        <footer>
          Created by <a href='http://matyi.pro'>Matyi Kari</a>
        </footer>
      </div>
    </>
  )
}
