import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Lock, 
  GraduationCap, 
  LogOut, 
  Calendar, 
  BookOpen, 
  Clock, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Plus, 
  Search,
  School,
  Mail,
  UserCheck,
  ChevronRight
} from 'lucide-react';

export default function PortalTab() {
  const [activeRole, setActiveRole] = useState<'student' | 'teacher'>('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'teacher'>('student');
  const [error, setError] = useState('');

  // Student Dashboard State
  const [studentData, setStudentData] = useState({
    name: 'Kasun Perera',
    id: 'STU-2026-089',
    grade: 'Grade 11-A',
    attendance: '94%',
    gpa: '3.82',
    rank: '3rd in Class',
    contact: 'kasun.perera@email.com',
    recentGrades: [
      { subject: 'Science & Technology', marks: 88, grade: 'A' },
      { subject: 'Mathematics', marks: 95, grade: 'A+' },
      { subject: 'History', marks: 82, grade: 'A' },
      { subject: 'Sinhala Language', marks: 78, grade: 'B' },
      { subject: 'English Language', marks: 85, grade: 'A' },
    ],
    announcements: [
      { id: 1, title: 'Term Evaluation Exam Schedule', date: 'July 20, 2026', desc: 'The second term examinations will commence on July 28th. Please download the timetable.' },
      { id: 2, title: 'Science Lab Refurbishment', date: 'July 14, 2026', desc: 'The junior science lab is closed for upgrades. Chemistry classes will move to Room 4B.' },
    ],
    timetable: [
      { period: '1st (08:00 - 08:45)', subject: 'Mathematics', teacher: 'Mrs. Jayasinghe' },
      { period: '2nd (08:45 - 09:30)', subject: 'Science', teacher: 'Mr. Shantha' },
      { period: 'Interval (09:30 - 10:00)', subject: 'Break', teacher: '-' },
      { period: '3rd (10:00 - 10:45)', subject: 'Sinhala', teacher: 'Mrs. Silva' },
    ]
  });

  // Teacher Dashboard State
  const [teacherData, setTeacherData] = useState({
    name: 'Mr. Sunil Shantha',
    id: 'TCH-2026-012',
    department: 'Science & Tech',
    email: 'sunil.sh@rathanasara.edu.lk',
    classes: ['Grade 11-A', 'Grade 11-B', 'Grade 10-A'],
    students: [
      { id: 'STU-2026-089', name: 'Kasun Perera', scienceMark: 88, attendance: '94%' },
      { id: 'STU-2026-042', name: 'Nimali Senanayake', scienceMark: 92, attendance: '98%' },
      { id: 'STU-2026-105', name: 'Ruwan Wijesinghe', scienceMark: 74, attendance: '88%' },
      { id: 'STU-2026-011', name: 'Dilhani Rodrigo', scienceMark: 81, attendance: '91%' },
    ],
    notices: [
      { id: 1, title: 'Syllabus Coverage Audit', deadline: 'July 22, 2026' },
      { id: 2, title: 'Staff Meeting & Teacher Training', deadline: 'July 25, 2026' }
    ]
  });

  const [newGradeStudentId, setNewGradeStudentId] = useState('');
  const [newGradeMark, setNewGradeMark] = useState('');
  const [gradeSuccessMessage, setGradeSuccessMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    // Default mock logins
    if (activeRole === 'student') {
      setIsLoggedIn(true);
      setUserRole('student');
    } else {
      setIsLoggedIn(true);
      setUserRole('teacher');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setGradeSuccessMessage('');
  };

  const handleUpdateGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGradeStudentId || !newGradeMark) {
      alert('Please select a student and enter marks');
      return;
    }

    const markNum = parseInt(newGradeMark);
    if (isNaN(markNum) || markNum < 0 || markNum > 100) {
      alert('Please enter a valid mark between 0 and 100');
      return;
    }

    // Update internal teacher student list
    setTeacherData(prev => ({
      ...prev,
      students: prev.students.map(stu => {
        if (stu.id === newGradeStudentId) {
          return { ...stu, scienceMark: markNum };
        }
        return stu;
      })
    }));

    // If it's the logged-in student, update student's data as well
    if (newGradeStudentId === studentData.id) {
      setStudentData(prev => ({
        ...prev,
        recentGrades: prev.recentGrades.map(g => {
          if (g.subject === 'Science & Technology') {
            const letterGrade = markNum >= 75 ? 'A' : markNum >= 65 ? 'B' : markNum >= 50 ? 'C' : 'S';
            return { ...g, marks: markNum, grade: letterGrade };
          }
          return g;
        })
      }));
    }

    setGradeSuccessMessage('Student marks updated successfully!');
    setNewGradeMark('');
    setTimeout(() => setGradeSuccessMessage(''), 4000);
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto" id="portal-tab-section">
      <div className="text-center mb-12">
        <span className="text-[#735c00] font-semibold text-xs md:text-sm uppercase tracking-widest mb-2 inline-block font-sans">
          Digital Campus
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-[#570000] mb-4">
          Walpola Sri Rathanasara Portals
        </h2>
        <p className="text-sm md:text-base text-[#5a413d] max-w-2xl mx-auto font-sans leading-relaxed">
          Access your personalized dashboard to view marks, attendance, curriculum details, and communicate with instructors.
        </p>
      </div>

      {!isLoggedIn ? (
        /* LOGIN PORTAL CARD */
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-[#e2bfb9]/40 shadow-md overflow-hidden" id="portal-login-card">
          {/* Tab selector */}
          <div className="flex border-b border-[#e2bfb9]/20 bg-zinc-50">
            <button
              onClick={() => { setActiveRole('student'); setError(''); }}
              className={`flex-1 py-4 text-sm font-semibold tracking-wide transition-all cursor-pointer border-b-2 flex items-center justify-center gap-2 ${
                activeRole === 'student' 
                  ? 'border-[#570000] text-[#570000] bg-white font-bold' 
                  : 'border-transparent text-[#5a413d] hover:bg-zinc-100'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              Student Portal
            </button>
            <button
              onClick={() => { setActiveRole('teacher'); setError(''); }}
              className={`flex-1 py-4 text-sm font-semibold tracking-wide transition-all cursor-pointer border-b-2 flex items-center justify-center gap-2 ${
                activeRole === 'teacher' 
                  ? 'border-[#570000] text-[#570000] bg-white font-bold' 
                  : 'border-transparent text-[#5a413d] hover:bg-zinc-100'
              }`}
            >
              <UserCheck className="h-4 w-4" />
              Instructor Portal
            </button>
          </div>

          <div className="p-6 md:p-10">
            <div className="text-center mb-8">
              <div className="mx-auto w-12 h-12 bg-[#570000]/10 rounded-full flex items-center justify-center text-[#570000] mb-3">
                <School className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-zinc-950">Portal Login</h3>
              <p className="text-xs text-zinc-500 mt-1">
                {activeRole === 'student' 
                  ? 'Sign in to view your academic records and grades.' 
                  : 'Faculty login to update evaluations and view schedules.'}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs flex items-center gap-2 border border-red-100">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wide mb-1.5 font-sans">
                  {activeRole === 'student' ? 'Student ID' : 'Faculty / Instructor ID'}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={activeRole === 'student' ? 'e.g. STU-2026-089' : 'e.g. TCH-2026-012'}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#570000]/20 focus:border-[#570000] transition-all text-zinc-950"
                  />
                </div>
                <p className="text-[10px] text-zinc-400 mt-1">
                  Tip: You can use any simulated ID & password to explore.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wide font-sans">
                    Password
                  </label>
                  <a href="#reset" className="text-xs text-[#735c00] hover:underline" onClick={(e) => {e.preventDefault(); alert("Please contact administrative office to reset password.");}}>
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#570000]/20 focus:border-[#570000] transition-all text-zinc-950"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#735c00] hover:bg-[#570000] text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
              >
                Sign In
                <ChevronRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* PORTAL AUTHENTICATED DASHBOARD */
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* HEADER NAV STATE */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-[#e2bfb9]/40 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#ffe088] rounded-full flex items-center justify-center text-[#241a00] font-bold text-lg">
                {userRole === 'student' ? studentData.name.charAt(0) : teacherData.name.charAt(0)}
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block">
                  {userRole === 'student' ? 'Student Portal' : 'Instructor Portal'}
                </span>
                <h3 className="font-display text-xl font-bold text-zinc-950">
                  {userRole === 'student' ? studentData.name : teacherData.name}
                </h3>
                <span className="text-xs text-zinc-500 font-mono">
                  ID: {userRole === 'student' ? studentData.id : teacherData.id} • {userRole === 'student' ? studentData.grade : teacherData.department}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border border-red-100"
            >
              <LogOut className="h-4 w-4" />
              Logout Portal
            </button>
          </div>

          {userRole === 'student' ? (
            /* STUDENT PORTAL CONTENT */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="student-portal-dashboard">
              {/* Left column (grades / timetable) */}
              <div className="lg:col-span-8 space-y-8">
                {/* Statistics banner */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-[#e2bfb9]/30 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs text-zinc-500 block">Attendance</span>
                      <span className="font-bold text-lg text-zinc-950">{studentData.attendance}</span>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-[#e2bfb9]/30 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs text-zinc-500 block">GPA / Average</span>
                      <span className="font-bold text-lg text-zinc-950">{studentData.gpa} GPA</span>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-[#e2bfb9]/30 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-[#570000]/5 text-[#570000] rounded-xl">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs text-zinc-500 block">Class Rank</span>
                      <span className="font-bold text-lg text-zinc-950">{studentData.rank}</span>
                    </div>
                  </div>
                </div>

                {/* Term Evaluation & Grades */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e2bfb9]/40 shadow-sm">
                  <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 pb-4">
                    <BookOpen className="h-5 w-5 text-[#735c00]" />
                    <h4 className="font-display text-lg font-bold text-zinc-900">Term Grades / Marksheet</h4>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-100 text-xs text-zinc-500 uppercase font-semibold font-sans">
                          <th className="py-3">Subject</th>
                          <th className="py-3">Assessment Marks</th>
                          <th className="py-3 text-right">Grade Letter</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-50 text-sm">
                        {studentData.recentGrades.map((grade, idx) => (
                          <tr key={idx} className="hover:bg-zinc-50/50">
                            <td className="py-3.5 font-medium text-zinc-900">{grade.subject}</td>
                            <td className="py-3.5 font-mono text-zinc-600">
                              <div className="flex items-center gap-2">
                                <div className="w-24 bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${grade.marks >= 75 ? 'bg-emerald-500' : grade.marks >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                                    style={{ width: `${grade.marks}%` }}
                                  />
                                </div>
                                <span>{grade.marks} / 100</span>
                              </div>
                            </td>
                            <td className="py-3.5 text-right font-bold text-zinc-950">
                              <span className={`px-2.5 py-1 rounded-md text-xs ${
                                grade.grade === 'A+' || grade.grade === 'A' 
                                  ? 'bg-emerald-50 text-emerald-700' 
                                  : grade.grade === 'B' 
                                    ? 'bg-blue-50 text-blue-700' 
                                    : 'bg-amber-50 text-amber-700'
                              }`}>
                                {grade.grade}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Timetable schedule */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e2bfb9]/40 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 border-b border-zinc-100 pb-3">
                    <Clock className="h-5 w-5 text-[#570000]" />
                    <h4 className="font-display text-lg font-bold text-zinc-900">Today's Class Timetable</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {studentData.timetable.map((t, idx) => (
                      <div key={idx} className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 flex flex-col gap-1 text-xs md:text-sm">
                        <span className="font-mono text-zinc-400 text-[10px] uppercase font-bold">{t.period}</span>
                        <span className="font-semibold text-zinc-900">{t.subject}</span>
                        <span className="text-zinc-500 text-[11px]">{t.teacher}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column (Announcements & Contacts) */}
              <div className="lg:col-span-4 space-y-8">
                {/* Important notices */}
                <div className="bg-white p-6 rounded-2xl border border-[#e2bfb9]/40 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                    <h4 className="font-display font-bold text-zinc-900 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                      Academic Notices
                    </h4>
                  </div>
                  <div className="space-y-4 divide-y divide-zinc-100">
                    {studentData.announcements.map((ann) => (
                      <div key={ann.id} className="pt-3 first:pt-0 space-y-1.5">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="font-bold text-zinc-400 uppercase tracking-wide">{ann.date}</span>
                          <span className="bg-[#ffe088]/30 text-[#735c00] font-semibold px-2 py-0.5 rounded-full">Alert</span>
                        </div>
                        <h5 className="font-semibold text-sm text-zinc-900">{ann.title}</h5>
                        <p className="text-xs text-zinc-600 leading-relaxed">{ann.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Faculty Contact Support */}
                <div className="bg-[#570000]/5 p-6 rounded-2xl border border-[#570000]/10 space-y-4">
                  <div className="flex items-center gap-3 text-[#570000]">
                    <Mail className="h-5 w-5" />
                    <h4 className="font-display font-bold text-sm uppercase tracking-wide">Portal Support</h4>
                  </div>
                  <p className="text-xs text-[#5a413d] leading-relaxed">
                    Experiencing incorrect marks or attendance statistics? Directly email our records registrar or submit a ticket to:
                  </p>
                  <div className="bg-white p-3 rounded-xl border border-[#570000]/10 text-xs font-mono text-[#570000] text-center font-bold">
                    registrar@rathanasara.edu.lk
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* TEACHER PORTAL CONTENT */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="teacher-portal-dashboard">
              {/* Left Column - Update Grades & Tasks */}
              <div className="lg:col-span-8 space-y-8">
                {/* Grade Entry Form */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e2bfb9]/40 shadow-sm">
                  <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 pb-4">
                    <FileText className="h-5 w-5 text-[#735c00]" />
                    <h4 className="font-display text-lg font-bold text-zinc-900">Grade Entry / Continuous Assessment</h4>
                  </div>

                  {gradeSuccessMessage && (
                    <div className="mb-5 bg-emerald-50 text-emerald-700 p-4 rounded-xl text-xs flex items-center gap-2 border border-emerald-100">
                      <CheckCircle2 className="h-5 w-5 shrink-0" />
                      <span className="font-bold">{gradeSuccessMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleUpdateGrade} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wide mb-1.5 font-sans">
                          Select Student
                        </label>
                        <select
                          required
                          value={newGradeStudentId}
                          onChange={(e) => setNewGradeStudentId(e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#570000]/20 focus:border-[#570000] text-zinc-950"
                        >
                          <option value="">-- Choose Student --</option>
                          {teacherData.students.map((stu) => (
                            <option key={stu.id} value={stu.id}>
                              {stu.name} ({stu.id})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wide mb-1.5 font-sans">
                          Science Assessment Marks (0-100)
                        </label>
                        <input
                          type="number"
                          required
                          min="0"
                          max="100"
                          value={newGradeMark}
                          onChange={(e) => setNewGradeMark(e.target.value)}
                          placeholder="e.g. 85"
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#570000]/20 focus:border-[#570000] text-zinc-950"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#570000] hover:bg-[#800000] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                        Update Evaluation Mark
                      </button>
                    </div>
                  </form>
                </div>

                {/* Science Marks List */}
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e2bfb9]/40 shadow-sm">
                  <div className="flex items-center justify-between mb-6 border-b border-zinc-100 pb-4">
                    <h4 className="font-display text-lg font-bold text-zinc-900 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-[#570000]" />
                      Class Student Records (Science / Grade 11-A)
                    </h4>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-100 text-xs text-zinc-500 uppercase font-semibold font-sans">
                          <th className="py-3">Student Name</th>
                          <th className="py-3">Student ID</th>
                          <th className="py-3">Attendance Rate</th>
                          <th className="py-3 text-right">Science Mark</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-50 text-sm">
                        {teacherData.students.map((stu) => (
                          <tr key={stu.id} className="hover:bg-zinc-50/50">
                            <td className="py-3.5 font-medium text-zinc-900">{stu.name}</td>
                            <td className="py-3.5 text-zinc-600 font-mono text-xs">{stu.id}</td>
                            <td className="py-3.5 text-zinc-600">{stu.attendance}</td>
                            <td className="py-3.5 text-right font-bold font-mono">
                              <span className={`px-2.5 py-1 rounded-md text-xs ${
                                stu.scienceMark >= 75 
                                  ? 'bg-emerald-50 text-emerald-700' 
                                  : stu.scienceMark >= 50 
                                    ? 'bg-blue-50 text-blue-700' 
                                    : 'bg-red-50 text-red-700'
                              }`}>
                                {stu.scienceMark}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column - Faculty Alerts & Tasks */}
              <div className="lg:col-span-4 space-y-8">
                {/* Faculty notices */}
                <div className="bg-white p-6 rounded-2xl border border-[#e2bfb9]/40 shadow-sm space-y-4">
                  <h4 className="font-display font-bold text-zinc-900 flex items-center gap-2 border-b border-zinc-100 pb-3">
                    <AlertCircle className="h-5 w-5 text-[#735c00]" />
                    Instructor Audits / Tasks
                  </h4>
                  <div className="space-y-4">
                    {teacherData.notices.map((notice) => (
                      <div key={notice.id} className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 space-y-1">
                        <h5 className="font-semibold text-xs text-zinc-900">{notice.title}</h5>
                        <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono">
                          <span>Deadline: {notice.deadline}</span>
                          <span className="text-[#570000] font-bold">Action Required</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Help Panel */}
                <div className="bg-[#735c00]/5 p-6 rounded-2xl border border-[#735c00]/20 space-y-3">
                  <h4 className="font-display font-bold text-sm uppercase tracking-wide text-[#735c00]">Instructor Manual</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Faculty members can submit semester reviews directly. Attendance sheets should be dispatched every Friday by 2:00 PM to the head office desk.
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
}
