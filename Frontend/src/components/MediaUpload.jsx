import React, { useState, useRef } from 'react';
import { Upload, X, Check, Image, Video } from 'lucide-react';

const MediaUpload = ({ isOpen, onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccess(true);

      setTimeout(() => {
        setSelectedFiles([]);
        setShowSuccess(false);
        setIsUploading(false);
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Upload error:', error);
      setIsUploading(false);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full text-center border border-green-500">
          <div className="mb-6">
            <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Upload Successful!</h3>
            <p className="text-gray-300">
              Your media files have been uploaded successfully to the community gallery.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <Upload className="h-6 w-6 text-blue-500 mr-2" />
            Upload Media
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Select Photos & Videos</h4>
              <p className="text-gray-400">
                Click here to browse and select multiple files from your device
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supported formats: JPG, PNG, GIF, MP4, MOV, AVI
              </p>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Selected Files ({selectedFiles.length})
              </h4>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {file.type.startsWith('image/') ? (
                        <Image className="h-6 w-6 text-blue-500" />
                      ) : (
                        <Video className="h-6 w-6 text-indigo-500" />
                      )}
                      <div>
                        <p className="text-white font-medium">{file.name}</p>
                        <p className="text-gray-400 text-sm">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-indigo-500 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center pt-4">
            <button
              onClick={handleUpload}
              disabled={selectedFiles.length === 0 || isUploading}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  <span>Upload {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUpload;
