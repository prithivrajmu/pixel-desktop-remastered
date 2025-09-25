# Resume Directory

This directory contains the resume file for download functionality.

## Setup Instructions

1. Add your resume file as `Prithiv_Raj_Resume.pdf` in this directory
2. The file will be automatically downloadable from:
   - My Computer: "Download Resume" button
   - My Documents: "Resume.odf" file (double-click) and "Download Resume" button in Quick Access

## Supported Formats

While the UI shows "Resume.odf" (OpenDocument format), the actual download can be any format:
- PDF (recommended): `Prithiv_Raj_Resume.pdf`
- DOC/DOCX: `Prithiv_Raj_Resume.doc`
- ODF: `Prithiv_Raj_Resume.odf`

## Alternative Storage Options

If you prefer not to include the resume in your codebase:

### Option 1: Cloudinary (Recommended for production)
1. Upload your resume to Cloudinary
2. Update `src/utils/downloadUtils.ts` to use the Cloudinary URL
3. Example: `downloadFile('https://res.cloudinary.com/your-cloud/raw/upload/v1/resume.pdf', 'Resume.pdf')`

### Option 2: External Hosting
1. Host your resume on Google Drive, Dropbox, or similar service
2. Update the download URL in `downloadUtils.ts`
3. Ensure the service allows direct file downloads

### Option 3: Base64 Embedding
For small files, you can embed them directly in the code as base64 strings. 