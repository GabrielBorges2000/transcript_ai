import { pipeline } from '@xenova/transformers'

export async function getTranscription(audio) {
  try {
    console.log('Transcrevendo áudio...')
    const transcribe = await pipeline('automatic-speech-recognition', 'Xenova/whisper-small')

    const transcription = await transcribe(audio, {
      chunk_length: 30,
      stride_length: 5,
      language: 'portuguese',
      task: 'transcribe',
    })

    console.log('Transcrição finalizada com sucesso...')

    return transcription?.text.replace('[Música]', '')

  } catch (error) {
    throw new Error(error)
  }
}