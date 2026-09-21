"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";
import type { Experience } from "@/types";

export default function ExperienceManager() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Experience>>({});

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    const { data } = await supabase.from('experience').select('*').order('order_index', { ascending: true });
    if (data) setExperiences(data);
    setLoading(false);
  };

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setEditForm({ ...exp });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = async () => {
    if (!editForm.role || !editForm.company || !editForm.duration) {
      alert("Role, Company, and Duration are required");
      return;
    }
    
    setLoading(true);
    if (editingId === 'new') {
      const { id, ...insertData } = editForm as any;
      const { error } = await supabase.from('experience').insert([{...insertData, order_index: experiences.length}]);
      if (error) alert("Error: " + error.message);
    } else {
      const { error } = await supabase.from('experience').update(editForm).eq('id', editingId);
      if (error) alert("Error: " + error.message);
    }
    
    setEditingId(null);
    setEditForm({});
    fetchExperiences();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    setLoading(true);
    const { error } = await supabase.from('experience').delete().eq('id', id);
    if (error) alert("Error: " + error.message);
    fetchExperiences();
  };

  const handleAddNew = () => {
    setEditingId('new');
    setEditForm({
      role: "",
      company: "",
      duration: "",
      description: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-1">Experience Manager</h3>
          <p className="text-slate-500">Manage your work experience and internships.</p>
        </div>
        <button 
          onClick={handleAddNew}
          disabled={editingId !== null || loading}
          className="flex items-center gap-2 bg-blue-600 text-white rounded-xl py-2.5 px-4 font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Plus className="h-5 w-5" /> Add Experience
        </button>
      </div>

      <div className="grid gap-4">
        {loading && experiences.length === 0 && <p>Loading...</p>}
        {experiences.length === 0 && !loading && editingId !== 'new' && (
          <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <p className="text-slate-500">No experience added yet.</p>
          </div>
        )}

        {(editingId === 'new' ? [{ id: 'new', ...editForm } as Experience, ...experiences] : experiences).map((exp) => (
          <div key={exp.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            {editingId === exp.id ? (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Role *</label>
                    <input 
                      type="text" 
                      value={editForm.role || ""} 
                      onChange={e => setEditForm({...editForm, role: e.target.value})}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Company *</label>
                    <input 
                      type="text" 
                      value={editForm.company || ""} 
                      onChange={e => setEditForm({...editForm, company: e.target.value})}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Duration (e.g. Aug 2025 - Oct 2025) *</label>
                  <input 
                    type="text" 
                    value={editForm.duration || ""} 
                    onChange={e => setEditForm({...editForm, duration: e.target.value})}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description (Bullets, 1 per line)</label>
                  <textarea 
                    value={editForm.description || ""} 
                    onChange={e => setEditForm({...editForm, description: e.target.value})}
                    rows={5}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                    placeholder="Built and shipped features...&#10;Improved performance..."
                  />
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
                  <h4 className="font-bold text-lg">{exp.role} at {exp.company}</h4>
                  <p className="text-sm text-slate-500 font-medium">{exp.duration}</p>
                  <div className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {exp.description?.split('\n').map((line, i) => <p key={i}>• {line}</p>)}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleEdit(exp)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(exp.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
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
