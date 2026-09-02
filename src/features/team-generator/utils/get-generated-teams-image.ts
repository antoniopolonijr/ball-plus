import domtoimage from "dom-to-image-more";

export async function generateTeamsImage(target: HTMLElement): Promise<Blob> {
  const blob = await domtoimage.toBlob(target, {
    pixelRatio: 2,

    onclone: (clone) => {
      if (!(clone instanceof HTMLElement)) {
        return;
      }

      clone.querySelectorAll("[data-share-exclude]").forEach((element) => {
        element.remove();
      });

      clone
        .querySelectorAll<HTMLElement>('[data-slot="table-container"]')
        .forEach((tableContainer) => {
          tableContainer.style.setProperty("overflow", "visible", "important");

          tableContainer.style.setProperty("height", "auto", "important");

          tableContainer.style.setProperty("max-height", "none", "important");
        });
    },
  });

  if (!blob) {
    throw new Error("Failed to generate image.");
  }

  return blob;
}
