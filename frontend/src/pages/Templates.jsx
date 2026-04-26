import React, { useState, useEffect } from 'react';
import CertificateTemplateEditor from '../components/CertificateTemplateEditor';
import { toast } from 'react-toastify';

export default function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');

  // Load templates from localStorage on mount
  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = () => {
    const savedTemplates = localStorage.getItem('certificateTemplates');
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    } else {
      // Default templates
      const defaultTemplates = [
        {
          id: 1,
          name: 'Completion Certificate',
          description: 'Standard completion certificate template',
          preview: '🎓',
          lastModified: new Date().toISOString(),
          settings: {
            title: 'Certificate of Completion',
            backgroundColor: '#ffffff',
            textColor: '#1e40af',
            accentColor: '#3b82f6',
            fontFamily: 'serif',
            logoUrl: '',
            signatureText: 'Authorized Signature',
            borderStyle: 'classic',
            headerText: 'CERTIFICATE'
          }
        },
        {
          id: 2,
          name: 'Achievement Award',
          description: 'Special achievement recognition template',
          preview: '🏆',
          lastModified: new Date().toISOString(),
          settings: {
            title: 'Achievement Award',
            backgroundColor: '#fef3c7',
            textColor: '#92400e',
            accentColor: '#f59e0b',
            fontFamily: 'sans-serif',
            logoUrl: '',
            signatureText: 'Director',
            borderStyle: 'elegant',
            headerText: 'AWARD'
          }
        },
        {
          id: 3,
          name: 'Participation Certificate',
          description: 'Event participation certificate',
          preview: '🤝',
          lastModified: new Date().toISOString(),
          settings: {
            title: 'Certificate of Participation',
            backgroundColor: '#f0fdf4',
            textColor: '#166534',
            accentColor: '#22c55e',
            fontFamily: 'sans-serif',
            logoUrl: '',
            signatureText: 'Event Organizer',
            borderStyle: 'modern',
            headerText: 'PARTICIPATION'
          }
        },
        {
          id: 4,
          name: 'Excellence Award',
          description: 'High achievement excellence template',
          preview: '⭐',
          lastModified: new Date().toISOString(),
          settings: {
            title: 'Excellence Award',
            backgroundColor: '#fae8ff',
            textColor: '#6b21a8',
            accentColor: '#a855f7',
            fontFamily: 'serif',
            logoUrl: '',
            signatureText: 'Principal',
            borderStyle: 'elegant',
            headerText: 'EXCELLENCE'
          }
        }
      ];
      setTemplates(defaultTemplates);
      localStorage.setItem('certificateTemplates', JSON.stringify(defaultTemplates));
    }
  };

  const handleCreateTemplate = () => {
    if (!newTemplateName.trim()) {
      toast.error('Please enter a template name');
      return;
    }

    const newTemplate = {
      id: Date.now(),
      name: newTemplateName,
      description: 'Custom certificate template',
      preview: '📜',
      lastModified: new Date().toISOString(),
      settings: {
        title: 'Certificate of Achievement',
        backgroundColor: '#ffffff',
        textColor: '#1e40af',
        accentColor: '#3b82f6',
        fontFamily: 'serif',
        logoUrl: '',
        signatureText: 'Authorized Signature',
        borderStyle: 'classic',
        headerText: 'CERTIFICATE'
      }
    };

    const updatedTemplates = [...templates, newTemplate];
    setTemplates(updatedTemplates);
    localStorage.setItem('certificateTemplates', JSON.stringify(updatedTemplates));
    
    setSelectedTemplate(newTemplate);
    setShowCreateModal(false);
    setNewTemplateName('');
    toast.success('Template created successfully!');
  };

  const handleSaveTemplate = (updatedSettings) => {
    if (!selectedTemplate) return;

    const updatedTemplate = {
      ...selectedTemplate,
      settings: updatedSettings,
      lastModified: new Date().toISOString()
    };

    const updatedTemplates = templates.map(t => 
      t.id === selectedTemplate.id ? updatedTemplate : t
    );

    setTemplates(updatedTemplates);
    setSelectedTemplate(updatedTemplate);
    localStorage.setItem('certificateTemplates', JSON.stringify(updatedTemplates));
    toast.success('Template saved successfully!');
  };

  const handleDeleteTemplate = (templateId) => {
    if (!window.confirm('Are you sure you want to delete this template?')) {
      return;
    }

    const updatedTemplates = templates.filter(t => t.id !== templateId);
    setTemplates(updatedTemplates);
    localStorage.setItem('certificateTemplates', JSON.stringify(updatedTemplates));
    
    if (selectedTemplate?.id === templateId) {
      setSelectedTemplate(null);
    }
    
    toast.success('Template deleted successfully!');
  };

  const handleDuplicateTemplate = (template) => {
    const duplicatedTemplate = {
      ...template,
      id: Date.now(),
      name: `${template.name} (Copy)`,
      lastModified: new Date().toISOString()
    };

    const updatedTemplates = [...templates, duplicatedTemplate];
    setTemplates(updatedTemplates);
    localStorage.setItem('certificateTemplates', JSON.stringify(updatedTemplates));
    toast.success('Template duplicated successfully!');
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Certificate Templates</h1>
            <p className="text-gray-600 text-lg mt-1">Create and manage certificate templates ({templates.length} templates)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Templates List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Available Templates</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 relative group ${
                      selectedTemplate?.id === template.id
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-900 hover:shadow-md'
                    }`}
                  >
                    <div
                      onClick={() => setSelectedTemplate(template)}
                      className="flex items-center gap-4"
                    >
                      <span className="text-3xl">{template.preview}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-base">{template.name}</h3>
                        <p className={`text-xs mt-1 ${selectedTemplate?.id === template.id ? 'text-green-100' : 'text-gray-600'}`}>
                          {template.description}
                        </p>
                        <p className={`text-xs mt-1 ${selectedTemplate?.id === template.id ? 'text-green-200' : 'text-gray-500'}`}>
                          Modified {getTimeAgo(template.lastModified)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateTemplate(template);
                        }}
                        className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        title="Duplicate"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTemplate(template.id);
                        }}
                        className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full mt-6 px-6 py-4 bg-green-600 text-white text-base rounded-xl hover:bg-green-700 transition-all font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Template
              </button>
            </div>
          </div>

          {/* Template Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Template Editor</h2>
                {selectedTemplate && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowPreview(true)}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Preview
                    </button>
                  </div>
                )}
              </div>

              {selectedTemplate ? (
                <div>
                  <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl">{selectedTemplate.name}</h3>
                        <p className="text-gray-600 text-base mt-2">{selectedTemplate.description}</p>
                      </div>
                      <span className="text-4xl">{selectedTemplate.preview}</span>
                    </div>
                  </div>
                  <CertificateTemplateEditor
                    template={selectedTemplate}
                    onSave={handleSaveTemplate}
                  />
                </div>
              ) : (
                <div className="text-center py-20">
                  <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Select a template to edit</h3>
                  <p className="text-gray-600 text-base">Choose a template from the list or create a new one to start editing</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Create Template Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Template</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                  <input
                    type="text"
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    placeholder="Enter template name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                    onKeyPress={(e) => e.key === 'Enter' && handleCreateTemplate()}
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleCreateTemplate}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      setNewTemplateName('');
                    }}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {showPreview && selectedTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Template Preview</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="bg-gray-100 p-8 rounded-xl">
                <CertificateTemplateEditor
                  template={selectedTemplate}
                  onSave={handleSaveTemplate}
                  previewOnly={true}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}