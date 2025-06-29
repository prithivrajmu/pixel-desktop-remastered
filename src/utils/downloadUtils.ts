// Utility functions for handling file downloads
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

export const downloadResume = () => {
  try {
    // Create a temporary link element
    const link = document.createElement('a');
    
    // Use the resume file from the public folder
    link.href = '/resume/Prithiv_Raj_MU_Resume.pdf';
    link.download = 'Prithiv_Raj_MU_Resume.pdf';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading resume:', error);
    alert('Sorry, there was an error downloading the resume. Please try again.');
  }
}; 