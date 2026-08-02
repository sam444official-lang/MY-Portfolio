import React, { useState } from "react";
import { FileText, Plus, Edit2, Trash2, Eye, EyeOff, Save, Check, Image, Sparkles, BookOpen } from "lucide-react";
import Markdown from "react-markdown";
import { useCMS } from "../../context/CMSContext";
import { BlogPost } from "../../types";

export const BlogCMS: React.FC = () => {
  const { data, updateData, saveNow, uploadAsset } = useCMS();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const blogs = data.blogs || [];

  const handleCreateNew = () => {
    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      title: "New Developer Tech Article",
      slug: `new-tech-article-${Date.now()}`,
      summary: "A concise overview of modern web engineering and full-stack patterns.",
      content: `# Title of Your Tech Post

Write your markdown content here...

## Key Takeaways
- Modern React 19 features
- Next.js 15 App Router architecture
- Server proxy security

\`\`\`typescript
const greeting = "Hello Developer!";
console.log(greeting);
\`\`\`
`,
      category: "Engineering",
      tags: ["React 19", "Next.js", "TypeScript"],
      featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
      status: "draft",
      publishDate: new Date().toISOString().split("T")[0],
      readingTime: "3 min read",
      seoTitle: "New Developer Tech Article | Sarim Usmani",
      seoDescription: "An engineering post covering React, Next.js, and web development.",
    };

    updateData((prev) => ({
      ...prev,
      blogs: [newPost, ...prev.blogs],
    }), "Created new blog post");

    setEditingPost(newPost);
  };

  const handleDeletePost = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      updateData((prev) => ({
        ...prev,
        blogs: prev.blogs.filter((b) => b.id !== id),
      }), "Deleted blog post");

      if (editingPost?.id === id) {
        setEditingPost(null);
      }
    }
  };

  const handleTogglePublish = (post: BlogPost) => {
    const nextStatus = post.status === "published" ? "draft" : "published";
    updateData((prev) => ({
      ...prev,
      blogs: prev.blogs.map((b) =>
        b.id === post.id ? { ...b, status: nextStatus } : b
      ),
    }), `Toggled post status to ${nextStatus}`);
  };

  const handleSaveModal = async () => {
    if (!editingPost) return;

    updateData((prev) => ({
      ...prev,
      blogs: prev.blogs.map((b) => (b.id === editingPost.id ? editingPost : b)),
    }), `Saved blog post ${editingPost.title}`);

    const ok = await saveNow();
    if (ok) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
      setEditingPost(null);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingPost || !e.target.files?.[0]) return;
    const url = await uploadAsset(e.target.files[0]);
    if (url) {
      setEditingPost({ ...editingPost, featuredImage: url });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-md">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <FileText className="w-5 h-5 text-purple-400" />
            <span>Blog & Article CMS</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Write technical blogs using Markdown, publish/unpublish posts, and optimize SEO meta tags.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Blogs Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((post) => (
          <div
            key={post.id}
            className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-md flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  {post.category || "Engineering"}
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleTogglePublish(post)}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center space-x-1 border transition-all ${
                      post.status === "published"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                  >
                    {post.status === "published" ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span className="capitalize">{post.status}</span>
                  </button>

                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title="Delete Post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-bold text-white line-clamp-1">{post.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2">{post.summary}</p>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>{post.publishDate} • {post.readingTime}</span>
                <span className="font-mono text-[10px] text-emerald-400">/{post.slug}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex justify-end">
              <button
                onClick={() => setEditingPost(post)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Edit Markdown Article</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Editor Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 my-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  <span>Markdown Article Editor</span>
                </h3>
                <p className="text-xs text-slate-400">Write, format, and preview article text in real time</p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center space-x-1.5 ${
                    showPreview
                      ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                      : "bg-slate-800 text-slate-300 border-slate-700"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{showPreview ? "Hide Preview" : "Split Preview"}</span>
                </button>

                <button
                  onClick={() => setEditingPost(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveModal}
                  className="px-5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center space-x-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Post</span>
                </button>
              </div>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Article Title</label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={editingPost.slug}
                    onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Reading Time Estimate</label>
                  <input
                    type="text"
                    value={editingPost.readingTime}
                    onChange={(e) => setEditingPost({ ...editingPost, readingTime: e.target.value })}
                    placeholder="4 min read"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Summary / Excerpt</label>
                <textarea
                  rows={2}
                  value={editingPost.summary}
                  onChange={(e) => setEditingPost({ ...editingPost, summary: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Markdown Editor & Live Preview */}
              <div className={`grid ${showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-4`}>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Markdown Body Content</label>
                  <textarea
                    rows={12}
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs font-mono focus:outline-none focus:border-emerald-500 leading-relaxed"
                  />
                </div>

                {showPreview && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-y-auto max-h-[350px]">
                    <span className="text-[10px] uppercase font-bold text-slate-500 mb-2 block border-b border-slate-800 pb-1">
                      Live Markdown Render Preview
                    </span>
                    <div className="prose prose-invert prose-sm max-w-none text-slate-200">
                      <Markdown>{editingPost.content}</Markdown>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
