"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Briefcase, ArrowRight, MapPin, Mail, Award, Clock, X, Upload, CheckCircle2 } from "lucide-react";

export default function CareersPage() {
  const jobs = [
    {
      id: "senior-frontend",
      title: "Senior Frontend Engineer (Next.js / Tailwind)",
      department: "Engineering",
      location: "Tidel Park, Villupuram / Hybrid",
      type: "Full Time",
      description: "Own the merchant dashboard console and API developer experience. Build high-fidelity interactive visual charts and client interfaces using React and Tailwind CSS v4."
    },
    {
      id: "ops-executive",
      title: "Operations Executive (KYC Onboarding)",
      department: "Operations & Risk",
      location: "Kamaraj Salai, Pondicherry",
      type: "Full Time",
      description: "Manage merchant registration approvals, audit automated KYC document scans, and coordinate with bank nodal desks to ensure payment flow safety."
    },
    {
      id: "relations-associate",
      title: "Merchant Relations Associate",
      department: "Business & Support",
      location: "Tidel Park, Villupuram",
      type: "Full Time",
      description: "Assist newly onboarded SME merchants with API integration stubs, solve transaction status questions, and handle billing queries."
    }
  ];

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolio: "",
    role: "",
    story: "",
    resumeName: "",
    resumeSize: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const wordCount = (text: string) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  const handleOpenModal = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setFormData((prev) => ({ ...prev, role: jobTitle }));
    setFormErrors({});
    setIsSuccess(false);
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name: fieldName, value } = e.target;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    if (formErrors[fieldName]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[fieldName];
        return copy;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors((prev) => ({ ...prev, resume: "File size exceeds 5MB limit." }));
        return;
      }
      setFormData((prev) => ({
        ...prev,
        resumeName: file.name,
        resumeSize: `${Math.round(file.size / 1024)} KB`
      }));
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy["resume"];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Full Name is required.";
    if (!formData.email.trim()) errors.email = "Email Address is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email address is invalid.";
    if (!formData.role) errors.role = "Please select a role.";
    if (!formData.story.trim()) errors.story = "Your story is required.";
    else if (wordCount(formData.story) > 100) errors.story = "Story must be 100 words or less.";
    if (!formData.resumeName) errors.resume = "Please upload your resume.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API submit
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        portfolio: "",
        role: "",
        story: "",
        resumeName: "",
        resumeSize: ""
      });
    }, 1500);
  };

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Hero — fullscreen career.mp4 video background (matching live site) */}
      <section className="relative min-h-[60vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/career.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/70 z-10" />
        <div className="relative z-20 px-6 flex flex-col items-center gap-5 py-24">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Careers at LemonPay</span>
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl">
            Join the FinTech{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Revolution
            </span>
          </h1>
          <p className="max-w-xl text-base text-muted-custom sm:text-lg">
            Help us build secure, reliable, and accessible payment systems for growing merchants across India.
          </p>

        </div>
      </section>

      {/* Core Values / Work Culture */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-surface/50 border border-border-custom rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold text-foreground">Why build at LemonPay?</h3>
            <p className="text-xs text-muted-custom mt-1">We value high ownership, simple code solutions, and compliance safety.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-primary font-bold text-sm">01. Autonomy & Ownership</span>
              <p className="text-xs text-muted-custom leading-normal">
                We trust builders to architect systems. We prioritize outcomes over hours logged, giving you full control over your execution.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-secondary font-bold text-sm">02. Modern Tool Stack</span>
              <p className="text-xs text-muted-custom leading-normal">
                Deploy Next.js 15 apps, TypeScript, Tailwind CSS v4, and isolated backend microservices. We build lightweight and secure stacks.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-primary font-bold text-sm">03. Real Regional Impact</span>
              <p className="text-xs text-muted-custom leading-normal">
                Help hundreds of SME merchants in Tier 2 / 3 towns access digital payments, empowering their growth and financial tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions list */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 border-t border-border-custom mt-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-foreground">Current Openings</h2>
          <p className="text-xs text-muted-custom mt-1">Find the position that matches your skills.</p>
        </div>

        <div className="flex flex-col gap-6">
          {jobs.map((job) => (
            <div 
              key={job.id}
              className="rounded-xl border border-border-custom bg-surface p-6 flex flex-col md:flex-row justify-between gap-6 hover:border-primary/20 transition-all"
            >
              <div className="flex flex-col gap-3 max-w-2xl">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{job.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-muted-custom mt-1">
                    <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {job.department}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {job.type}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-custom leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="flex items-end justify-start md:justify-end shrink-0">
                <button
                  onClick={() => handleOpenModal(job.title)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-surface border border-border-custom px-5 py-2.5 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  Apply Now <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* General application CTA */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 border-t border-border-custom/50 mb-12 text-center flex flex-col items-center gap-4">
        <Mail className="h-8 w-8 text-primary" />
        <h4 className="font-bold text-foreground text-sm">Don't see a matching position?</h4>
        <p className="text-xs text-muted-custom max-w-lg leading-relaxed">
          We are always looking for passionate builders, compliance specialists, and retail coordinators. Send your CV along with a short pitch directly to:
        </p>
        <a 
          href="mailto:career@lemonpay.tech"
          className="text-base font-bold text-primary hover:underline"
        >
          career@lemonpay.tech
        </a>
      </section>

      {/* Application Form Modal (Visual Completion matching Formik chunk) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-2xl border border-border-custom bg-surface p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-lg border border-border-custom bg-surface-hover hover:border-primary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {isSuccess ? (
              <div className="text-center py-8 flex flex-col items-center gap-4">
                <CheckCircle2 className="h-16 w-16 text-primary animate-bounce" />
                <h3 className="text-xl font-bold text-foreground">Application Launched!</h3>
                <p className="text-sm text-muted-custom max-w-md leading-relaxed">
                  Thank you for applying. Your profile is locked in. Our onboarding panel will review your story and resume, and we'll reach out within 3-5 business days.
                </p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 rounded-xl bg-primary px-6 py-2.5 text-xs font-semibold text-background hover:bg-primary-hover transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <h3 className="text-xl font-extrabold text-foreground">Launch Your Career</h3>
                  <p className="text-xs text-muted-custom mt-1">Submit your profile directly to our engineering and operations team.</p>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-primary">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Sathish Kumar"
                      className="rounded-xl border border-border-custom bg-[#0d0e10] p-3 text-sm text-foreground placeholder-dim-custom focus:border-primary focus:outline-none transition-colors"
                    />
                    {formErrors.name && <span className="text-[10px] text-red-500 font-medium">{formErrors.name}</span>}
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-primary">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="sathish@example.com"
                      className="rounded-xl border border-border-custom bg-[#0d0e10] p-3 text-sm text-foreground placeholder-dim-custom focus:border-primary focus:outline-none transition-colors"
                    />
                    {formErrors.email && <span className="text-[10px] text-red-500 font-medium">{formErrors.email}</span>}
                  </div>

                  {/* Portfolio Link */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-primary">Portfolio or GitHub Link</label>
                    <input
                      type="text"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      placeholder="https://github.com/sathish"
                      className="rounded-xl border border-border-custom bg-[#0d0e10] p-3 text-sm text-foreground placeholder-dim-custom focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Select Role */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-primary">Target Position</label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="rounded-xl border border-border-custom bg-[#0d0e10] p-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Choose your role...</option>
                      {jobs.map((job) => (
                        <option key={job.id} value={job.title}>{job.title}</option>
                      ))}
                    </select>
                    {formErrors.role && <span className="text-[10px] text-red-500 font-medium">{formErrors.role}</span>}
                  </div>

                  {/* Story Textarea */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold uppercase tracking-wider text-primary">Your Story (Max 100 words)</label>
                      <span className={`text-[10px] font-semibold ${wordCount(formData.story) > 100 ? "text-red-500" : "text-muted-custom"}`}>
                        {wordCount(formData.story)}/100 words
                      </span>
                    </div>
                    <textarea
                      name="story"
                      rows={4}
                      value={formData.story}
                      onChange={handleInputChange}
                      placeholder="Tell us about your tech journey and why you want to build payments with us..."
                      className="rounded-xl border border-border-custom bg-[#0d0e10] p-3 text-sm text-foreground placeholder-dim-custom resize-none focus:border-primary focus:outline-none transition-colors"
                    />
                    {formErrors.story && <span className="text-[10px] text-red-500 font-medium">{formErrors.story}</span>}
                  </div>

                  {/* File Upload Mock */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-primary">Upload Resume (PDF, DOC, DOCX - Max 5MB)</label>
                    <div className="relative flex items-center justify-center rounded-xl border border-dashed border-border-custom bg-[#0d0e10] p-4 text-center cursor-pointer hover:border-primary transition-colors">
                      <input
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center gap-1.5">
                        <Upload className="h-5 w-5 text-muted-custom" />
                        <span className="text-xs text-muted-custom">
                          {formData.resumeName ? `${formData.resumeName} (${formData.resumeSize})` : "Click or drag resume here to upload"}
                        </span>
                      </div>
                    </div>
                    {formErrors.resume && <span className="text-[10px] text-red-500 font-medium">{formErrors.resume}</span>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-primary py-4 font-bold text-background hover:bg-primary-hover disabled:opacity-50 transition-colors shadow-lg shadow-primary/10 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-background border-t-transparent rounded-full"></div>
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      Launch Your Career 🚀
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
