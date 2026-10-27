import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, History, Search, FileText, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactMessage, AdmissionApplication } from '../types';
import { submitFormToEmail } from '../config';

export default function ContactTab() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [savedMessages, setSavedMessages] = useState<ContactMessage[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSimulated, setIsSimulated] = useState(false);

  // Application Tracking state
  const [trackingId, setTrackingId] = useState('');
  const [trackedApplication, setTrackedApplication] = useState<AdmissionApplication | null>(null);
  const [trackingError, setTrackingError] = useState('');

  useEffect(() => {
    const messages = localStorage.getItem('rathanasara_contact_messages');
    if (messages) {
      setSavedMessages(JSON.parse(messages));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setSubmitError('');
    setIsSuccess(false);
    setIsSimulated(false);

    const formData = {
      name,
      email,
      subject: subject || 'General Inquiry',
      message
    };

    const res = await submitFormToEmail(formData, 'Inquiry');

    setIsSubmitting(false);

    if (res.success) {
      const newMessage: ContactMessage = {
        id: 'MSG-' + Math.floor(100000 + Math.random() * 900000),
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
        date: new Date().toLocaleDateString()
      };

      const updated = [newMessage, ...savedMessages];
      setSavedMessages(updated);
      localStorage.setItem('rathanasara_contact_messages', JSON.stringify(updated));

      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setIsSuccess(true);
      setIsSimulated(!!res.simulated);

      setTimeout(() => {
        setIsSuccess(false);
        setIsSimulated(false);
      }, 7000);
    } else {
      setSubmitError(res.error || 'Something went wrong. Please try again.');
    }
  };

  const handleTrackApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackingError('');
    setTrackedApplication(null);

    if (!trackingId.trim()) {
      setTrackingError('Please enter an application reference number.');
      return;
    }

    const storedApps = localStorage.getItem('rathanasara_admissions');
    if (storedApps) {
      const appsList: AdmissionApplication[] = JSON.parse(storedApps);
      const found = appsList.find(app => app.id.toLowerCase() === trackingId.trim().toLowerCase());
      if (found) {
        setTrackedApplication(found);
      } else {
        setTrackingError('Application Reference ID not found. Try APP-1918 (Demo) or submit a new application.');
      }
    } else {
      // Demo fallback if no admissions exist yet
      if (trackingId.trim().toUpperCase() === 'APP-1918') {
        setTrackedApplication({
          id: 'APP-1918',
          studentName: 'Kasun Wickramasinghe',
          dob: '2016-05-12',
          gender: 'Male',
          gradeApplied: 'Grade 1',
          parentName: 'Gamini Wickramasinghe',
          parentPhone: '+94 77 123 4567',
          parentEmail: 'gamini@example.com',
          address: 'Main Street, Baddegama',
          status: 'Approved',
          submissionDate: '2026-07-15'
        });
      } else {
        setTrackingError('No applications found. You can submit one in the Admissions tab, or try APP-1918.');
      }
    }
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto" id="contact-tab-section">
      <div className="text-center mb-16">
        <span className="text-[#735c00] font-semibold text-xs md:text-sm uppercase tracking-widest mb-2 inline-block font-sans">
          Get in Touch
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-[#570000] mb-4">
          Contact Us &amp; Portals
        </h2>
        <p className="text-sm md:text-base text-[#5a413d] max-w-2xl mx-auto font-sans leading-relaxed">
          Reach our academic office directly for admissions questions, general inquiries, or student portal assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Grid: Contact Information & Application Tracking */}
        <div className="lg:col-span-5 space-y-8" id="contact-details-panel">
          {/* Direct Channels Card */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#e2bfb9]/40 shadow-sm space-y-6">
            <h3 className="font-display text-xl font-bold text-zinc-900 border-b border-zinc-100 pb-3">
              Office Contacts
            </h3>

            <div className="space-y-4 text-sm text-[#5a413d] font-sans">
              <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-[#570000]/10 rounded-lg text-[#570000] shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900">School Campus Address</h4>
                  <p className="mt-1 font-medium">Walpola Sri Rathanasara school, Baddegama, Galle, Sri Lanka</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-[#570000]/10 rounded-lg text-[#570000] shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900">Telephone Lines</h4>
                  <p className="mt-1 font-medium hover:text-[#570000] transition-colors">
                    <a href="tel:+94912292345">+94 91 229 2345</a>
                  </p>
                  <p className="text-xs text-zinc-400">Office hours only</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-[#570000]/10 rounded-lg text-[#570000] shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900">Inquiry Email</h4>
                  <p className="mt-1 font-medium hover:text-[#570000] transition-colors">
                    <a href="mailto:info@rathanasara.sch.lk">info@rathanasara.sch.lk</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-2.5 bg-[#570000]/10 rounded-lg text-[#570000] shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900">Academic Office Hours</h4>
                  <p className="mt-1 font-medium">Monday – Friday: 7:30 AM – 2:30 PM</p>
                  <p className="text-xs text-zinc-400">Closed on weekends and national holidays</p>
                </div>
              </div>
            </div>
          </div>

          {/* Application Tracking Card */}
          <div className="bg-[#570000]/5 p-6 md:p-8 rounded-2xl border border-[#e2bfb9]/40 shadow-sm space-y-4">
            <h3 className="font-display text-lg font-bold text-[#570000] flex items-center gap-2">
              <Search className="h-5 w-5 text-[#735c00]" />
              Track Admission Status
            </h3>
            <p className="text-xs text-[#5a413d] font-sans">
              Enter your Admission Application Reference ID (e.g. <strong>APP-1918</strong>) below to check review progression.
            </p>

            <form onSubmit={handleTrackApplication} className="flex gap-2">
              <input 
                type="text" 
                placeholder="APP-XXXXXX"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="bg-white border border-[#e2bfb9]/60 rounded-md px-3 py-2 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-[#570000] uppercase placeholder-zinc-400 flex-1"
              />
              <button 
                type="submit"
                className="bg-[#570000] hover:bg-[#800000] text-white px-4 py-2 rounded-md font-bold text-xs transition-colors cursor-pointer shrink-0 font-sans"
              >
                Track
              </button>
            </form>

            {trackingError && (
              <p className="text-xs text-red-600 font-semibold mt-1 font-sans">{trackingError}</p>
            )}

            {trackedApplication && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-[#ffe088]/60 p-4 rounded-xl shadow-inner mt-4 text-xs space-y-2 font-sans"
              >
                <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                  <span className="font-bold text-[#570000]">{trackedApplication.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    trackedApplication.status === 'Approved' 
                      ? 'bg-green-100 text-green-800' 
                      : trackedApplication.status === 'Requires Review'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-zinc-100 text-zinc-600'
                  }`}>
                    {trackedApplication.status}
                  </span>
                </div>
                <div><strong>Student Name:</strong> {trackedApplication.studentName}</div>
                <div><strong>Grade Applied:</strong> {trackedApplication.gradeApplied}</div>
                <div><strong>Submitted On:</strong> {trackedApplication.submissionDate}</div>
                <div className="pt-1 text-[10px] text-zinc-400 italic">
                  {trackedApplication.status === 'Approved' 
                    ? 'Congratulations! Documentation guidelines have been sent to your parent email.' 
                    : 'The administration is currently processing documents.'}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Grid: Interactive Inquiry Form & History List */}
        <div className="lg:col-span-7 space-y-8" id="contact-form-panel">
          <div className="bg-white p-6 md:p-10 rounded-2xl border border-zinc-100 shadow-sm relative">
            <h3 className="font-display text-2xl font-bold text-zinc-950 mb-6">
              Send an Inquiry Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Your Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-[#e2bfb9]/70 rounded-md px-3 py-2.5 text-sm bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#570000] transition-colors placeholder-zinc-400"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Your Email *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-[#e2bfb9]/70 rounded-md px-3 py-2.5 text-sm bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#570000] transition-colors placeholder-zinc-400"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Subject</label>
                <input 
                  type="text" 
                  placeholder="Inquiry topic (e.g. Admission, Transcripts, Sports)"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="border border-[#e2bfb9]/70 rounded-md px-3 py-2.5 text-sm bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#570000] transition-colors placeholder-zinc-400"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Your Message *</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Write details of your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border border-[#e2bfb9]/70 rounded-md px-3 py-2.5 text-sm bg-zinc-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#570000] transition-colors placeholder-zinc-400 resize-none"
                />
              </div>

               <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#570000] hover:bg-[#800000] text-white py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {isSubmitting ? 'Sending Message...' : 'Submit Inquiry Message'}
              </button>
            </form>

            {submitError && (
              <div className="mt-4 bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3 text-red-800 text-xs font-semibold">
                <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
                <div>
                  <p className="font-bold">Submission Failed</p>
                  <p className="font-normal font-sans text-red-700 mt-0.5">{submitError}</p>
                </div>
              </div>
            )}

            {/* Success feedback */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute inset-x-6 top-6 bg-green-50 border border-green-200 p-4 rounded-xl flex items-center gap-3 text-green-800 text-sm font-semibold shadow-md z-10"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                  <div>
                    <p>{isSimulated ? 'Inquiry Submitted (Simulated)' : 'Inquiry Sent Successfully!'}</p>
                    <p className="text-xs font-normal text-green-700 font-sans mt-0.5">
                      {isSimulated 
                        ? 'To receive actual emails, configure Formspree or Web3Forms in /src/config.ts.' 
                        : 'The office staff will respond to you within 2 business days.'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* List of previously sent messages (Local Persistence) */}
          {savedMessages.length > 0 && (
            <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 shadow-inner space-y-4">
              <h4 className="font-display font-bold text-zinc-800 text-base flex items-center gap-2">
                <History className="h-4.5 w-4.5 text-[#735c00]" />
                Your Inquiry History ({savedMessages.length})
              </h4>
              <div className="max-h-[220px] overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                {savedMessages.map((msg) => (
                  <div key={msg.id} className="bg-white p-4 rounded-lg border border-zinc-100 text-xs font-sans space-y-1">
                    <div className="flex justify-between items-center text-zinc-400 font-bold">
                      <span>{msg.id}</span>
                      <span>{msg.date}</span>
                    </div>
                    <div className="font-bold text-[#570000] text-sm">{msg.subject}</div>
                    <p className="text-zinc-600 text-xs italic">" {msg.message} "</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
