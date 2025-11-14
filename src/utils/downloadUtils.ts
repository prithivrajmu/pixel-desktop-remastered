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
    
    // Create a temporary container for the HTML
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '210mm'; // A4 width
    container.style.padding = '20mm 20mm 30mm 20mm'; // Extra bottom padding for footer
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.fontSize = '11pt';
    container.style.lineHeight = '1.6';
    container.style.color = '#000';
    container.style.backgroundColor = '#fff';
    container.style.boxSizing = 'border-box';
    
    // Add styling for better PDF output
    const styledHtml = `
      <style>
        * {
          text-decoration: none !important;
        }
        body {
          font-family: Arial, sans-serif;
          font-size: 11pt;
          line-height: 1.6;
          color: #000;
          margin: 0;
          padding: 0;
        }
        h1 {
          font-size: 24pt;
          font-weight: bold;
          margin-bottom: 10pt;
          border-bottom: none !important;
          padding-bottom: 5pt;
          text-decoration: none !important;
        }
        h1 * {
          text-decoration: none !important;
        }
        h2 {
          font-size: 16pt;
          font-weight: bold;
          margin-top: 15pt;
          margin-bottom: 10pt;
          text-decoration: none !important;
        }
        h3 {
          font-size: 14pt;
          font-weight: bold;
          margin-top: 12pt;
          margin-bottom: 8pt;
          text-decoration: none !important;
        }
        p {
          margin: 8pt 0;
        }
        ul, ol {
          margin: 8pt 0;
          padding-left: 20pt;
        }
        li {
          margin: 4pt 0;
        }
        strong {
          font-weight: bold;
        }
        em {
          font-style: italic;
        }
        a {
          color: #0066cc;
          text-decoration: none !important;
          border-bottom: none !important;
        }
        a:hover {
          text-decoration: none !important;
        }
        hr {
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
    
    // Footer dimensions
    const footerHeight = 20; // Space reserved for footer (increased to prevent overlap)
    const contentHeight = pdfHeight - footerHeight; // Available content height per page
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    // Footer text and links
    const footerText = 'Prithiv Raj - Resume | prithivraj.xyz | prithivrajmu@gmail.com';
    const footerFontSize = 8;
    const footerY = pdfHeight - 12; // 12mm from bottom (more space)
    const footerLinkY = footerY + 5; // Position for page number (no link needed)
    
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
    
    // Handle multi-page PDF
    const imgData = canvas.toDataURL('image/png', 1.0);
    let heightLeft = imgHeight;
    let position = 0;
    let pageNum = 1;
    const totalPages = Math.ceil(imgHeight / contentHeight);
    
    // Add first page with content (clipped to contentHeight to prevent footer overlap)
    pdf.saveGraphicsState();
    pdf.rect(0, 0, pdfWidth, contentHeight);
    pdf.clip();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    pdf.restoreGraphicsState();
    
    // Add clickable links to first page
    links.forEach((link) => {
      const linkYInPdf = link.y * pxToMmY;
      if (linkYInPdf >= 0 && linkYInPdf < contentHeight) {
        const linkX = link.x * pxToMmX;
        const linkY = linkYInPdf;
        const linkWidth = link.width * pxToMmX;
        const linkHeight = link.height * pxToMmY;
        
        pdf.link(linkX, linkY, linkWidth, linkHeight, { url: link.url });
      }
    });
    
    // Add footer to first page
    pdf.setFontSize(footerFontSize);
    pdf.setTextColor(100, 100, 100);
    pdf.text(footerText, pdfWidth / 2, footerY, { align: 'center' });
    pdf.text(`Page ${pageNum} of ${totalPages}`, pdfWidth / 2, footerLinkY, { align: 'center' });
    
    // Add clickable links in footer
    pdf.link(websiteLinkX, footerY - 3, websiteLinkWidth, 4, { url: 'http://prithivraj.xyz' });
    pdf.link(emailLinkX, footerY - 3, emailLinkWidth, 4, { url: 'mailto:prithivrajmu@gmail.com' });
    
    heightLeft -= contentHeight;
    pageNum++;
    
    // Add additional pages if content exceeds one page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      
      // Clip content to prevent footer overlap
      pdf.saveGraphicsState();
      pdf.rect(0, 0, pdfWidth, contentHeight);
      pdf.clip();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      pdf.restoreGraphicsState();
      
      // Add clickable links to this page
      links.forEach((link) => {
        const linkYInPdf = link.y * pxToMmY;
        const pageStartY = (pageNum - 1) * contentHeight;
        const pageEndY = pageNum * contentHeight;
        
        if (linkYInPdf >= pageStartY && linkYInPdf < pageEndY) {
          const linkX = link.x * pxToMmX;
          const linkY = linkYInPdf - pageStartY;
          const linkWidth = link.width * pxToMmX;
          const linkHeight = link.height * pxToMmY;
          
          pdf.link(linkX, linkY, linkWidth, linkHeight, { url: link.url });
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
      
      heightLeft -= contentHeight;
      pageNum++;
    }
    
    // Save PDF
    pdf.save('Prithiv_Raj_Resume.pdf');
    
    // Clean up
    document.body.removeChild(container);
    
    console.log('Successfully generated and downloaded resume PDF');
  } catch (error) {
    console.error('Error generating resume PDF:', error);
    alert('Sorry, there was an error generating the resume PDF. Please try again.');
  }
}; 