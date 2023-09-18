import express from 'express'
import cors from 'cors'

import { download } from './download.js'
import { getTranscription } from './transcribe.js'
import { getSummary } from './summarize.js'
import { convert } from './convert.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/summary/:id', async (req, res) => {
  try {
    await download(req.params.id)
    const audioConverted = await convert()

    const text = await getTranscription(audioConverted)

    const result = await getSummary(text)

    return res.json({ result })
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
})

app.post('/summary', async (req, res) => {
  try {

    const result = await getSummary(req.body.text)

    return res.json({ result })
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
})

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})