'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, Layers, Loader2, ExternalLink, Image as ImageIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import { MOCK_ADMIN_PROJECTS } from '@/lib/adminData';

export default function AdminProjectsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  const categories = ['All Categories', 'IoT & Embedded', 'AI / Machine Learning', 'Web Development', 'Mobile Development', 'Data Science', 'Cybersecurity', 'Cloud Infrastructure'];
  const statuses = ['All Statuses', 'published', 'draft'];

  useEffect(() => {
    async function loadAdminProjects() {
      try {
        setLoading(true);
        const { data: dbProjects } = await supabase
          .from('projects')
          .select('*, doer:users(full_name, username, program, year)')
          .order('created_at', { ascending: false });

        if (dbProjects && dbProjects.length > 0) {
          setProjects(dbProjects);
        } else {
          setProjects(MOCK_ADMIN_PROJECTS);
        }
      } catch (err) {
        console.error('Error loading admin projects:', err);
        setProjects(MOCK_ADMIN_PROJECTS);
      } finally {
        setLoading(false);
      }
    }

    loadAdminProjects();
  }, [supabase]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const studentName = p.doer?.full_name || p.student_name || '';
      const matchSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCat =
        selectedCategory === 'All Categories' || p.category === selectedCategory;

      const matchStatus =
        selectedStatus === 'All Statuses' || p.status === selectedStatus;

      return matchSearch && matchCat && matchStatus;
    });
  }, [projects, searchQuery, selectedCategory, selectedStatus]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedStatus('All Statuses');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All Categories' ||
    selectedStatus !== 'All Statuses';

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 size={32} className="animate-spin text-[#4F46E5]" />
        <p className="text-xs font-bold text-[#64748B]">Loading platform case studies...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Case Study Moderation</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Review student engineering projects, live demos, and moderated case studies across the network.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#111827] shadow-xs self-start sm:self-auto">
          <Layers size={16} className="text-[#4F46E5]" />
          <span>{projects.length} total projects</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project title, student name, or category..."
              className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            />
          </div>

          {/* Dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'All Categories' ? 'Category: All' : c}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>{st === 'All Statuses' ? 'Status: All' : `Status: ${st}`}</option>
              ))}
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-[#F3F4F6]">
            <span className="text-xs text-[#6B7280]">
              Showing <strong>{filteredProjects.length}</strong> matching projects
            </span>
            <button
              onClick={handleClearFilters}
              className="text-xs font-bold text-[#EF4444] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X size={14} /> Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#64748B] uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-6">Project Title</th>
                <th className="py-3 px-6">Author</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredProjects.map((p) => {
                const authorName = p.doer?.full_name || p.student_name || 'Student Engineer';
                return (
                  <tr key={p.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-[#0F172A] text-sm line-clamp-1">{p.title}</p>
                      <p className="text-[11px] text-[#64748B] line-clamp-1 mt-0.5">{p.description}</p>
                    </td>
                    <td className="py-4 px-6 text-[#334155]">
                      <span className="font-semibold text-[#0F172A]">{authorName}</span>
                      {p.doer?.program && (
                        <span className="text-[#64748B] block text-[11px]">{p.doer.program}</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-wider bg-[#EEF2FF] px-2.5 py-1 rounded-lg">
                        {p.category || 'General'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === 'published' || p.status === 'Published'
                            ? 'bg-[#DEF7EC] text-[#03543F] border border-[#BCF0DA]'
                            : 'bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]'
                        }`}
                      >
                        ● {p.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/projects/${p.id}`}
                        target="_blank"
                        className="inline-flex items-center px-3 py-1.5 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#4F46E5] rounded-lg text-xs font-bold transition-colors cursor-pointer gap-1"
                      >
                        Inspect <ExternalLink size={11} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
