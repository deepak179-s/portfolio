"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { Plus, Trash2, Edit2, Check, X, Image as ImageIcon } from "lucide-react";
import type { Project } from "@/types";

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Project>>({});
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data } = await supabase.from('projects').select('*').order('order_index', { ascending: true });
    if (data) setProjects(data);
    setLoading(false);
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setEditForm({ ...project });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = async () => {
    if (!editForm.title || !editForm.description) {
      alert("Title and Description are required");
      return;
    }
    
    setLoading(true);
    if (editingId === 'new') {
      const { id, ...insertData } = editForm as any;
      const { error } = await supabase.from('projects').insert([{...insertData, order_index: projects.length}]);
      if (error) alert("Error: " + error.message);
    } else {
      const { error } = await supabase.from('projects').update(editForm).eq('id', editingId);
      if (error) alert("Error: " + error.message);
    }
    
    setEditingId(null);
    setEditForm({});
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setLoading(true);
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) alert("Error: " + error.message);
    fetchProjects();
  };

  const handleAddNew = () => {
    setEditingId('new');
    setEditForm({
      title: "",
      description: "",
      tech_stack: [],
      github_url: "",
      demo_url: "",
      image_url: ""
    });
  };

  const handleTechStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const arr = val.split(',').map(s => s.trim()).filter(s => s !== "");
    setEditForm({ ...editForm, tech_stack: arr });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    const bucket = 'portfolio-assets';
    const fileName = `project-${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    
    setUploadingImage(true);
    try {
      const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      setEditForm({ ...editForm, image_url: data.publicUrl });
    } catch (error: any) {
      alert(`Error uploading image: ${error.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-1">Projects Manager</h3>
          <p className="text-slate-500">Add, edit, or remove your portfolio projects.</p>
        </div>
        <button 
          onClick={handleAddNew}
          disabled={editingId !== null || loading}
          className="flex items-center gap-2 bg-blue-600 text-white rounded-xl py-2.5 px-4 font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Plus className="h-5 w-5" /> Add Project
        </button>
      </div>

      <div className="grid gap-4">
        {loading && projects.length === 0 && <p>Loading...</p>}
        {projects.length === 0 && !loading && editingId !== 'new' && (
          <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <p className="text-slate-500">No projects found. Add one to get started!</p>
          </div>
        )}

        {(editingId === 'new' ? [{ id: 'new', ...editForm } as Project, ...projects] : projects).map((project) => (
          <div key={project.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            {editingId === project.id ? (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Project Title *</label>
                    <input 
                      type="text" 
                      value={editForm.title || ""} 
                      onChange={e => setEditForm({...editForm, title: e.target.value})}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tech Stack (comma separated)</label>
                    <input 
                      type="text" 
                      value={editForm.tech_stack?.join(', ') || ""} 
                      onChange={handleTechStackChange}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                      placeholder="React, Node, Tailwind..."
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description (first line is summary, rest are bullets) *</label>
                  <textarea 
                    value={editForm.description || ""} 
                    onChange={e => setEditForm({...editForm, description: e.target.value})}
                    rows={4}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">GitHub URL</label>
                    <input 
                      type="text" 
                      value={editForm.github_url || ""} 
                      onChange={e => setEditForm({...editForm, github_url: e.target.value})}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Live Demo URL</label>
                    <input 
                      type="text" 
                      value={editForm.demo_url || ""} 
                      onChange={e => setEditForm({...editForm, demo_url: e.target.value})}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent py-2 px-3 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Project Image</label>
                  <div className="flex items-center gap-4">
                    {editForm.image_url && (
                      <img src={editForm.image_url} alt="Preview" className="h-12 w-20 object-cover rounded border border-slate-300 dark:border-slate-700" />
                    )}
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="text-sm"
                      />
                      {uploadingImage && <span className="text-xs text-blue-500 ml-2">Uploading...</span>}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <button onClick={handleCancel} className="flex items-center gap-1 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <X className="h-4 w-4" /> Cancel
                  </button>
                  <button onClick={handleSave} disabled={loading || uploadingImage} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50">
                    <Check className="h-4 w-4" /> Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="w-24 h-16 object-cover rounded-lg border border-slate-200 dark:border-slate-800 hidden sm:block" />
                  ) : (
                    <div className="w-24 h-16 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hidden sm:flex">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-lg">{project.title}</h4>
                    <p className="text-sm text-slate-500 line-clamp-1">{project.description}</p>
                    <div className="flex gap-2 mt-2">
                      {project.tech_stack?.slice(0,3).map(tech => (
                        <span key={tech} className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                          {tech}
                        </span>
                      ))}
                      {(project.tech_stack?.length || 0) > 3 && <span className="text-[10px] text-slate-500">+{project.tech_stack!.length - 3}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleEdit(project)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
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
