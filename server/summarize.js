import { pipeline } from '@xenova/transformers'

export async function getSummary(text) {
  try {
    console.log('Realizando resumo...')

    const generation = await pipeline('summarization', 'Xenova/distilbart-cnn-12-6')

    const output = await generation(text)

    console.log(output)

    return output[0].summary_text

  } catch (error) {
    console.log("Não foi possível realizar o resumo", error)
    throw new Error(error)
  }
}