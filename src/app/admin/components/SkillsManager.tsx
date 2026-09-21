"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";
import type { Skill } from "@/types";

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Skill>>({});

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    const { data } = await supabase.from('skills').select('*').order('order_index', { ascending: true });
    if (data) setSkills(data);
    setLoading(false);
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setEditForm({ ...skill });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = async () => {
    if (!editForm.category || !editForm.skills || editForm.skills.length === 0) {
      alert("Category and at least one Skill are required");
      return;
    }
    
    setLoading(true);
    if (editingId === 'new') {
      const { id, ...insertData } = editForm as any;
      const { error } = await supabase.from('skills').insert([{...insertData, order_index: skills.length}]);
      if (error) alert("Error: " + error.message);
    } else {
      const { error } = await supabase.from('skills').update(editForm).eq('id', editingId);
      if (error) alert("Error: " + error.message);
    }
    
    setEditingId(null);
    setEditForm({});
    fetchSkills();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill category?")) return;
    setLoading(true);
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) alert("Error: " + error.message);
    fetchSkills();
  };

  const handleAddNew = () => {
    setEditingId('new');
    setEditForm({
      category: "",
      skills: []
    });
  };

  const handleSkillsListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const arr = val.split(',').map(s => s.trim()).filter(s => s !== "");
    setEditForm({ ...editForm, skills: arr });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-1">Skills Manager</h3>
          <p className="text-slate-500">Manage your skill categories and items.</p>
        </div>
        <button 
          onClick={handleAddNew}
          disabled={editingId !== null || loading}
          className="flex items-center gap-2 bg-blue-600 text-white rounded-xl py-2.5 px-4 font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Plus className="h-5 w-5" /> Add Category
        </button>
      </div>

      <div className="grid gap-4">
        {loading && skills.length === 0 && <p>Loading...</p>}
        {skills.length === 0 && !loading && editingId !== 'new' && (
          <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <p className="text-slate-500">No skills added yet.</p>
          </div>
        )}

        {(editingId === 'new' ? [{ id: 'new', ...editForm } as Skill, ...skills] : skills).map((skill) => (
          <div key={skill.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            {editingId === skill.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category (e.g. Languages, Frameworks) *</label>
                  <input 
                    type="text" 
                    value={editForm.category || ""} 
                    onChange={e => setEditForm({...editForm, category: e.target.value})}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Skills (comma separated) *</label>
                  <input 
                    type="text" 
                    value={editForm.skills?.join(', ') || ""} 
                    onChange={handleSkillsListChange}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                    placeholder="React, Next.js, TypeScript..."
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
                  <h4 className="font-bold text-lg mb-2">{skill.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.skills?.map(s => (
                      <span key={s} className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleEdit(skill)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(skill.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
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
