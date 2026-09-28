"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";
import type { Certification } from "@/types";

export default function CertificationsManager() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Certification>>({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);

  useEffect(() => {
    fetchCerts();
  }, []);

  const fetchCerts = async () => {
    setLoading(true);
    const { data } = await supabase.from('certifications').select('*').order('order_index', { ascending: true });
    if (data) setCerts(data);
    setLoading(false);
  };

  const handleEdit = (cert: Certification) => {
    setEditingId(cert.id);
    setEditForm({ ...cert });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = async () => {
    if (!editForm.title || !editForm.issuer) {
      alert("Title and Issuer are required");
      return;
    }
    
    setLoading(true);
    if (editingId === 'new') {
      const { id, ...insertData } = editForm as any;
      const { error } = await supabase.from('certifications').insert([{...insertData, order_index: certs.length}]);
      if (error) alert("Error: " + error.message);
    } else {
      const { error } = await supabase.from('certifications').update(editForm).eq('id', editingId);
      if (error) alert("Error: " + error.message);
    }
    
    setEditingId(null);
    setEditForm({});
    fetchCerts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certification?")) return;
    setLoading(true);
    const { error } = await supabase.from('certifications').delete().eq('id', id);
    if (error) alert("Error: " + error.message);
    fetchCerts();
  };

  const handleAddNew = () => {
    setEditingId('new');
    setEditForm({
      title: "",
      issuer: "",
      issue_date: "",
      expiration_date: "",
      credential_url: "",
      logo_url: ""
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    const bucket = 'portfolio-assets';
    const fileName = `cert-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    
    setUploadingImage(true);
    try {
      const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      setEditForm({ ...editForm, logo_url: data.publicUrl });
    } catch (error: any) {
      alert(`Error uploading image: ${error.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    const bucket = 'portfolio-assets';
    // Use a unique name
    const fileName = `certificate-doc-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    
    setUploadingDoc(true);
    try {
      const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      setEditForm({ ...editForm, credential_url: data.publicUrl });
    } catch (error: any) {
      alert(`Error uploading document: ${error.message}`);
    } finally {
      setUploadingDoc(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-1">Certifications Manager</h3>
          <p className="text-slate-500">Manage your professional licenses and certifications.</p>
        </div>
        <button 
          onClick={handleAddNew}
          disabled={editingId !== null || loading}
          className="flex items-center gap-2 bg-blue-600 text-white rounded-xl py-2.5 px-4 font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Plus className="h-5 w-5" /> Add Certification
        </button>
      </div>

      <div className="grid gap-4">
        {loading && certs.length === 0 && <p>Loading...</p>}
        {certs.length === 0 && !loading && editingId !== 'new' && (
          <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <p className="text-slate-500">No certifications added yet.</p>
          </div>
        )}

        {(editingId === 'new' ? [{ id: 'new', ...editForm } as Certification, ...certs] : certs).map((cert) => (
          <div key={cert.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            {editingId === cert.id ? (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Certification Title *</label>
                    <input 
                      type="text" 
                      value={editForm.title || ""} 
                      onChange={e => setEditForm({...editForm, title: e.target.value})}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                      placeholder="e.g. AWS Certified Solutions Architect"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Issuer / Organization *</label>
                    <input 
                      type="text" 
                      value={editForm.issuer || ""} 
                      onChange={e => setEditForm({...editForm, issuer: e.target.value})}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                      placeholder="e.g. Amazon Web Services"
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Issue Date</label>
                    <input 
                      type="text" 
                      value={editForm.issue_date || ""} 
                      onChange={e => setEditForm({...editForm, issue_date: e.target.value})}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                      placeholder="e.g. May 2026"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiration Date (Optional)</label>
                    <input 
                      type="text" 
                      value={editForm.expiration_date || ""} 
                      onChange={e => setEditForm({...editForm, expiration_date: e.target.value})}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                      placeholder="e.g. May 2028"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Credential URL or File (Optional)</label>
                  <div className="flex flex-col space-y-2">
                    <input 
                      type="url" 
                      value={editForm.credential_url || ""} 
                      onChange={e => setEditForm({...editForm, credential_url: e.target.value})}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 text-sm focus:border-blue-500 focus:outline-none"
                      placeholder="Paste link (e.g. Credly) or upload file below..."
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium uppercase">Or upload certificate (PDF/Image)</span>
                      <input 
                        type="file" 
                        accept="image/*,application/pdf"
                        onChange={handleDocUpload}
                        disabled={uploadingDoc}
                        className="text-sm w-full"
                      />
                    </div>
                    {uploadingDoc && <span className="text-xs text-blue-500 block">Uploading document...</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Issuer Logo</label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {editForm.logo_url && (
                      <div className="shrink-0">
                        <img src={editForm.logo_url} alt="Preview" className="h-12 w-12 object-contain rounded border border-slate-300 dark:border-slate-700 bg-white p-1" />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <input 
                        type="text" 
                        value={editForm.logo_url || ""} 
                        onChange={e => setEditForm({...editForm, logo_url: e.target.value})}
                        className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="Paste image URL here..."
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-medium uppercase">Or upload</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                          className="text-sm w-full"
                        />
                      </div>
                      {uploadingImage && <span className="text-xs text-blue-500 block">Uploading...</span>}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <button onClick={handleCancel} className="flex items-center gap-1 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <X className="h-4 w-4" /> Cancel
                  </button>
                  <button onClick={handleSave} disabled={loading || uploadingImage || uploadingDoc} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50">
                    <Check className="h-4 w-4" /> Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  {cert.logo_url ? (
                    <div className="w-12 h-12 shrink-0 rounded-lg border border-slate-200 dark:border-slate-800 bg-white p-1 overflow-hidden flex items-center justify-center">
                      <img src={cert.logo_url} alt={cert.issuer} className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 shrink-0 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500">
                      {cert.issuer.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-lg">{cert.title}</h4>
                    <p className="text-sm text-slate-500 font-medium">{cert.issuer}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      Issued {cert.issue_date} 
                      {cert.expiration_date && ` · Expires ${cert.expiration_date}`}
                    </p>
                    {cert.credential_url && (
                      <a 
                        href={cert.credential_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-sm text-blue-600 hover:underline"
                      >
                        Show credential ↗
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0 ml-4">
                  <button onClick={() => handleEdit(cert)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(cert.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
