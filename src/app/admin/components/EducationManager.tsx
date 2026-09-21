"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";
import type { Education } from "@/types";

export default function EducationManager() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Education>>({});

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    setLoading(true);
    const { data } = await supabase.from('education').select('*').order('order_index', { ascending: true });
    if (data) setEducation(data);
    setLoading(false);
  };

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id);
    setEditForm({ ...edu });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = async () => {
    if (!editForm.degree || !editForm.institution || !editForm.duration) {
      alert("Degree, Institution, and Duration are required");
      return;
    }
    
    setLoading(true);
    if (editingId === 'new') {
      const { id, ...insertData } = editForm as any;
      const { error } = await supabase.from('education').insert([{...insertData, order_index: education.length}]);
      if (error) alert("Error: " + error.message);
    } else {
      const { error } = await supabase.from('education').update(editForm).eq('id', editingId);
      if (error) alert("Error: " + error.message);
    }
    
    setEditingId(null);
    setEditForm({});
    fetchEducation();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education?")) return;
    setLoading(true);
    const { error } = await supabase.from('education').delete().eq('id', id);
    if (error) alert("Error: " + error.message);
    fetchEducation();
  };

  const handleAddNew = () => {
    setEditingId('new');
    setEditForm({
      degree: "",
      institution: "",
      duration: "",
      score: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-1">Education Manager</h3>
          <p className="text-slate-500">Manage your academic background.</p>
        </div>
        <button 
          onClick={handleAddNew}
          disabled={editingId !== null || loading}
          className="flex items-center gap-2 bg-blue-600 text-white rounded-xl py-2.5 px-4 font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Plus className="h-5 w-5" /> Add Education
        </button>
      </div>

      <div className="grid gap-4">
        {loading && education.length === 0 && <p>Loading...</p>}
        {education.length === 0 && !loading && editingId !== 'new' && (
          <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <p className="text-slate-500">No education added yet.</p>
          </div>
        )}

        {(editingId === 'new' ? [{ id: 'new', ...editForm } as Education, ...education] : education).map((edu) => (
          <div key={edu.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            {editingId === edu.id ? (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Degree *</label>
                    <input 
                      type="text" 
                      value={editForm.degree || ""} 
                      onChange={e => setEditForm({...editForm, degree: e.target.value})}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Institution *</label>
                    <input 
                      type="text" 
                      value={editForm.institution || ""} 
                      onChange={e => setEditForm({...editForm, institution: e.target.value})}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration (e.g. 2021 - 2025) *</label>
                    <input 
                      type="text" 
                      value={editForm.duration || ""} 
                      onChange={e => setEditForm({...editForm, duration: e.target.value})}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Score / CGPA</label>
                    <input 
                      type="text" 
                      value={editForm.score || ""} 
                      onChange={e => setEditForm({...editForm, score: e.target.value})}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                      placeholder="e.g. 8.5 CGPA"
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
                  <h4 className="font-bold text-lg">{edu.degree}</h4>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{edu.institution}</p>
                  <p className="text-xs text-slate-500 mt-1">{edu.duration}</p>
                  {edu.score && <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">Score: {edu.score}</p>}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleEdit(edu)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(edu.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
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
