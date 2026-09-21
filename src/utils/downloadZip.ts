import { PROJECT_ZIP_BASE64 } from './projectZipData.ts';

/**
 * Downloads the full project source code as a ZIP file directly in the browser.
 * Uses in-memory base64 conversion to Blob so it works 100% offline and never triggers HTTP 403.
 */
export function triggerProjectZipDownload(filename = 'icity-core-source.zip'): boolean {
  try {
    // 1. Convert base64 to binary byte array in browser memory
    const binaryString = atob(PROJECT_ZIP_BASE64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // 2. Create blob
    const blob = new Blob([bytes], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);

    // 3. Trigger download via virtual <a> element
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    // 4. Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 10000);

    return true;
  } catch (err) {
    console.error('In-memory ZIP download failed, trying direct link fallback:', err);
    // Fallback: direct navigation
    const fallbackLink = document.createElement('a');
    fallbackLink.href = '/project-source.zip';
    fallbackLink.download = filename;
    fallbackLink.click();
    return false;
  }
}
