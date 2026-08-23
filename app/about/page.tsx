import Link from 'next/link';
import Button from '@/components/ui/Button';
import { 
  Target, 
  Users, 
  Sparkles, 
  ArrowLeft, 
  ShieldCheck, 
  Code2, 
  Globe2, 
  Compass, 
  ArrowRight,
  GraduationCap,
  ExternalLink,
  Mail
} from 'lucide-react';

export default function AboutUsPage() {
  const founders = [
    {
      name: 'Arnold Ngong',
      role: 'Co-Founder & Lead Systems Architect',
      program: 'B.S. Software Engineering & AI',
      bio: 'Passionate about distributed web architectures, high-performance backends, and bridging real engineering talent with global opportunities.',
      initials: 'AN',
      avatarBg: 'bg-[#4F46E5]',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Kofi Mensah',
      role: 'Co-Founder & Head of Product & UX',
      program: 'B.S. Interactive Design & HCI',
      bio: 'Focused on creating frictionless, human-centered digital experiences and design systems that let student projects shine.',
      initials: 'KM',
      avatarBg: 'bg-[#0284C7]',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    },
    {
      name: 'Emmanuel Adeyemi',
      role: 'Co-Founder & Platform Operations',
      program: 'B.S. Computer Science & Cloud Systems',
      bio: 'Dedicated to community growth, university tech partnerships, and building verified verification standards for ethical student builders.',
      initials: 'EA',
      avatarBg: 'bg-[#7C3AED]',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-6">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 flex flex-col gap-16">
        
        {/* Previous / Back Navigation */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F46E5] hover:text-[#3730A3] transition-colors bg-[#EEF2FF] px-3.5 py-1.5 rounded-xl shadow-2xs"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>

        {/* ── 1. HERO SECTION & MISSION MANIFESTO ── */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-[#E2E8F0] rounded-full text-xs font-bold text-[#4F46E5] shadow-2xs mb-4">
            <Compass size={14} /> Our Mission &amp; Story
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
            Proof of Work Over <span className="text-[#4F46E5]">Paper Resumes</span>
          </h1>
          <p className="text-base sm:text-lg text-[#64748B] mt-5 leading-relaxed">
            <strong className="text-[#0F172A]">theDoers</strong> is a dedicated talent showcase network founded by tech students to bridge the gap between academic theory and real-world engineering impact.
          </p>
        </div>

        {/* ── 2. THE ORIGIN STORY & THE PROBLEM ── */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 lg:p-12 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">Why We Built theDoers</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Degrees tell where you studied. Projects prove what you can do.
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              As computer science and engineering students, we constantly noticed that conventional job portals and bulleted CVs flatten months of complex coding, system architecture, and debugging into mere buzzwords.
            </p>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              We created theDoers to give passionate builders an authentic stage to showcase deep case studies: their problem breakdown, engineering process, source code, and working live demos.
            </p>
          </div>

          {/* Key Platform Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center font-bold mb-3">
                <Code2 size={20} />
              </div>
              <h4 className="font-bold text-sm text-[#0F172A] mb-1">Working Systems</h4>
              <p className="text-xs text-[#64748B]">Real code repositories, live APIs, and interactive prototypes.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center font-bold mb-3">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-bold text-sm text-[#0F172A] mb-1">High-Trust Vetting</h4>
              <p className="text-xs text-[#64748B]">Admin reviewed student portfolios to ensure authenticity.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5FF] text-[#7C3AED] flex items-center justify-center font-bold mb-3">
                <Globe2 size={20} />
              </div>
              <h4 className="font-bold text-sm text-[#0F172A] mb-1">Global Access</h4>
              <p className="text-xs text-[#64748B]">Connecting regional student talent directly with global opportunities.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="w-10 h-10 rounded-xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center font-bold mb-3">
                <GraduationCap size={20} />
              </div>
              <h4 className="font-bold text-sm text-[#0F172A] mb-1">Student-First</h4>
              <p className="text-xs text-[#64748B]">Built by tech students, designed specifically for emerging innovators.</p>
            </div>
          </div>
        </div>

        {/* ── 3. PLATFORM PILLARS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xs flex flex-col gap-3">
            <div className="w-12 h-12 bg-[#EEF2FF] text-[#4F46E5] rounded-2xl flex items-center justify-center">
              <Target size={24} />
            </div>
            <h3 className="font-bold text-lg text-[#0F172A]">1. The Engineering Story</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Every project on theDoers follows a structured framework: Problem Identification → Current State → Engineering Process → The Solution → Verified Results.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xs flex flex-col gap-3">
            <div className="w-12 h-12 bg-[#EEF2FF] text-[#4F46E5] rounded-2xl flex items-center justify-center">
              <Users size={24} />
            </div>
            <h3 className="font-bold text-lg text-[#0F172A]">2. Ethical Community</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              We champion responsible, ethical technologists who solve genuine community, environmental, educational, and business challenges.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xs flex flex-col gap-3">
            <div className="w-12 h-12 bg-[#EEF2FF] text-[#4F46E5] rounded-2xl flex items-center justify-center">
              <Sparkles size={24} />
            </div>
            <h3 className="font-bold text-lg text-[#0F172A]">3. Instant Discovery</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Recruiters and collaborators can filter by specialized stacks across AI, IoT, Web, Mobile, Data Science, and Cybersecurity in seconds.
            </p>
          </div>
        </div>

        {/* ── 4. MEET THE FOUNDERS SECTION (The 3 Tech Student Co-Founders) ── */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">Leadership &amp; Creators</span>
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mt-1">Meet the Founders</h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1.5">
              Built by three tech students passionate about engineering software and empowering student talent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {founders.map((founder) => (
              <div 
                key={founder.name}
                className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-xs flex flex-col items-center text-center hover:shadow-md hover:border-[#CBD5E1] transition-all"
              >
                {/* Avatar Badge */}
                <div className={`w-20 h-20 rounded-full ${founder.avatarBg} text-white flex items-center justify-center text-xl font-extrabold shadow-sm mb-4`}>
                  {founder.initials}
                </div>

                <h3 className="text-lg font-bold text-[#0F172A]">{founder.name}</h3>
                <p className="text-xs font-bold text-[#4F46E5] mt-0.5">{founder.role}</p>
                <p className="text-[11px] text-[#64748B] font-medium mt-0.5 mb-4">{founder.program}</p>

                <p className="text-xs text-[#64748B] leading-relaxed flex-1 mb-6">
                  {founder.bio}
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-2 pt-4 border-t border-[#F1F5F9] w-full justify-center text-[#64748B] text-xs font-semibold">
                  <a href={founder.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg transition-colors border border-[#E2E8F0]">
                    <Code2 size={13} /> GitHub
                  </a>
                  <a href={founder.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 hover:text-[#4F46E5] hover:bg-[#EEF2FF] rounded-lg transition-colors border border-[#E2E8F0]">
                    <ExternalLink size={13} /> LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 5. PLATFORM METRICS ── */}
        <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#312E81] rounded-3xl p-8 lg:p-12 text-white shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">250+</div>
              <div className="text-xs text-white/70 font-semibold uppercase tracking-wider mt-1">Student Builders</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#38BDF8]">130+</div>
              <div className="text-xs text-white/70 font-semibold uppercase tracking-wider mt-1">Published Projects</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#4ADE80]">15+</div>
              <div className="text-xs text-white/70 font-semibold uppercase tracking-wider mt-1">Tech Disciplines</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#C084FC]">100%</div>
              <div className="text-xs text-white/70 font-semibold uppercase tracking-wider mt-1">Verified Case Studies</div>
            </div>
          </div>
        </div>

        {/* ── 6. DUAL CALL TO ACTION ── */}
        <div className="rounded-3xl bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-[#E2E8F0] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
              Ready to showcase your engineering work?
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-lg leading-relaxed">
              Join the growing network of student developers, designers, and AI creators. Publish your case studies in minutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/register">
              <Button variant="primary" size="lg" className="font-bold shadow-xs">
                Become a Doer <ArrowRight size={15} className="ml-1" />
              </Button>
            </Link>
            <Link href="/doers">
              <Button variant="outline" size="lg" className="font-bold">
                Explore Directory
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
