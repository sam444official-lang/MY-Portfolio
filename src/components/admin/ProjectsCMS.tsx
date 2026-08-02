import React, { useState } from "react";
import { FolderGit2, Plus, Edit2, Trash2, Copy, Save, Check, Sparkles, Star, Eye, EyeOff, Upload, ExternalLink, Github, Youtube, FileText, MoveUp, MoveDown } from "lucide-react";
import { useCMS } from "../../context/CMSContext";
import { Project } from "../../types";

export const ProjectsCMS: React.FC = () => {
  const { data, updateData, saveNow, uploadAsset } = useCMS();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSavingModal, setIsSavingModal] = useState(false);
  const [modalSavedSuccess, setModalSavedSuccess] = useState(false);

  const allProjects: Project[] = [
    ...(data.featuredProject ? [data.featuredProject] : []),
    ...(data.additionalProjects || []),
  ];

  const handleCreateNew = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: "New Developer Project",
      subtitle: "High-Performance Full-Stack Web Application",
      description: "Comprehensive breakdown of architectural features and technical implementation details.",
      isFeatured: false,
      features: ["User Authentication & OAuth", "Responsive Dark/Light UI", "REST API Backend Integration"],
      technologies: ["React 19", "TypeScript", "Tailwind CSS", "Node.js"],
      githubUrl: "https://github.com/sarim-usmani/new-project",
      liveDemoUrl: "https://example.com",
      architectureOverview: "Built on modern React and TypeScript with modular server proxies.",
      challengesSolved: ["Optimized state transitions and component render performance."],
      futureImprovements: ["Adding WebSockets for real-time live sync."],
      imagePlaceholderText: "Project Screenshot Placeholder",
      status: "published",
      category: "Full-Stack Web",
      tags: ["React", "TypeScript", "Node.js"],
    };

    updateData((prev) => ({
      ...prev,
      additionalProjects: [newProj, ...prev.additionalProjects],
    }), "Created new project");

    setEditingProject(newProj);
  };

  const handleDuplicate = (project: Project) => {
    const duplicated: Project = {
      ...project,
      id: `proj-copy-${Date.now()}`,
      title: `${project.title} (Copy)`,
      isFeatured: false,
    };

    updateData((prev) => ({
      ...prev,
      additionalProjects: [duplicated, ...prev.additionalProjects],
    }), `Duplicated project ${project.title}`);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      updateData((prev) => ({
        ...prev,
        additionalProjects: prev.additionalProjects.filter((p) => p.id !== id),
      }), `Deleted project ${id}`);

      if (editingProject?.id === id) {
        setEditingProject(null);
      }
    }
  };

  const handleToggleFeatured = (project: Project) => {
    updateData((prev) => {
      // If setting this project as featured, swap with existing featured
      if (!project.isFeatured) {
        const previousFeatured = prev.featuredProject;
        const newAdditional = prev.additionalProjects
          .filter((p) => p.id !== project.id)
          .concat(previousFeatured ? [{ ...previousFeatured, isFeatured: false }] : []);

        return {
          ...prev,
          featuredProject: { ...project, isFeatured: true },
          additionalProjects: newAdditional,
        };
      }
      return prev;
    }, `Set ${project.title} as featured project`);
  };

  const handleSaveModal = async () => {
    if (!editingProject) return;
    setIsSavingModal(true);

    let updatedStore: any = null;

    updateData((prev) => {
      let nextState: any;
      if (editingProject.isFeatured) {
        nextState = {
          ...prev,
          featuredProject: editingProject,
        };
      } else {
        const isExisting = prev.additionalProjects.some((p) => p.id === editingProject.id);
        nextState = {
          ...prev,
          additionalProjects: isExisting
            ? prev.additionalProjects.map((p) => (p.id === editingProject.id ? editingProject : p))
            : [editingProject, ...prev.additionalProjects],
        };
      }
      updatedStore = nextState;
      return nextState;
    }, `Saved edits for project "${editingProject.title}"`);

    const ok = await saveNow(updatedStore || undefined);
    setIsSavingModal(false);

    if (ok) {
      setModalSavedSuccess(true);
      setTimeout(() => {
        setModalSavedSuccess(false);
        setEditingProject(null);
      }, 800);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProject || !e.target.files?.[0]) return;
    const url = await uploadAsset(e.target.files[0]);
    if (url) {
      setEditingProject((prev) => (prev ? { ...prev, thumbnailUrl: url } : null));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <FolderGit2 className="w-5 h-5 text-emerald-400" />
            <span>Project Portfolio CMS</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage flagship capstone builds, additional projects, tech stacks, live links, and media galleries.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Project</span>
        </button>
      </div>

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allProjects.map((proj) => (
          <div
            key={proj.id}
            className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
              proj.isFeatured
                ? "bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/30 border-emerald-500/40 shadow-xl"
                : "bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-md"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    proj.isFeatured
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}
                >
                  {proj.isFeatured ? "★ Featured Flagship Capstone" : proj.category || "Project"}
                </span>

                <div className="flex items-center space-x-1">
                  {!proj.isFeatured && (
                    <button
                      onClick={() => handleToggleFeatured(proj)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                      title="Set as Flagship Featured"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDuplicate(proj)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors"
                    title="Duplicate Project"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {!proj.isFeatured && (
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white line-clamp-1">{proj.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1">{proj.subtitle || proj.description}</p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {proj.technologies.slice(0, 4).map((tech, i) => (
                  <span key={i} className="text-[10px] bg-slate-950 px-2 py-0.5 rounded-md text-slate-300 border border-slate-800">
                    {tech}
                  </span>
                ))}
                {proj.technologies.length > 4 && (
                  <span className="text-[10px] bg-slate-950 px-1.5 py-0.5 rounded-md text-slate-500 border border-slate-800">
                    +{proj.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                {proj.status === "draft" ? "Draft Mode" : "Published"}
              </span>

              <button
                onClick={() => setEditingProject(proj)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Edit Project Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full Modal Project Editor */}
      {editingProject && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <FolderGit2 className="w-5 h-5 text-emerald-400" />
                  <span>Edit: {editingProject.title}</span>
                </h3>
                <p className="text-xs text-slate-400">Update project links, features, tech stack, and media</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveModal}
                  disabled={isSavingModal}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center space-x-1.5 transition-all cursor-pointer disabled:opacity-50"
                >
                  {modalSavedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-slate-950" />
                      <span>Project Saved!</span>
                    </>
                  ) : isSavingModal ? (
                    <>
                      <Save className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Project</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle / Short Description</label>
                  <input
                    type="text"
                    value={editingProject.subtitle}
                    onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Project Category</label>
                  <input
                    type="text"
                    value={editingProject.category || "Full-Stack Web"}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    placeholder="Full-Stack Web, AI App, Mobile"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={editingProject.status || "published"}
                    onChange={(e: any) => setEditingProject({ ...editingProject, status: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Image & Asset Upload */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="block text-xs font-semibold text-slate-300">Project Thumbnail Image URL or Upload</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/... or upload asset"
                    value={editingProject.thumbnailUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, thumbnailUrl: e.target.value })}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
                  />
                  <label className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center space-x-1.5 cursor-pointer shrink-0">
                    <Upload className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={editingProject.liveDemoUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, liveDemoUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Documentation URL</label>
                  <input
                    type="url"
                    value={editingProject.docUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, docUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">YouTube Demo / Case Study URL</label>
                  <input
                    type="url"
                    value={editingProject.videoUrl || editingProject.caseStudyUrl || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, videoUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Technologies Used (Comma Separated)
                </label>
                <input
                  type="text"
                  value={editingProject.technologies.join(", ")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Features List */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Key Features (One per line)
                </label>
                <textarea
                  rows={4}
                  value={editingProject.features.join("\n")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      features: e.target.value.split("\n").filter((f) => f.trim() !== ""),
                    })
                  }
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 font-mono text-xs"
                />
              </div>

              {/* Architecture & Challenges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Architecture Overview</label>
                  <textarea
                    rows={3}
                    value={editingProject.architectureOverview || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, architectureOverview: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Challenges Solved (One per line)</label>
                  <textarea
                    rows={3}
                    value={(editingProject.challengesSolved || []).join("\n")}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        challengesSolved: e.target.value.split("\n").filter(Boolean),
                      })
                    }
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Future Improvements / Roadmap (One per line)</label>
                <textarea
                  rows={2}
                  value={(editingProject.futureImprovements || []).join("\n")}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      futureImprovements: e.target.value.split("\n").filter(Boolean),
                    })
                  }
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
