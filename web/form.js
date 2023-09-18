import { api } from "./api.js";

const form = document.querySelector('#form');
const input = document.querySelector('#url');
export const content = document.querySelector('#content');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  content.classList.add('placeholder')

  const videoURL = input.value;

  if (!videoURL.includes('shorts')) {
    return content.textContent = 'Insira um URL válido do YouTube Shorts';
  }

  const [_, params] = videoURL.split('/shorts/')

  const [videoId] = params.split('?')

  content.textContent = 'Carregando...';

  const transcription = await api.get(`/summary/${videoId}`)

  content.textContent = transcription.data.result

  const summary = await api.post('/summary', {
    text: transcription.data.result
  })

  content.textContent = summary.data.result
  content.classList.remove('placeholder')

});