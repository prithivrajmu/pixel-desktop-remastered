import React, { useState } from 'react';
import { useScreenSize } from '../../hooks/use-mobile';

export const Contact: React.FC = () => {
  const screenSize = useScreenSize();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'fc00abdc-4ee6-4cab-8061-a3f17c14e6e7',
          ...formData,
          subject: `Contact from ${formData.name}: ${formData.subject}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]" style={{ fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", sans-serif' }}>
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] px-1">
        <div className="flex text-xs">
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">File</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">Edit</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">View</div>
          <div className="px-2 py-1 hover:bg-[#0000ff] hover:text-white cursor-pointer">Help</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] p-1">
        <div className="flex items-center gap-1 mb-1">
          {/* Navigation Buttons */}
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '32px' : '24px',
              height: screenSize.isMobile ? '32px' : '24px',
              touchAction: 'manipulation'
            }}
            title="Back"
          >
            ←
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '32px' : '24px',
              height: screenSize.isMobile ? '32px' : '24px',
              touchAction: 'manipulation'
            }}
            title="Forward"
          >
            →
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '32px' : '24px',
              height: screenSize.isMobile ? '32px' : '24px',
              touchAction: 'manipulation'
            }}
            title="Up"
          >
            ↑
          </button>
          
          <div className="w-px h-6 bg-[#808080] mx-1"></div>
          
          {/* Action Buttons */}
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '32px' : '24px',
              height: screenSize.isMobile ? '32px' : '24px',
              touchAction: 'manipulation'
            }}
            title="Cut"
          >
            ✂
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '32px' : '24px',
              height: screenSize.isMobile ? '32px' : '24px',
              touchAction: 'manipulation'
            }}
            title="Copy"
          >
            📋
          </button>
          <button 
            className={`bg-[#c0c0c0] border border-[#808080] flex items-center justify-center text-xs hover:bg-[#e0e0e0] ${
              screenSize.isTouchDevice ? 'active:bg-gray-400' : ''
            }`}
            style={{ 
              borderStyle: 'outset',
              width: screenSize.isMobile ? '32px' : '24px',
              height: screenSize.isMobile ? '32px' : '24px',
              touchAction: 'manipulation'
            }}
            title="Paste"
          >
            📄
          </button>
        </div>
        
        {/* Address Bar */}
        <div className="flex items-center gap-1">
          <span className="text-xs">Address:</span>
          <div className="flex-1 flex items-center bg-white border border-[#808080] px-2 py-0.5 text-xs" style={{ borderStyle: 'inset' }}>
            <img src="/icons/Contact Card.ico" alt="Contact" className="w-4 h-4 mr-1" />
            <span>Contact Information</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white p-6 overflow-auto">
        <div className="flex flex-col justify-start items-center min-h-full">
          <h2 className="text-lg font-bold mb-6">Contact Information</h2>
          
          {/* Contact Links */}
          <div className="w-full max-w-xs space-y-4 mb-8">
            <div className="flex items-center space-x-2">
              <img src="/icons/Contact Card.ico" alt="Email" width={20} height={20} style={{ imageRendering: 'pixelated' }} />
              <a href="mailto:prithivrajmu@gmail.com" className="text-blue-700 underline hover:text-blue-900">prithivrajmu@gmail.com</a>
            </div>
            <div className="flex items-center space-x-2">
              <img src="/icons/Desktop.ico" alt="GitHub" width={20} height={20} style={{ imageRendering: 'pixelated' }} />
              <a href="https://github.com/prithivrajmu" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900">GitHub</a>
            </div>
            <div className="flex items-center space-x-2">
              <img src="/icons/People.ico" alt="LinkedIn" width={20} height={20} style={{ imageRendering: 'pixelated' }} />
              <a href="https://linkedin.com/in/prithivrajmu" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900">LinkedIn</a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full max-w-md">
            <h3 className="text-md font-bold mb-4 text-center">Send me a message</h3>
            
            {submitStatus === 'success' && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 text-sm">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-sm">
                Failed to send message. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-[#808080] bg-white text-sm"
                  style={{ borderStyle: 'inset' }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-[#808080] bg-white text-sm"
                  style={{ borderStyle: 'inset' }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Subject:</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-[#808080] bg-white text-sm"
                  style={{ borderStyle: 'inset' }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Message:</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-[#808080] bg-white text-sm resize-none"
                  style={{ borderStyle: 'inset' }}
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 text-sm font-medium ${
                  isSubmitting 
                    ? 'bg-[#a0a0a0] text-[#606060] cursor-not-allowed' 
                    : 'bg-[#c0c0c0] hover:bg-[#e0e0e0] cursor-pointer'
                } border border-[#808080]`}
                style={{ borderStyle: 'outset' }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] border-t border-[#808080] px-2 py-1 flex justify-between items-center text-xs">
        <div className="flex items-center">
          <div className="bg-[#c0c0c0] border border-[#808080] px-2 py-0.5 mr-2" style={{ borderStyle: 'inset' }}>
            3 contact methods available
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-[#c0c0c0] border border-[#808080] px-2 py-0.5" style={{ borderStyle: 'inset' }}>
            Ready
          </div>
        </div>
      </div>
    </div>
  );
}; 