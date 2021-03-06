import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Countdown from 'react-countdown'

export default function Home() {
  const [claimed, setClaimed] = useState(false)
  const [status, setStatus] = useState(['', ''])
  const [wallet, setWallet] = useState(null)
  const [email, setEmail] = useState(null)
  const [wHeight, setWHeight] = useState('0')
  const [stripWidth, setStripWidth] = useState('0')
  const leftbenefit = useRef(null)
  const centerbenefit = useRef(null)
  const rightbenefit = useRef(null)
  const claim = useRef(null)

  useEffect(() => {
    const claimStatus = localStorage.getItem('claimed')
    setWHeight(window.innerHeight)
    setStripWidth(window.innerHeight / 10)
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

  const Completionist = () => (
    <button onClick={() => claim.current.scrollIntoView()}>
      Claim a Monke
    </button>
  )

  return (
    <>
      <Head>
        <title>Crypto Monkes</title>
        <meta
          name='description'
          content='A collection of 1,000 unique, 1 of 1, randomly generated Monkes on the
          Polygon network. Return to monke and claim one for free on October 9th!'
        />
        <meta name='author' content='Matyi Kari'></meta>
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
          <Link href='#owners'>Owner Benefits</Link>
          <Link href='#claim'>Claim a Monke</Link>
        </span>
      </nav>
      <div
        className='slide-container left-slide'
        style={{ width: `${stripWidth}px` }}>
        <div className='monkestrip left1'>
          <Image
            src='/monkes.png'
            alt='Monkes'
            width={stripWidth}
            height={wHeight}
          />
        </div>
        <div className='monkestrip left2'>
          <Image
            src='/monkes.png'
            alt='Monkes'
            width={stripWidth}
            height={wHeight}
          />
        </div>
      </div>
      <div
        className='slide-container right-slide'
        style={{ width: `${stripWidth}px` }}>
        <div className='monkestrip right1'>
          <Image
            src='/monkes.png'
            alt='Monkes'
            width={stripWidth}
            height={wHeight}
          />
        </div>
        <div className='monkestrip right2'>
          <Image
            src='/monkes.png'
            alt='Monkes'
            width={stripWidth}
            height={wHeight}
          />
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
        <Countdown
          className='countdown'
          date={Date.parse('9 Oct 2021 15:00:00 MDT')}>
          <Completionist />
        </Countdown>
      </div>
      <div className='main' id='owners'>
        <h2>Owner Benefits</h2>
        <div className='benefits'>
          <div className='benefit-card leftcard' ref={leftbenefit}>
            <h3>Access to owners-only website</h3>
            <p>
              Monke owners get access to{' '}
              <a href='https://owners.cryptomonkes.com'>
                owners.cryptomonkes.com
              </a>
              , where they can vote on community decisions and more.
            </p>
          </div>
          <div className='benefit-card' ref={centerbenefit}>
            <h3>Access to owners-only Discord channels</h3>
            <p>
              Monke owners can join the Crypto Monkes Discord server and gain
              access to owners-only channels, a place where they can chat and
              keep in touch with the community.
            </p>
          </div>
          <div className='benefit-card rightcard' ref={rightbenefit}>
            <h3>NFT Airdrops</h3>
            <ul>
              <li>
                Once all 1,000 Monkes are claimed, a random Monke owner will win{' '}
                <a href='https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/95887810306434103298775717459816541535346390024696977889815916933460537638913'>
                  Acid Junkie #008
                </a>
                .
              </li>
              <li>
                The first 5 wallets to own 5 Monkes will receive a Caogan NFT.
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
            transferred. It may take up to 2 weeks to transfer. After they are
            claimed, they can be sold on the secondary market.
          </p>
          <div className='claim-box'>
            {Date.now() < Date.parse('9 Oct 2021 15:00:00 MDT')
              ? 'Claiming Starts October 9th'
              : 'Claiming Period Is Over!'}
          </div>
          <div className='links'>
            <a href='https://discord.gg/fvN6meTF7d'>
              <Image
                src='/discord.svg'
                alt='Discord'
                title='Discord'
                width='35'
                height='35'
              />
            </a>
            <a href='https://opensea.io/collection/monkescrypto'>
              <Image
                src='/opensea.svg'
                alt='Opensea'
                title='Opensea'
                width='35'
                height='35'
              />
            </a>
            <a href='https://twitter.com/MonkesCrypto'>
              <Image
                src='/twitter.svg'
                alt='Twitter'
                title='Twitter'
                width='35'
                height='35'
              />
            </a>
          </div>
        </div>
        <footer>
          Created by <a href='http://matyi.tech'>Matyi Kari</a>
        </footer>
      </div>
    </>
  )
}
