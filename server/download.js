import ytdl from "ytdl-core"
import fs from "node:fs"

export const download = (videoId) => new Promise((resolve, reject) => {
  const videoURL = `https://www.youtube.com/shorts/${videoId}`

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000

      if (seconds > 60) {
        throw new Error("A duration of more than 60 seconds is not allowed")
      }
      console.log(`Baixando video...`)
    })
    .on("end", () => {
      console.log("Download finalizado")
      resolve("Download finalizado")
    })
    .on("error", (error) => {
      console.log("Erro ao baixar o vídeo: ", error)
      reject(error)
    })
    .pipe(fs.createWriteStream(`./tmp/audio.mp4`))
})