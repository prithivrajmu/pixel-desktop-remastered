
import React, { useState } from 'react';

export const Notepad: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! (This is just a demo)');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Menu Bar */}
      <div className="bg-gray-200 border-b border-gray-400 px-2 py-1">
        <div className="flex space-x-4 text-xs">
          <span className="px-2 py-1 hover:bg-gray-300 cursor-pointer">File</span>
          <span className="px-2 py-1 hover:bg-gray-300 cursor-pointer">Edit</span>
          <span className="px-2 py-1 hover:bg-gray-300 cursor-pointer">Search</span>
          <span className="px-2 py-1 hover:bg-gray-300 cursor-pointer">Help</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4" style={{ fontFamily: 'Courier New, monospace' }}>
        <div className="text-sm mb-4">
          <div>Contact - Notepad</div>
          <div className="border-b border-gray-400 mb-4"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm mb-1">Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-black px-2 py-1 text-sm"
              style={{ fontFamily: 'Courier New, monospace' }}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border border-black px-2 py-1 text-sm"
              style={{ fontFamily: 'Courier New, monospace' }}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Subject:</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full border border-black px-2 py-1 text-sm"
              style={{ fontFamily: 'Courier New, monospace' }}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Message:</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows={8}
              className="w-full border border-black px-2 py-1 text-sm resize-none"
              style={{ fontFamily: 'Courier New, monospace' }}
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="bg-gray-300 border-2 border-gray-400 px-4 py-2 text-sm hover:bg-gray-200"
              style={{ borderStyle: 'outset' }}
              onMouseDown={(e) => {
                e.currentTarget.style.borderStyle = 'inset';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.borderStyle = 'outset';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderStyle = 'outset';
              }}
            >
              Send Message
            </button>
          </div>
        </form>

        <div className="mt-8 text-sm">
          <div className="border-t border-gray-400 pt-4">
            <div>Alternative Contact Methods:</div>
            <div className="mt-2 space-y-1">
              <div>Email: john.developer@example.com</div>
              <div>Phone: (555) 123-4567</div>
              <div>LinkedIn: linkedin.com/in/johndeveloper</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
