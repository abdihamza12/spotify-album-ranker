// import domtoimage from 'dom-to-image';
import * as htmlToImage from './node_modules/html-to-image';
import * as download from "./node_modules/download";
// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

const downloadBtn = document.getElementById("download_button");

downloadBtn.addEventListener('click', htmlToImg);

const node = document.getElementById("track-listing");

function htmlToImg() {
    console.log('clicked');
    htmlToImage.toPng(node)
    .then(function (dataUrl) {
    download(dataUrl, 'sorted-album.png');
  });
}
