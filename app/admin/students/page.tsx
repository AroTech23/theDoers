'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';
import { Search, Users, X, MoreHorizontal, Loader2, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { MOCK_ADMIN_STUDENTS } from '@/lib/adminData';

export default function AdminStudentsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('All Programs');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  const programs = ['All Programs', 'Computer Science', 'Software Engineering', 'Data Science & AI', 'Interactive Design & HCI', 'Cybersecurity', 'Information Systems'];
  const years = ['All Years', 'Year 1', 'Year 2', 'Year 3', 'Year 4', "Master's"];
  const statuses = ['All Statuses', 'approved', 'pending', 'suspended'];

  useEffect(() => {
    async function loadStudents() {
      try {
        setLoading(true);
        const { data: dbStudents } = await supabase
          .from('users')
          .select('*, projects(id)')
          .eq('role', 'doer')
          .order('created_at', { ascending: false });

        if (dbStudents && dbStudents.length > 0) {
          setStudents(dbStudents);
        } else {
          setStudents(MOCK_ADMIN_STUDENTS);
        }
      } catch (err) {
        console.error('Error loading admin students:', err);
        setStudents(MOCK_ADMIN_STUDENTS);
      } finally {
        setLoading(false);
      }
    }

    loadStudents();
  }, [supabase]);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        searchQuery === '' ||
        s.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.program && s.program.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchProgram =
        selectedProgram === 'All Programs' || (s.program && s.program.includes(selectedProgram));

      const matchYear =
        selectedYear === 'All Years' || s.year === selectedYear;

      const matchStatus =
        selectedStatus === 'All Statuses' || s.status === selectedStatus;

      return matchSearch && matchProgram && matchYear && matchStatus;
    });
  }, [students, searchQuery, selectedProgram, selectedYear, selectedStatus]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedProgram('All Programs');
    setSelectedYear('All Years');
    setSelectedStatus('All Statuses');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedProgram !== 'All Programs' ||
    selectedYear !== 'All Years' ||
    selectedStatus !== 'All Statuses';


  return (
    <div className="max-w-7xl mx-auto px-6 py-10 w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827]">Student Moderation</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Review student applicants, approve or suspend accounts, and manage portfolio access.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#111827] shadow-xs self-start sm:self-auto">
          <Users size={16} className="text-[#4F46E5]" />
          <span>{students.length} registered students</span>
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
              placeholder="Search students by name, email, or degree..."
              className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            >
              {programs.map((p) => (
                <option key={p} value={p}>{p === 'All Programs' ? 'Program: All' : p}</option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y === 'All Years' ? 'Year: All' : y}</option>
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
              Showing <strong>{filteredStudents.length}</strong> matching students
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

      {/* Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E5E7EB] text-[#64748B] uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-6">Student</th>
                <th className="py-3 px-6">Program &amp; Year</th>
                <th className="py-3 px-6">Headline</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <Avatar name={student.full_name} size="sm" />
                    <div>
                      <p className="font-bold text-[#0F172A]">{student.full_name}</p>
                      <p className="text-[11px] text-[#64748B]">{student.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#334155]">
                    <span className="font-semibold">{student.program || 'Computer Science'}</span>
                    <span className="text-[#64748B] block text-[11px]">{student.year || 'Year 3'}</span>
                  </td>
                  <td className="py-4 px-6 text-[#64748B] max-w-xs truncate">
                    {student.headline || 'No headline set'}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        student.status === 'approved' || student.status === 'Active'
                          ? 'bg-[#DEF7EC] text-[#03543F] border border-[#BCF0DA]'
                          : student.status === 'pending' || student.status === 'Pending'
                          ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                          : 'bg-[#FDE8E8] text-[#9B1C1C] border border-[#FBD5D5]'
                      }`}
                    >
                      ● {student.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/admin/students/${student.id}`}
                      className="inline-flex items-center px-3 py-1.5 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#4F46E5] rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Review Profile →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
