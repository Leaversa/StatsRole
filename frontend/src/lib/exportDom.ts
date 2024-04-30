import * as htmlToImage from "html-to-image";

const filter = (node: HTMLElement) => !node.classList?.contains('image-export');

export default function exportDom(dom: HTMLElement | null) {
  if (!dom) {
    return;
  }
  htmlToImage
    .toBlob(dom, { filter: filter })
    .then(function (blob) {
      const img = new Image();
      if (!blob) {
        return;
      }
      img.src = URL.createObjectURL(blob);
      window.open(img.src);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}
