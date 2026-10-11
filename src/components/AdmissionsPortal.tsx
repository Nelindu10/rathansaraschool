import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardList, User, ShieldCheck, Upload, CheckCircle2, RefreshCw, Sparkles, HelpCircle, AlertTriangle } from 'lucide-react';
import { AdmissionApplication } from '../types';
import { submitFormToEmail } from '../config';

interface AdmissionsPortalProps {
  setCurrentTab: (tab: string) => void;
}

export default function AdmissionsPortal({ setCurrentTab }: AdmissionsPortalProps) {
  const [step, setStep] = useState(1);
  
  // Form Fields
  const [studentName, setStudentName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [gradeApplied, setGradeApplied] = useState('Grade 1');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [address, setAddress] = useState('');
  const [previousSchool, setPreviousSchool] = useState('');
  
  // Upload drag state
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Success state
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSimulated, setIsSimulated] = useState(false);

  const gradesList = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitError('');
    setIsSimulated(false);

    // Generate a unique Reference ID
    const refId = 'APP-' + Math.floor(100000 + Math.random() * 900000);

    const formData = {
      reference_id: refId,
      studentName,
      dob,
      gender,
      gradeApplied,
      parentName,
      parentPhone,
      parentEmail,
      address,
      previousSchool: previousSchool || 'None',
      uploaded_document: uploadedFile ? `${uploadedFile.name} (${Math.round(uploadedFile.size / 1024)} KB)` : 'No attachment'
    };

    const res = await submitFormToEmail(formData, 'Admission');

    setIsSubmitting(false);

    if (res.success) {
      const newApplication: AdmissionApplication = {
        id: refId,
        studentName,
        dob,
        gender,
        gradeApplied,
        parentName,
        parentPhone,
        parentEmail,
        address,
        previousSchool: previousSchool || 'None',
        status: 'Requires Review',
        submissionDate: new Date().toLocaleDateString()
      };

      // Save to localStorage
      const existing = localStorage.getItem('rathanasara_admissions');
      const appsList = existing ? JSON.parse(existing) : [];
      appsList.push(newApplication);
      localStorage.setItem('rathanasara_admissions', JSON.stringify(appsList));

      setIsSimulated(!!res.simulated);
      setSubmissionId(refId);
      setStep(4); // Success screen
    } else {
      setSubmitError(res.error || 'Something went wrong. Please try again.');
    }
  };

  const handleReset = () => {
    setStudentName('');
    setDob('');
    setGender('Male');
    setGradeApplied('Grade 1');
    setParentName('');
    setParentPhone('');
    setParentEmail('');
    setAddress('');
    setPreviousSchool('');
    setUploadedFile(null);
    setSubmissionId(null);
    setStep(1);
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 max-w-4xl mx-auto" id="admissions-portal-section">
      {/* Decorative branding elements */}
      <div className="text-center mb-12">
        <span className="text-[#735c00] font-semibold text-xs md:text-sm uppercase tracking-widest mb-2 inline-block font-sans">
          Enrollment Portal
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-[#570000] mb-4">
          Online Admission Application
        </h2>
        <p className="text-sm md:text-base text-[#5a413d] max-w-2xl mx-auto font-sans leading-relaxed">
          Submit official enrollment requests directly to our administration office. Please complete all segments carefully.
        </p>
      </div>

      {/* Progress Stepper (Hidden on final success screen) */}
      {step < 4 && (
        <div className="flex justify-between items-center mb-10 max-w-md mx-auto" id="admissions-stepper">
          {[
            { num: 1, label: 'Student Bio', icon: User },
            { num: 2, label: 'Parent Details', icon: ClipboardList },
            { num: 3, label: 'History & Docs', icon: ShieldCheck }
          ].map((item) => (
            <div key={item.num} className="flex items-center gap-2 relative">
              <div 
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  step >= item.num 
                    ? 'bg-[#570000] text-white' 
                    : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
                }`}
              >
                <item.icon className="h-4.5 w-4.5" />
              </div>
              <span className={`text-xs font-semibold font-sans hidden sm:inline ${
                step >= item.num ? 'text-[#570000]' : 'text-zinc-400'
              }`}>
                {item.label}
              </span>
              {item.num < 3 && (
                <div className={`h-0.5 w-8 sm:w-12 bg-zinc-200 transition-colors duration-300 ${
                  step > item.num ? 'bg-[#570000]' : 'bg-zinc-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Form Area */}
      <div className="bg-white rounded-2xl border border-[#e2bfb9]/40 shadow-md p-6 md:p-10">
        <form onSubmit={handleSubmit} className="font-sans space-y-6">
          <AnimatePresence mode="wait">
            {/* STEP 1: STUDENT BIO-DATA */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
                id="step-1-form"
              >
                <h3 className="font-display text-xl font-bold text-[#570000] border-b border-zinc-100 pb-3 mb-4">
                  Step 1: Student Information
                </h3>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Student Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="As shown in birth certificate"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="border border-[#e2bfb9]/70 rounded-md px-3 py-2.5 text-sm bg-zinc-50/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#570000]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Date of Birth *</label>
                    <input 
                      type="date" 
                      required
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="border border-[#e2bfb9]/70 rounded-md px-3 py-2.5 text-sm bg-zinc-50/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#570000]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Gender *</label>
                    <select 
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="border border-[#e2bfb9]/70 rounded-md px-3 py-2.5 text-sm bg-zinc-50/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#570000]"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#570000] uppercase tracking-wider">Grade Applied For *</label>
                  <select 
                    value={gradeApplied}
                    onChange={(e) => setGradeApplied(e.target.value)}
                    className="border border-[#570000]/30 rounded-md px-3 py-2.5 text-sm bg-[#570000]/5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#570000] font-semibold text-[#570000]"
                  >
                    {gradesList.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-6 border-t border-zinc-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => studentName && dob && setStep(2)}
                    disabled={!studentName || !dob}
                    className="bg-[#570000] hover:bg-[#800000] disabled:opacity-50 text-white px-6 py-3 rounded-lg font-bold text-sm transition-colors cursor-pointer"
                  >
                    Continue to Parent Details
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: PARENT / GUARDIAN DETAILS */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
                id="step-2-form"
              >
                <h3 className="font-display text-xl font-bold text-[#570000] border-b border-zinc-100 pb-3 mb-4">
                  Step 2: Parent / Guardian Details
                </h3>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Parent/Guardian Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Full name of father, mother, or guardian"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="border border-[#e2bfb9]/70 rounded-md px-3 py-2.5 text-sm bg-zinc-50/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#570000]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Primary Telephone Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+94 XX XXX XXXX"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      className="border border-[#e2bfb9]/70 rounded-md px-3 py-2.5 text-sm bg-zinc-50/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#570000]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Contact Email *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="email@example.com"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      className="border border-[#e2bfb9]/70 rounded-md px-3 py-2.5 text-sm bg-zinc-50/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#570000]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Residential Address *</label>
                  <textarea 
                    rows={3}
                    required
                    placeholder="Complete home postal address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border border-[#e2bfb9]/70 rounded-md px-3 py-2.5 text-sm bg-zinc-50/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#570000] resize-none"
                  />
                </div>

                <div className="pt-6 border-t border-zinc-100 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="border border-zinc-300 text-[#5a413d] hover:bg-zinc-50 px-5 py-3 rounded-lg font-bold text-sm transition-colors cursor-pointer"
                  >
                    Back to Step 1
                  </button>
                  <button
                    type="button"
                    onClick={() => parentName && parentPhone && parentEmail && address && setStep(3)}
                    disabled={!parentName || !parentPhone || !parentEmail || !address}
                    className="bg-[#570000] hover:bg-[#800000] disabled:opacity-50 text-white px-6 py-3 rounded-lg font-bold text-sm transition-colors cursor-pointer"
                  >
                    Continue to Documents
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: SCHOOL HISTORY & UPLOAD */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
                id="step-3-form"
              >
                <h3 className="font-display text-xl font-bold text-[#570000] border-b border-zinc-100 pb-3 mb-4">
                  Step 3: School History &amp; Documentation
                </h3>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Previous School Attended (If applicable)</label>
                  <input 
                    type="text" 
                    placeholder="Leave empty if Grade 1 enrollment"
                    value={previousSchool}
                    onChange={(e) => setPreviousSchool(e.target.value)}
                    className="border border-[#e2bfb9]/70 rounded-md px-3 py-2.5 text-sm bg-zinc-50/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#570000]"
                  />
                </div>

                {/* Usability Pattern: Drag and Drop with Manual File Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Upload Birth Certificate / Report Card *</label>
                  
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                      isDragging 
                        ? 'border-[#570000] bg-[#570000]/5 scale-[0.99]' 
                        : uploadedFile 
                        ? 'border-green-400 bg-green-50/20' 
                        : 'border-[#e2bfb9] bg-zinc-50 hover:bg-zinc-100/55'
                    }`}
                  >
                    <Upload className={`h-8 w-8 mb-3 ${uploadedFile ? 'text-green-600' : 'text-[#735c00]'}`} />
                    
                    {uploadedFile ? (
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-zinc-800 font-sans">{uploadedFile.name}</p>
                        <p className="text-xs text-zinc-400 font-sans">({(uploadedFile.size / 1024).toFixed(1)} KB)</p>
                        <button 
                          type="button"
                          onClick={() => setUploadedFile(null)}
                          className="text-red-500 font-bold text-xs underline mt-2 hover:text-red-600"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-bold text-zinc-800">
                          Drag and drop file here, or{' '}
                          <label className="text-[#570000] underline cursor-pointer hover:text-[#800000]">
                            browse files
                            <input 
                              type="file" 
                              required
                              className="hidden" 
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={handleFileChange}
                            />
                          </label>
                        </p>
                        <p className="text-xs text-zinc-400 mt-1">Supports PDF, JPG, PNG (Max 5MB)</p>
                      </div>
                    )}
                  </div>
                </div>

                {submitError && (
                  <div className="mt-4 bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3 text-red-800 text-xs font-semibold">
                    <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
                    <div>
                      <p className="font-bold">Submission Failed</p>
                      <p className="font-normal font-sans text-red-700 mt-0.5">{submitError}</p>
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t border-zinc-100 flex justify-between">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setStep(2)}
                    className="border border-zinc-300 text-[#5a413d] hover:bg-zinc-50 px-5 py-3 rounded-lg font-bold text-sm transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Back to Step 2
                  </button>
                  <button
                    type="submit"
                    disabled={!uploadedFile || isSubmitting}
                    className="bg-[#570000] hover:bg-[#800000] disabled:opacity-50 text-white px-8 py-3 rounded-lg font-bold text-sm shadow-md transition-colors cursor-pointer flex items-center gap-2"
                  >
                    {isSubmitting && (
                      <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    )}
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: SUCCESS VIEW */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
                id="admissions-success-screen"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto border border-green-200">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-[#570000]">
                    {isSimulated ? 'Application Submitted (Simulated)' : 'Application Submitted!'}
                  </h3>
                  <p className="text-sm text-[#5a413d] font-sans">
                    {isSimulated 
                      ? 'This is a simulated submission since no email endpoint is configured in /src/config.ts.' 
                      : 'Thank you for applying to Walpola Sri Rathanasara school. Your application has been logged securely.'}
                  </p>
                  {isSimulated && (
                    <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg max-w-md mx-auto border border-amber-100 mt-2 font-sans">
                      <strong>Email setup:</strong> Follow the step-by-step instructions in the chat or config.ts file to hook this form up to your real email in under 2 minutes!
                    </p>
                  )}
                </div>

                <div className="bg-[#570000]/5 p-5 rounded-xl border border-[#ffe088]/40 max-w-sm mx-auto space-y-1">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold block">
                    Your Application Reference ID
                  </span>
                  <span className="text-xl md:text-2xl font-mono font-extrabold text-[#570000] tracking-wider">
                    {submissionId}
                  </span>
                  <p className="text-[10px] text-zinc-400 italic pt-1">
                    Please copy this ID. You can enter it in the **Contact** tab to track its live progress!
                  </p>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentTab('contact')}
                    className="bg-[#735c00] hover:bg-[#8f7405] text-white px-5 py-3 rounded-lg font-bold text-sm font-sans cursor-pointer transition-colors"
                  >
                    Track My Application Now
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="border border-zinc-200 text-[#5a413d] hover:bg-zinc-50 px-5 py-3 rounded-lg font-bold text-sm font-sans cursor-pointer transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Submit Another Application
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* FAQs / Help section */}
      {step < 4 && (
        <div className="mt-12 bg-zinc-50 p-6 rounded-xl border border-zinc-100 flex gap-4 items-start" id="admissions-help">
          <HelpCircle className="h-6 w-6 text-[#735c00] shrink-0 mt-0.5" />
          <div className="text-xs md:text-sm font-sans space-y-1 text-[#5a413d]">
            <h4 className="font-bold text-zinc-900">Need Help with Admissions?</h4>
            <p>Our office typically replies to submissions within 2-3 school days. Birth Certificate or previous grade sheets are required for any student entering beyond Grade 1.</p>
            <p>For urgent questions, please dial the registrar line: <strong>+94 91 229 2345</strong>.</p>
          </div>
        </div>
      )}
    </section>
  );
}
