# Cloudinary Setup Guide

This guide will help you set up Cloudinary to host your video files and reduce your project size.

## 🚀 **Step 1: Create Cloudinary Account**

1. Go to [cloudinary.com](https://cloudinary.com)
2. Click "Sign Up For Free"
3. Create your account
4. Verify your email

## 📋 **Step 2: Get Your Cloud Name**

1. Log into your Cloudinary dashboard
2. Look for your **Cloud Name** in the top right corner
3. It will look like: `dxxxxx` or `your-name`

## 🔧 **Step 3: Update Configuration**

1. Open `src/config/cloudinary.ts`
2. Replace `'your-cloud-name'` with your actual Cloudinary cloud name:

```typescript
export const CLOUDINARY_CONFIG = {
  cloudName: 'your-actual-cloud-name', // Replace this!
  folder: 'pixel-desktop-videos',
};
```

## 📤 **Step 4: Upload Your Videos**

### Option A: Using Cloudinary Dashboard
1. Go to your Cloudinary Media Library
2. Create a folder called `pixel-desktop-videos`
3. Upload these videos:
   - `moving_bg_3.mp4`
   - `boy_runnin.mp4`
   - `moving_bg_2.mp4`
   - `moving_bg.mp4`

### Option B: Using Cloudinary CLI
```bash
# Install Cloudinary CLI
npm install -g cloudinary-cli

# Upload videos
cloudinary upload public/videos/moving_bg_3.mp4 --folder pixel-desktop-videos
cloudinary upload public/videos/boy_runnin.mp4 --folder pixel-desktop-videos
cloudinary upload public/videos/moving_bg_2.mp4 --folder pixel-desktop-videos
cloudinary upload public/videos/moving_bg.mp4 --folder pixel-desktop-videos
```

## ✅ **Step 5: Test Your Setup**

1. Start your development server: `npm run dev`
2. Test background videos in your portfolio
3. Test screensaver videos
4. Verify all videos load correctly

## 🎯 **Benefits Achieved**

- ✅ **Project size reduced by ~20M**
- ✅ **Better global performance**
- ✅ **Automatic video optimization**
- ✅ **No server storage costs**

## 🔧 **Advanced Configuration**

### Video Quality Optimization
You can adjust video quality in `src/config/cloudinary.ts`:

```typescript
// For better quality (larger files)
path: getCloudinaryVideoUrl('moving_bg_3', { quality: 'high' })

// For faster loading (smaller files)
path: getCloudinaryVideoUrl('moving_bg_3', { quality: 'low' })

// For automatic optimization (recommended)
path: getCloudinaryVideoUrl('moving_bg_3', { quality: 'auto' })
```

### Format Optimization
You can also specify different formats:

```typescript
// WebM for better compression
path: getCloudinaryVideoUrl('moving_bg_3', { format: 'webm' })

// MP4 for broader compatibility
path: getCloudinaryVideoUrl('moving_bg_3', { format: 'mp4' })
```

## 🆘 **Troubleshooting**

### Videos Not Loading?
1. Check your cloud name is correct
2. Verify videos are uploaded to the right folder
3. Check browser console for errors
4. Ensure video file names match exactly

### Performance Issues?
1. Try reducing video quality to 'low'
2. Use 'auto' quality for best balance
3. Consider video compression before upload

## 📊 **Usage Monitoring**

Monitor your Cloudinary usage in the dashboard:
- **Free tier:** 25GB storage, 25GB bandwidth/month
- **Video views:** Track usage in Media Library
- **Bandwidth:** Monitor in Usage section

---

🎉 **You're all set!** Your portfolio now uses Cloudinary for video hosting. 