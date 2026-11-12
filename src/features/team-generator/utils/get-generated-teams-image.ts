import domtoimage from "dom-to-image-more";

const CAPTURE_WIDTH = 768;
const EXPORT_PIXEL_RATIO = 2;

function getCaptureBackground(): string {
  const bodyBackground = getComputedStyle(document.body).backgroundColor;

  if (bodyBackground !== "rgba(0, 0, 0, 0)") {
    return bodyBackground;
  }

  const themeBackground = getComputedStyle(document.documentElement)
    .getPropertyValue("--background")
    .trim();

  return themeBackground || "#FFFFFF";
}

function copyThemeAttributes(source: HTMLElement, destination: HTMLElement) {
  for (const attribute of ["class", "style", "lang", "dir", "data-theme"]) {
    const value = source.getAttribute(attribute);

    if (value !== null) {
      destination.setAttribute(attribute, value);
    }
  }
}

async function copyPageStyles(
  sourceDocument: Document,
  captureDocument: Document,
) {
  const pendingLoads: Promise<void>[] = [];

  for (const element of Array.from(sourceDocument.head.children)) {
    if (element.tagName === "STYLE") {
      captureDocument.head.appendChild(element.cloneNode(true));
      continue;
    }

    if (element.tagName !== "LINK") {
      continue;
    }

    const sourceLink = element as HTMLLinkElement;

    if (!sourceLink.relList.contains("stylesheet") || sourceLink.disabled) {
      continue;
    }

    const link = captureDocument.createElement("link");

    for (const attribute of Array.from(sourceLink.attributes)) {
      link.setAttribute(attribute.name, attribute.value);
    }

    // Use an absolute URL so the stylesheet resolves correctly in srcdoc.
    link.href = sourceLink.href;

    const loaded = new Promise<void>((resolve) => {
      link.addEventListener("load", () => resolve(), { once: true });
      link.addEventListener("error", () => resolve(), { once: true });
    });

    captureDocument.head.appendChild(link);
    pendingLoads.push(loaded);
  }

  await Promise.all(pendingLoads);
}

async function createCaptureFrame(height: number): Promise<HTMLIFrameElement> {
  const iframe = document.createElement("iframe");

  iframe.setAttribute("aria-hidden", "true");
  iframe.tabIndex = -1;

  // Keep the frame outside the visible page without using display:none.
  iframe.style.cssText = `
    position: fixed;
    left: -12000px;
    top: 0;
    width: ${CAPTURE_WIDTH}px;
    height: ${height}px;
    border: 0;
    pointer-events: none;
  `;

  const loaded = new Promise<void>((resolve, reject) => {
    iframe.addEventListener("load", () => resolve(), { once: true });
    iframe.addEventListener(
      "error",
      () => {
        reject(new Error("Failed to initialize image capture frame."));
      },
      { once: true },
    );
  });

  iframe.srcdoc = `
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=${CAPTURE_WIDTH}, initial-scale=1"
        />
      </head>
      <body></body>
    </html>
  `;

  document.body.appendChild(iframe);

  await loaded;

  return iframe;
}

async function waitForImages(target: HTMLElement) {
  const images = Array.from(target.querySelectorAll("img"));

  await Promise.all(
    images.map(async (image) => {
      if (!image.complete) {
        await new Promise<void>((resolve) => {
          image.addEventListener("load", () => resolve(), { once: true });
          image.addEventListener("error", () => resolve(), { once: true });
        });
      }

      try {
        await image.decode();
      } catch {
        // A failed image should not prevent the remaining content
        // from being exported.
      }
    }),
  );
}

function prepareCaptureTarget(target: HTMLElement) {
  target.querySelectorAll("[data-share-exclude]").forEach((element) => {
    element.remove();
  });

  target
    .querySelectorAll<HTMLElement>('[data-slot="table-container"]')
    .forEach((tableContainer) => {
      tableContainer.style.setProperty("overflow", "visible", "important");
      tableContainer.style.setProperty("height", "auto", "important");
      tableContainer.style.setProperty("max-height", "none", "important");
    });
}

export async function generateTeamsImage(target: HTMLElement): Promise<Blob> {
  if (!target.isConnected) {
    throw new Error("The image target is not connected to the document.");
  }

  const frameHeight = Math.max(target.scrollHeight + 500, 1200);
  const iframe = await createCaptureFrame(frameHeight);

  try {
    const captureDocument = iframe.contentDocument;
    const captureWindow = iframe.contentWindow;

    if (!captureDocument || !captureWindow) {
      throw new Error("Could not access the image capture document.");
    }

    // Preserve the application's active theme.
    copyThemeAttributes(
      document.documentElement,
      captureDocument.documentElement,
    );

    copyThemeAttributes(document.body, captureDocument.body);

    // Copy the actual application stylesheets, including Tailwind
    // responsive rules and the application's fonts.
    const base = captureDocument.createElement("base");
    base.href = document.baseURI;
    captureDocument.head.prepend(base);

    await copyPageStyles(document, captureDocument);

    // Ensure the iframe behaves like a CAPTURE_WIDTH viewport.
    const viewportStyle = captureDocument.createElement("style");

    viewportStyle.textContent = `
      html,
      body {
        width: ${CAPTURE_WIDTH}px !important;
        min-width: ${CAPTURE_WIDTH}px !important;
        max-width: none !important;
        margin: 0 !important;
      }

      body {
        overflow: visible !important;
      }
    `;

    viewportStyle.textContent += `
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
  }
`;

    captureDocument.head.appendChild(viewportStyle);

    // Clone the real GeneratedTeamsCard DOM.
    const captureTarget = target.cloneNode(true) as HTMLElement;

    captureTarget.style.setProperty("width", `${CAPTURE_WIDTH}px`, "important");

    captureTarget.style.setProperty(
      "min-width",
      `${CAPTURE_WIDTH}px`,
      "important",
    );

    captureTarget.style.setProperty("max-width", "none", "important");

    prepareCaptureTarget(captureTarget);

    captureDocument.body.appendChild(captureTarget);

    // Wait for the copied fonts, images and responsive layout.
    await captureDocument.fonts.ready;
    await waitForImages(captureTarget);

    await new Promise<void>((resolve) => {
      captureWindow.requestAnimationFrame(() => {
        captureWindow.requestAnimationFrame(() => resolve());
      });
    });

    const width = CAPTURE_WIDTH;
    const height = Math.ceil(
      Math.max(
        captureTarget.scrollHeight,
        captureTarget.getBoundingClientRect().height,
      ),
    );

    const captureBackground = getCaptureBackground();

    const blob = await domtoimage.toBlob(captureTarget, {
      width,
      height,
      pixelRatio: EXPORT_PIXEL_RATIO,
      bgcolor: captureBackground,

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
            tableContainer.style.setProperty(
              "overflow",
              "visible",
              "important",
            );
            tableContainer.style.setProperty("height", "auto", "important");
            tableContainer.style.setProperty("max-height", "none", "important");
          });
      },
    });

    if (!blob || blob.size === 0) {
      throw new Error("Failed to generate the teams image.");
    }

    return blob;
  } finally {
    iframe.remove();
  }
}
