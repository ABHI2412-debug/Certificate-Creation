import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function CertificateTemplateEditor({ template, onSave, previewOnly = false }) {
  const [formData, setFormData] = useState({
    title: '',
    backgroundColor: '#ffffff',
    textColor: '#1e40af',
    accentColor: '#3b82f6',
    fontFamily: 'serif',
    logoUrl: '',
    signatureText: 'Authorized Signature',
    borderStyle: 'classic',
    headerText: 'CERTIFICATE'
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (template?.settings) {
      setFormData(template.settings);
      setHasChanges(false);
    }
  }, [template]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setHasChanges(true);
  };

  const handleColorChange = (colorType, value) => {
    setFormData(prev => ({
      ...prev,
      [colorType]: value
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
      setHasChanges(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all changes?')) {
      setFormData(template.settings);
      setHasChanges(false);
      toast.info('Template reset to last saved state');
    }
  };

  const handlePreview = () => {
    toast.info('Preview mode - This shows how your certificate will look');
  };

  if (previewOnly) {
    return (
      <div
        className="bg-white border-4 rounded-xl p-12 shadow-2xl relative overflow-hidden min-h-[600px]"
        style={{
          backgroundColor: formData.backgroundColor,
          fontFamily: formData.fontFamily,
          borderColor: formData.accentColor
        }}
      >
        {/* Decorative corners */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 rounded-tl-lg" style={{ borderColor: formData.accentColor }}></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 rounded-tr-lg" style={{ borderColor: formData.accentColor }}></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 rounded-bl-lg" style={{ borderColor: formData.accentColor }}></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 rounded-br-lg" style={{ borderColor: formData.accentColor }}></div>

        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-block py-4 px-12 rounded-xl mb-8"
            style={{ backgroundColor: formData.accentColor }}
          >
            <h1 className="text-4xl font-bold tracking-wide text-white">{formData.headerText}</h1>
            <p className="text-white text-sm mt-1 opacity-90">OF {formData.title.toUpperCase()}</p>
          </div>

          <div style={{ color: formData.textColor }}>
            <p className="text-xl mb-4">This is to certify that</p>
            <h2 className="text-5xl font-bold mb-6">John Doe</h2>
            <p className="text-xl mb-8">has successfully completed</p>
            <h3 className="text-3xl font-semibold mb-6" style={{ color: formData.accentColor }}>
              {formData.title}
            </h3>
            <p className="text-lg">with outstanding performance</p>
            <p className="text-lg mt-2">on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end mt-16">
          <div className="flex-1">
            <div className="w-24 h-24 bg-gray-200 border-2 rounded-lg flex items-center justify-center" style={{ borderColor: formData.accentColor }}>
              <svg className="w-16 h-16" style={{ color: formData.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 15h4.01M12 21h4.01M12 18h4.01M12 9h4.01M12 6h4.01M6 3h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" />
              </svg>
            </div>
            <p className="text-xs mt-2" style={{ color: formData.textColor }}>Scan to verify</p>
          </div>

          <div className="text-center flex-1">
            <div className="border-t-2 w-48 mx-auto mb-2" style={{ borderColor: formData.accentColor }}></div>
            <p className="text-sm font-medium" style={{ color: formData.textColor }}>{formData.signatureText}</p>
            <p className="text-xs mt-1" style={{ color: formData.textColor }}>Certificate Authority</p>
          </div>

          <div className="text-right flex-1">
            <p className="text-xs" style={{ color: formData.textColor }}>Certificate ID:</p>
            <p className="text-sm font-mono font-bold mt-1" style={{ color: formData.accentColor }}>CERT-2025-0001</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
              placeholder="Enter certificate title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Header Text</label>
            <input
              type="text"
              name="headerText"
              value={formData.headerText}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
              placeholder="Enter header text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
            <select
              name="fontFamily"
              value={formData.fontFamily}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
            >
              <option value="serif">Serif (Classic)</option>
              <option value="sans-serif">Sans Serif (Modern)</option>
              <option value="monospace">Monospace (Technical)</option>
              <option value="cursive">Cursive (Elegant)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Border Style</label>
            <select
              name="borderStyle"
              value={formData.borderStyle}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
            >
              <option value="classic">Classic</option>
              <option value="modern">Modern</option>
              <option value="elegant">Elegant</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL (Optional)</label>
            <input
              type="url"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Signature Text</label>
            <input
              type="text"
              name="signatureText"
              value={formData.signatureText}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
              placeholder="Authorized Signature"
            />
          </div>

          {/* Color Pickers */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background</label>
              <input
                type="color"
                value={formData.backgroundColor}
                onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.backgroundColor}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
              <input
                type="color"
                value={formData.textColor}
                onChange={(e) => handleColorChange('textColor', e.target.value)}
                className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.textColor}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Accent</label>
              <input
                type="color"
                value={formData.accentColor}
                onChange={(e) => handleColorChange('accentColor', e.target.value)}
                className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.accentColor}</p>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Live Preview</label>
          <div className="bg-gray-100 rounded-xl p-4">
            <div
              className="bg-white border-2 rounded-lg p-6 shadow-lg relative overflow-hidden"
              style={{
                backgroundColor: formData.backgroundColor,
                fontFamily: formData.fontFamily,
                borderColor: formData.accentColor
              }}
            >
              {/* Decorative corners */}
              <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 rounded-tl" style={{ borderColor: formData.accentColor }}></div>
              <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 rounded-tr" style={{ borderColor: formData.accentColor }}></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 rounded-bl" style={{ borderColor: formData.accentColor }}></div>
              <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 rounded-br" style={{ borderColor: formData.accentColor }}></div>

              {/* Header */}
              <div className="text-center mb-6">
                <div
                  className="inline-block py-2 px-6 rounded-lg mb-4"
                  style={{ backgroundColor: formData.accentColor }}
                >
                  <h1 className="text-xl font-bold tracking-wide text-white">{formData.headerText}</h1>
                </div>

                <div style={{ color: formData.textColor }}>
                  <p className="text-xs mb-2">This is to certify that</p>
                  <h2 className="text-2xl font-bold mb-3">Student Name</h2>
                  <p className="text-xs mb-3">has successfully completed</p>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: formData.accentColor }}>
                    {formData.title}
                  </h3>
                  <p className="text-xs">on {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-end mt-6">
                <div>
                  <div className="w-12 h-12 bg-gray-200 border rounded flex items-center justify-center" style={{ borderColor: formData.accentColor }}>
                    <svg className="w-8 h-8" style={{ color: formData.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-[8px] mt-1" style={{ color: formData.textColor }}>QR Code</p>
                </div>

                <div className="text-center">
                  <div className="border-t w-24 mx-auto mb-1" style={{ borderColor: formData.accentColor }}></div>
                  <p className="text-[10px]" style={{ color: formData.textColor }}>{formData.signatureText}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quick Presets</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    backgroundColor: '#ffffff',
                    textColor: '#1e40af',
                    accentColor: '#3b82f6'
                  }));
                  setHasChanges(true);
                }}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
              >
                Classic Blue
              </button>
              <button
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    backgroundColor: '#fef3c7',
                    textColor: '#92400e',
                    accentColor: '#f59e0b'
                  }));
                  setHasChanges(true);
                }}
                className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors text-sm font-medium"
              >
                Golden
              </button>
              <button
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    backgroundColor: '#f0fdf4',
                    textColor: '#166534',
                    accentColor: '#22c55e'
                  }));
                  setHasChanges(true);
                }}
                className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
              >
                Fresh Green
              </button>
              <button
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    backgroundColor: '#fae8ff',
                    textColor: '#6b21a8',
                    accentColor: '#a855f7'
                  }));
                  setHasChanges(true);
                }}
                className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
              >
                Royal Purple
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4 border-t border-gray-200">
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {hasChanges ? 'Save Changes' : 'Saved'}
        </button>
        <button
          onClick={handlePreview}
          className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-semibold flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Preview Full Size
        </button>
        <button
          onClick={handleReset}
          disabled={!hasChanges}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>
        {hasChanges && (
          <span className="flex items-center text-sm text-orange-600 ml-auto">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Unsaved changes
          </span>
        )}
      </div>
    </div>
  );
}