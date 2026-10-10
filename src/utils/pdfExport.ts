import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface PdfExportResult {
  success: boolean;
  blob?: Blob;
  blobUrl?: string;
  error?: string;
}

export async function downloadElementAsPdf(
  elementId: string,
  fileName: string = 'Fiche_Orientation_Candidature_2026.pdf',
  onProgress?: (loading: boolean) => void
): Promise<PdfExportResult> {
  const sourceElement = document.getElementById(elementId);
  if (!sourceElement) {
    console.error(`Element with id ${elementId} not found`);
    if (onProgress) onProgress(false);
    return { success: false, error: 'Élément introuvable' };
  }

  let isolatedClone: HTMLElement | null = null;

  try {
    if (onProgress) onProgress(true);

    // 1. Create an isolated off-screen clone
    isolatedClone = sourceElement.cloneNode(true) as HTMLElement;
    isolatedClone.id = 'temp-pdf-export-isolated-node';
    isolatedClone.style.position = 'fixed';
    isolatedClone.style.left = '-9999px';
    isolatedClone.style.top = '0';
    isolatedClone.style.width = '794px';
    isolatedClone.style.minWidth = '794px';
    isolatedClone.style.maxWidth = '794px';
    isolatedClone.style.backgroundColor = '#ffffff';
    isolatedClone.style.color = '#000000';
    isolatedClone.style.margin = '0';
    isolatedClone.style.padding = '0';
    isolatedClone.style.boxSizing = 'border-box';
    isolatedClone.style.transform = 'none';
    isolatedClone.style.zIndex = '-99999';

    // Neutralize animations
    const descendants = isolatedClone.querySelectorAll('*');
    descendants.forEach((node) => {
      const el = node as HTMLElement;
      el.style.animation = 'none';
      el.style.transition = 'none';
    });

    document.body.appendChild(isolatedClone);

    // Brief settle
    await new Promise((resolve) => setTimeout(resolve, 80));

    // Shared sanitizer function for html2canvas onclone
    const sanitizeClonedDoc = (clonedDoc: Document) => {
      const styleTags = clonedDoc.querySelectorAll('style');
      styleTags.forEach((tag) => {
        if (tag.textContent) {
          if (tag.textContent.includes('oklch')) {
            tag.textContent = tag.textContent.replace(/oklch\([^)]+\)/gi, '#111827');
          }
          if (tag.textContent.includes('color-mix')) {
            tag.textContent = tag.textContent.replace(/color-mix\([^)]+\)/gi, '#e5e7eb');
          }
        }
      });

      if (clonedDoc.body) {
        clonedDoc.body.style.backgroundColor = '#ffffff';
        clonedDoc.body.style.color = '#000000';
      }
    };

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210 mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297 mm

    // Look for dedicated .pdf-page elements
    const pageElements = isolatedClone.querySelectorAll<HTMLElement>('.pdf-page');

    if (pageElements.length > 0) {
      // PAGE-BY-PAGE RENDERING: guarantees zero slicing across text or signatures!
      for (let i = 0; i < pageElements.length; i++) {
        const pageEl = pageElements[i];

        if (i > 0) {
          pdf.addPage();
        }

        const pageCanvas = await html2canvas(pageEl, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
          width: 794,
          height: 1123,
          scrollX: 0,
          scrollY: 0,
          onclone: sanitizeClonedDoc,
        });

        const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.96);
        pdf.addImage(pageImgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      }
    } else {
      // Fallback: single element render
      const canvas = await html2canvas(isolatedClone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 794,
        scrollX: 0,
        scrollY: 0,
        onclone: sanitizeClonedDoc,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.96);
      const imgProps = pdf.getImageProperties(imgData);
      const renderHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = renderHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, renderHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;

      while (heightLeft > 5) {
        position = heightLeft - renderHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, renderHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }
    }

    // Clean up isolated clone
    if (isolatedClone && isolatedClone.parentNode) {
      isolatedClone.parentNode.removeChild(isolatedClone);
      isolatedClone = null;
    }

    // Generate Blob and trigger direct file download
    const pdfBlob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);

    // Primary download method: simulated anchor click
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = blobUrl;
    downloadAnchor.download = fileName;
    downloadAnchor.style.display = 'none';
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();

    // Secondary download method
    try {
      pdf.save(fileName);
    } catch {
      // Ignored
    }

    setTimeout(() => {
      try {
        if (downloadAnchor.parentNode) {
          downloadAnchor.parentNode.removeChild(downloadAnchor);
        }
      } catch {}
    }, 2000);

    if (onProgress) onProgress(false);
    return { success: true, blob: pdfBlob, blobUrl };
  } catch (error) {
    console.error('Error generating or downloading PDF:', error);

    if (isolatedClone && isolatedClone.parentNode) {
      try {
        isolatedClone.parentNode.removeChild(isolatedClone);
      } catch {}
    }

    if (onProgress) onProgress(false);

    try {
      window.print();
    } catch {}

    return { success: false, error: String(error) };
  }
}
