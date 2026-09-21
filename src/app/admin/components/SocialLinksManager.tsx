"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";
import type { SocialLink } from "@/types";

export default function SocialLinksManager() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<SocialLink>>({});

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setLoading(true);
    const { data } = await supabase.from('social_links').select('*').order('order_index', { ascending: true });
    if (data) setLinks(data);
    setLoading(false);
  };

  const handleEdit = (link: SocialLink) => {
    setEditingId(link.id);
    setEditForm({ ...link });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = async () => {
    if (!editForm.platform || !editForm.url) {
      alert("Platform and URL are required");
      return;
    }
    
    setLoading(true);
    if (editingId === 'new') {
      const { id, ...insertData } = editForm as any;
      const { error } = await supabase.from('social_links').insert([{...insertData, order_index: links.length}]);
      if (error) alert("Error: " + error.message);
    } else {
      const { error } = await supabase.from('social_links').update(editForm).eq('id', editingId);
      if (error) alert("Error: " + error.message);
    }
    
    setEditingId(null);
    setEditForm({});
    fetchLinks();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this social link?")) return;
    setLoading(true);
    const { error } = await supabase.from('social_links').delete().eq('id', id);
    if (error) alert("Error: " + error.message);
    fetchLinks();
  };

  const handleAddNew = () => {
    setEditingId('new');
    setEditForm({
      platform: "",
      url: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-1">Social Links Manager</h3>
          <p className="text-slate-500">Manage your social media presence.</p>
        </div>
        <button 
          onClick={handleAddNew}
          disabled={editingId !== null || loading}
          className="flex items-center gap-2 bg-blue-600 text-white rounded-xl py-2.5 px-4 font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Plus className="h-5 w-5" /> Add Link
        </button>
      </div>

      <div className="grid gap-4">
        {loading && links.length === 0 && <p>Loading...</p>}
        {links.length === 0 && !loading && editingId !== 'new' && (
          <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <p className="text-slate-500">No social links added yet.</p>
          </div>
        )}

        {(editingId === 'new' ? [{ id: 'new', ...editForm } as SocialLink, ...links] : links).map((link) => (
          <div key={link.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            {editingId === link.id ? (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Platform (e.g. GitHub, LinkedIn, Twitter) *</label>
                    <input 
                      type="text" 
                      value={editForm.platform || ""} 
                      onChange={e => setEditForm({...editForm, platform: e.target.value})}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">URL *</label>
                    <input 
                      type="url" 
                      value={editForm.url || ""} 
                      onChange={e => setEditForm({...editForm, url: e.target.value})}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <button onClick={handleCancel} className="flex items-center gap-1 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <X className="h-4 w-4" /> Cancel
                  </button>
                  <button onClick={handleSave} disabled={loading} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50">
                    <Check className="h-4 w-4" /> Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-lg mb-1">{link.platform}</h4>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    {link.url}
                  </a>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleEdit(link)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(link.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
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
