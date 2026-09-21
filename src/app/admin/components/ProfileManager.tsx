"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { FileImage, GraduationCap } from "lucide-react";

export default function ProfileManager() {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    id: "",
    name: "",
    email: "",
    bio: "",
    about: "",
    profile_photo_url: "",
    cv_url: ""
  });
  const [photoUploading, setPhotoUploading] = useState(false);
  const [cvUploading, setCvUploading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data } = await supabase.from('profile').select('*').single();
    if (data) {
      setProfileData(data);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const { id, ...updateData } = profileData;
    const { error } = profileData.id 
      ? await supabase.from('profile').update(updateData).eq('id', profileData.id)
      : await supabase.from('profile').insert([updateData]);
    setLoading(false);
    if (!error) {
      alert("Profile saved!");
      fetchProfile();
    } else {
      alert("Error saving profile: " + error.message);
    }
  };

  const uploadFile = async (file: File, type: 'photo' | 'cv') => {
    const bucket = 'portfolio-assets';
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    
    if (type === 'photo') setPhotoUploading(true);
    if (type === 'cv') setCvUploading(true);

    try {
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      if (type === 'photo') {
        setProfileData(prev => ({ ...prev, profile_photo_url: data.publicUrl }));
      } else {
        setProfileData(prev => ({ ...prev, cv_url: data.publicUrl }));
      }
    } catch (error: any) {
      alert(`Error uploading file: ${error.message}`);
    } finally {
      if (type === 'photo') setPhotoUploading(false);
      if (type === 'cv') setCvUploading(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0], 'photo');
    }
  };

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0], 'cv');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h3 className="text-2xl font-bold mb-1">Profile & CV Settings</h3>
        <p className="text-slate-500">Manage your personal information and documents.</p>
      </div>

      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            value={profileData.name || ""}
            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent py-2.5 px-4 focus:border-blue-500 focus:outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={profileData.email || ""}
            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent py-2.5 px-4 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Short Bio (Hero Section)</label>
          <textarea
            value={profileData.bio || ""}
            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
            rows={3}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent py-2.5 px-4 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">About Me (Detailed)</label>
          <textarea
            value={profileData.about || ""}
            onChange={(e) => setProfileData({...profileData, about: e.target.value})}
            rows={6}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent py-2.5 px-4 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center text-center">
            <FileImage className="h-8 w-8 text-slate-400 mb-2" />
            <span className="text-sm font-medium mb-2">Profile Photo</span>
            {profileData.profile_photo_url && (
              <img src={profileData.profile_photo_url} alt="Profile" className="w-16 h-16 rounded-full object-cover mb-4" />
            )}
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="text-xs w-full max-w-[200px]" disabled={photoUploading} />
            {photoUploading && <span className="text-xs text-blue-500 mt-2">Uploading...</span>}
          </div>
          <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center text-center">
            <GraduationCap className="h-8 w-8 text-slate-400 mb-2" />
            <span className="text-sm font-medium mb-2">CV (PDF)</span>
            {profileData.cv_url && (
              <a href={profileData.cv_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline mb-4 break-all max-w-full">
                View Current CV
              </a>
            )}
            <input type="file" accept=".pdf" onChange={handleCvUpload} className="text-xs w-full max-w-[200px]" disabled={cvUploading} />
            {cvUploading && <span className="text-xs text-blue-500 mt-2">Uploading...</span>}
          </div>
        </div>

        <button 
          onClick={handleSave}
          disabled={loading}
          className="mt-4 bg-blue-600 text-white rounded-xl py-3 px-6 font-semibold hover:bg-blue-700 transition-colors w-fit disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
