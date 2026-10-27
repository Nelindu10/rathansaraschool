export interface AcademicStream {
  id: string;
  name: string;
  grades: string;
  description: string;
  badgeColor: string;
  subjects: string[];
  duration: string;
  examType: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Events' | 'Culture' | 'Arts' | 'Activity';
  date: string;
  description: string;
  imageUrl: string;
  readMoreUrl?: string;
  content?: string;
}

export interface AdmissionApplication {
  id: string;
  studentName: string;
  dob: string;
  gender: string;
  gradeApplied: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  previousSchool?: string;
  status: 'Pending' | 'Approved' | 'Requires Review';
  submissionDate: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  grade: string;
  indexNumber: string;
  attendance: string;
  gpa: string;
  grades: { subject: string; score: string; grade: string }[];
  schedule: { day: string; periods: string[] }[];
  announcements: { id: string; title: string; date: string; content: string }[];
}

export interface TeacherProfile {
  id: string;
  name: string;
  role: string;
  classes: string[];
  students: { id: string; name: string; grade: string; status: 'Present' | 'Absent' }[];
  assignedHomework: { id: string; title: string; deadline: string; subject: string }[];
}
