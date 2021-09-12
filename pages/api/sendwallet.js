import axios from 'axios'
export default async function handler(req, res) {
  let status
  if (req.method === 'POST') {
    if (Date.now() > Date.parse('25 Sept 2021 15:00:00 MDT')) {
      try {
        const res = await axios.post(
          `https://discord.com/api/webhooks/${process.env.WEBHOOK_URL}`,
          {
            content: `email: ${req.query.email}; wallet: ${req.query.wallet}`
          }
        )
        status = [
          200,
          'Successfully submitted. You will receive your Monke once you are verified.',
          'status-green'
        ]
      } catch (err) {
        status = [500, 'Internal Server Error', 'status-red']
      }
    } else {
      status = [400, 'Claiming Starts at 15:00 MDT', 'status-red']
    }
  } else {
    status = [400, 'There was an error.', 'status-red']
  }
  res.status(status[0]).json({ msg: status[1], color: status[2] })
}
