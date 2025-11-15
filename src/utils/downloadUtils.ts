// Utility functions for handling file downloads
import { marked } from 'marked';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const downloadFile = async (filePath: string, fileName: string): Promise<void> => {
  try {
    const response = await fetch(filePath);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary anchor element and trigger the download
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.style.display = 'none';
    
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    
    // Clean up the blob URL
    window.URL.revokeObjectURL(url);
    
    console.log(`Successfully downloaded: ${fileName}`);
  } catch (error) {
    console.error('Download failed:', error);
    alert(`Failed to download ${fileName}. Please try again.`);
  }
};

export const downloadResume = async () => {
  let container: HTMLDivElement | null = null;
  
  try {
    // Fetch the markdown file
    const response = await fetch('/resume/Prithiv_Raj_Resume_Nov_25.md');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch resume: ${response.statusText}`);
    }
    
    const markdown = await response.text();
    
    // Configure marked options for better rendering
    marked.setOptions({
      breaks: true,
      gfm: true,
    });
    
    // Convert markdown to HTML
    const html = marked.parse(markdown);
    
    // Create a temporary container for the HTML (completely hidden from view)
    container = document.createElement('div');
    container.className = 'resume-pdf-container';
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '210mm'; // A4 width
    container.style.padding = '20mm'; // Consistent padding
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.fontSize = '11pt';
    container.style.lineHeight = '1.6';
    container.style.color = '#000';
    container.style.backgroundColor = '#fff';
    container.style.boxSizing = 'border-box';
    container.style.pageBreakInside = 'avoid';
    // Keep it out of viewport but renderable for html2canvas
    container.style.pointerEvents = 'none';
    container.style.zIndex = '-9999';
    
    // Add styling for better PDF output - scoped to the container only
    const styledHtml = `
      <style>
        .resume-pdf-container * {
          text-decoration: none !important;
        }
        .resume-pdf-container {
          font-family: Arial, sans-serif;
          font-size: 11pt;
          line-height: 1.6;
          color: #000;
          margin: 0;
          padding: 0;
        }
        .resume-pdf-container h1 {
          font-size: 24pt;
          font-weight: bold;
          margin-bottom: 10pt;
          border-bottom: none !important;
          padding-bottom: 5pt;
          text-decoration: none !important;
        }
        .resume-pdf-container h1 * {
          text-decoration: none !important;
        }
        .resume-pdf-container h2 {
          font-size: 16pt;
          font-weight: bold;
          margin-top: 15pt;
          margin-bottom: 10pt;
          text-decoration: none !important;
        }
        .resume-pdf-container h3 {
          font-size: 14pt;
          font-weight: bold;
          margin-top: 12pt;
          margin-bottom: 8pt;
          text-decoration: none !important;
        }
        .resume-pdf-container p {
          margin: 8pt 0;
          page-break-inside: avoid;
        }
        .resume-pdf-container ul, .resume-pdf-container ol {
          margin: 8pt 0;
          padding-left: 20pt;
          page-break-inside: avoid;
        }
        .resume-pdf-container li {
          margin: 4pt 0;
          page-break-inside: avoid;
        }
        .resume-pdf-container h1, .resume-pdf-container h2, .resume-pdf-container h3, .resume-pdf-container h4, .resume-pdf-container h5, .resume-pdf-container h6 {
          page-break-after: avoid;
          page-break-inside: avoid;
        }
        .resume-pdf-container strong {
          font-weight: bold;
        }
        .resume-pdf-container em {
          font-style: italic;
        }
        .resume-pdf-container a {
          color: #0066cc;
          text-decoration: none !important;
          border-bottom: none !important;
        }
        .resume-pdf-container a:hover {
          text-decoration: none !important;
        }
        .resume-pdf-container hr {
          border: none;
          border-top: 1pt solid #ccc;
          margin: 15pt 0;
        }
      </style>
      <div style="max-width: 100%;">
        ${html}
      </div>
    `;
    
    container.innerHTML = styledHtml;
    document.body.appendChild(container);
    
    // Wait for fonts and images to load
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Extract link information before converting to canvas
    const links: Array<{ url: string; x: number; y: number; width: number; height: number }> = [];
    const anchorElements = container.querySelectorAll('a');
    
    anchorElements.forEach((anchor) => {
      const href = anchor.getAttribute('href');
      if (href) {
        const rect = anchor.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Calculate relative position within container
        const relativeX = rect.left - containerRect.left;
        const relativeY = rect.top - containerRect.top;
        
        links.push({
          url: href.startsWith('http') ? href : `http://${href}`,
          x: relativeX,
          y: relativeY,
          width: rect.width,
          height: rect.height,
        });
      }
    });
    
    // Also extract email addresses from text content
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
    const allTextNodes: Text[] = [];
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null
    );
    
    let textNode;
    while ((textNode = walker.nextNode() as Text)) {
      allTextNodes.push(textNode);
    }
    
    allTextNodes.forEach((textNode) => {
      const text = textNode.textContent || '';
      const matches = text.matchAll(emailRegex);
      
      for (const match of matches) {
        const email = match[0];
        const index = match.index || 0;
        
        // Skip if this email is already in a link
        let isInLink = false;
        let parent = textNode.parentElement;
        while (parent && parent !== container) {
          if (parent.tagName === 'A') {
            isInLink = true;
            break;
          }
          parent = parent.parentElement;
        }
        
        if (!isInLink) {
          try {
            const range = document.createRange();
            range.setStart(textNode, index);
            range.setEnd(textNode, index + email.length);
            const rect = range.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            const relativeX = rect.left - containerRect.left;
            const relativeY = rect.top - containerRect.top;
            
            links.push({
              url: `mailto:${email}`,
              x: relativeX,
              y: relativeY,
              width: rect.width,
              height: rect.height,
            });
          } catch (e) {
            // Skip if range creation fails
            console.warn('Failed to create range for email:', email);
          }
        }
      }
    });
    
    // Convert HTML to canvas with better quality settings
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      width: container.scrollWidth,
      height: container.scrollHeight,
      windowWidth: container.scrollWidth,
      windowHeight: container.scrollHeight,
      backgroundColor: '#ffffff',
      removeContainer: false,
      allowTaint: false,
    });
    
    // A4 dimensions in mm
    const pdfWidth = 210; // A4 width
    const pdfHeight = 297; // A4 height
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    
    // Conversion factors: pixels to mm
    const pxToMmX = pdfWidth / container.scrollWidth;
    const pxToMmY = imgHeight / container.scrollHeight;
    
    // Footer and header dimensions
    const footerHeight = 25; // Space reserved for footer
    const topPadding = 20; // Top padding for pages after the first (in mm)
    const bottomSafetyMargin = 15; // Safety margin to prevent text truncation at page breaks (in mm)
    const firstPageContentHeight = pdfHeight - footerHeight - bottomSafetyMargin; // First page: full height minus footer and safety
    const subsequentPageContentHeight = pdfHeight - footerHeight - topPadding - bottomSafetyMargin; // Other pages: minus footer, top padding, and safety
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    // Footer text and links
    const footerText = 'Prithiv Raj - Resume | prithivraj.xyz | prithivrajmu@gmail.com';
    const footerFontSize = 8;
    const footerY = pdfHeight - 15; // 15mm from bottom
    const footerLinkY = footerY + 5; // Position for page number
    
    // Set font size for text width calculations
    pdf.setFontSize(footerFontSize);
    
    // Footer link positions (approximate, will be centered)
    const footerTextWidth = pdf.getTextWidth(footerText);
    const footerStartX = (pdfWidth - footerTextWidth) / 2;
    
    // Add footer links for website and email
    const prefixText = 'Prithiv Raj - Resume | ';
    const separatorText = ' | ';
    const websiteLinkX = footerStartX + pdf.getTextWidth(prefixText);
    const websiteLinkWidth = pdf.getTextWidth('prithivraj.xyz');
    const emailLinkX = websiteLinkX + websiteLinkWidth + pdf.getTextWidth(separatorText);
    const emailLinkWidth = pdf.getTextWidth('prithivrajmu@gmail.com');
    
    // Handle multi-page PDF by slicing the canvas intelligently
    // Calculate page breaks considering content height variations
    // Minimum content threshold to create a new page (in mm)
    const minContentForNewPage = 20;
    
    let currentY = 0;
    let pageNum = 1;
    const pageBreaks = [0]; // Starting position of each page
    
    // Calculate where each page should start
    while (currentY < imgHeight) {
      const contentHeight = pageNum === 1 ? firstPageContentHeight : subsequentPageContentHeight;
      const nextY = currentY + contentHeight;
      
      // Only create a new page if there's significant content remaining
      const remainingContent = imgHeight - nextY;
      if (nextY < imgHeight && remainingContent >= minContentForNewPage) {
        pageBreaks.push(nextY);
        currentY = nextY;
        pageNum++;
      } else {
        // Not enough content for a new page, stop here
        break;
      }
    }
    
    const totalPages = pageBreaks.length;
    
    // Process each page
    for (let i = 0; i < totalPages; i++) {
      if (i > 0) {
        pdf.addPage();
      }
      
      const pageNum = i + 1;
      const isFirstPage = pageNum === 1;
      const contentHeight = isFirstPage ? firstPageContentHeight : subsequentPageContentHeight;
      const yOffset = isFirstPage ? 0 : topPadding; // Add top padding for subsequent pages
      
      // Calculate the vertical offset for this page in the canvas
      const sourceY = pageBreaks[i];
      const nextPageStart = i + 1 < totalPages ? pageBreaks[i + 1] : imgHeight;
      const sourceHeight = nextPageStart - sourceY;
      const pageContentHeight = Math.min(contentHeight, sourceHeight);
      
      // Calculate the canvas pixel coordinates for this slice
      const canvasSourceY = (sourceY / imgHeight) * canvas.height;
      const canvasSliceHeight = (pageContentHeight / imgHeight) * canvas.height;
      
      // Create a temporary canvas for this page slice
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = canvasSliceHeight;
      const pageCtx = pageCanvas.getContext('2d');
      
      if (pageCtx) {
        // Draw the slice of the main canvas onto the page canvas
        pageCtx.drawImage(
          canvas,
          0, canvasSourceY,           // Source x, y
          canvas.width, canvasSliceHeight,  // Source width, height
          0, 0,                       // Destination x, y
          canvas.width, canvasSliceHeight   // Destination width, height
        );
        
        // Convert page canvas to image and add to PDF
        const pageImgData = pageCanvas.toDataURL('image/png', 1.0);
        pdf.addImage(pageImgData, 'PNG', 0, yOffset, imgWidth, pageContentHeight, undefined, 'FAST');
      }
      
      // Add white background in footer area (including safety margin) to cover any overlapping content
      const contentEndY = isFirstPage ? contentHeight + bottomSafetyMargin : topPadding + contentHeight + bottomSafetyMargin;
      const footerStartY = pdfHeight - footerHeight;
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, contentEndY, pdfWidth, pdfHeight - contentEndY, 'F');
      
      // Add clickable links for this page
      links.forEach((link) => {
        const linkYInPdf = link.y * pxToMmY;
        
        if (linkYInPdf >= sourceY && linkYInPdf < nextPageStart) {
          const linkX = link.x * pxToMmX;
          const linkY = (linkYInPdf - sourceY) + yOffset;
          const linkWidth = link.width * pxToMmX;
          const linkHeight = link.height * pxToMmY;
          
          // Only add link if it's within visible content area
          const maxLinkY = isFirstPage ? contentHeight + bottomSafetyMargin : topPadding + contentHeight + bottomSafetyMargin;
          if (linkY >= yOffset && linkY < maxLinkY) {
            pdf.link(linkX, linkY, linkWidth, linkHeight, { url: link.url });
          }
        }
      });
      
      // Add footer to each page
      pdf.setFontSize(footerFontSize);
      pdf.setTextColor(100, 100, 100);
      pdf.text(footerText, pdfWidth / 2, footerY, { align: 'center' });
      pdf.text(`Page ${pageNum} of ${totalPages}`, pdfWidth / 2, footerLinkY, { align: 'center' });
      
      // Add clickable links in footer
      pdf.link(websiteLinkX, footerY - 3, websiteLinkWidth, 4, { url: 'http://prithivraj.xyz' });
      pdf.link(emailLinkX, footerY - 3, emailLinkWidth, 4, { url: 'mailto:prithivrajmu@gmail.com' });
    }
    
    // Save PDF
    pdf.save('Prithiv_Raj_Resume.pdf');
    
    console.log('Successfully generated and downloaded resume PDF');
  } catch (error) {
    console.error('Error generating resume PDF:', error);
    alert('Sorry, there was an error generating the resume PDF. Please try again.');
  } finally {
    // Clean up container in all cases (success or error)
    if (container && container.parentNode) {
      document.body.removeChild(container);
    }
  }
}; 