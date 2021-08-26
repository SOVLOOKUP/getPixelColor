import { screen, mouse } from "@nut-tree/nut-js"
import { FileType } from "@nut-tree/nut-js/dist/lib/file-type.enum"
import jimp from 'jimp'
import os from 'os'

const tmpDir = os.tmpdir()

enum OutFormat {
    RGBA = 'RGBA',
    HEX16 = "HEX16"
}

export default async function getPointPixelColor(
    filePath?: string,
    fileName?: string,
    outputFormat: OutFormat = OutFormat.HEX16
) {
    fileName = fileName || Date.now().toString()
    filePath = filePath || tmpDir
    
    const position = mouse.getPosition()
    const img = await jimp.read(await screen.capture(fileName,FileType.PNG,filePath))
    const point = await position
    const hex = img.getPixelColor(point.x, point.y)
    
    // rgba format
    if (outputFormat === OutFormat.RGBA) {
        return jimp.intToRGBA(hex)
    }

    // default format hex16
    return "#" + hex.toString(16).toUpperCase()
}

(async () => {
    console.log(await getPointPixelColor())
})();

