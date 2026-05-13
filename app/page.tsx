'use client';

import { useState } from 'react';

export default function Home() {
  const sections = [
    {
      title: 'Brand Identity & Perception',
      questions: [
        'What do you believe your business is currently known for?',
        'What SHOULD your business be known for?',
        'What emotional response do you want customers to feel?',
        'What makes your business different beyond price?',
        'Does your branding accurately reflect your quality level?'
      ]
    },
    {
      title: 'Visibility & Audience Awareness',
      questions: [
        'Where are customers currently discovering your business?',
        'Which marketing efforts are currently working?',
        'Which efforts feel like wasted energy?',
        'How visible is your business compared to competitors?',
        'Does your audience engage with your content consistently?'
      ]
    },
    {
      title: 'Content & Communication',
      questions: [
        'Does your business create content consistently?',
        'Who currently handles communication and content?',
        'Does your messaging sound human or corporate?',
        'Does your audience clearly understand what you do?',
        'What content performs best and why?'
      ]
    },
    {
      title: 'Customer Experience & Environment',
      questions: [
        'What does it feel like to interact with your business?',
        'Does your environment match your online identity?',
        'Would a first-time customer immediately trust your company?',
        'Are you creating transactions or experiences?',
        'What impression do customers leave with?'
      ]
    },
    {
      title: 'Events, Trade Shows & Live Presence',
      questions: [
        'Why are you attending events or trade shows?',
        'What outcome are you actually measuring?',
        'Does your setup attract attention naturally?',
        'Are people interacting with your environment?',
        'Are you building leads or building presence?'
      ]
    },
    {
      title: 'Growth, Systems & Scalability',
      questions: [
        'What currently limits your growth the most?',
        'Are your systems sustainable internally?',
        'What would stronger visibility unlock for your business?',
        'Does your current presentation match your future goals?',
        'What would the ideal version of your business FEEL like?'
      ]
    }
  ];

  const summaryFields = [
    'Current Strengths',
    'Visibility Gaps',
    'Perception Issues',
    'Immediate Opportunities',
    'Long-Term Presence Strategy',
    'Recommended Next Steps'
  ];

  const [clientInfo, setClientInfo] = useState({
    clientName: '',
    businessName: '',
    clientEmail: '',
    assessmentDate: ''
  });

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [summary, setSummary] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');

  const updateAnswer = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
  };

  const updateSummary = (key: string, value: string) => {
    setSummary({ ...summary, [key]: value });
  };

  const handleSubmit = async () => {
    setStatus('Sending report...');

    const report = {
      clientInfo,
      answers,
      summary
    };

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report)
      });

      if (response.ok) {
        setStatus('Report submitted successfully.');
      } else {
        setStatus('Something went wrong. Check terminal for errors.');
      }
    } catch (error) {
      setStatus('Submission failed. Make sure your dev server is running.');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 border-b border-zinc-800 pb-6">
        <img
  src="/Logo.png"
  alt="Brand Command Logo"
  className="w-[320px] md:w-[420px]"
/>
          <p className="text-zinc-400 text-xl mt-2">Presence Foundation Assessment</p>
          <p className="text-zinc-500 mt-4 max-w-2xl">
            Strategic Visibility Assessment designed to identify audience perception,
            visibility gaps, communication weaknesses, and growth opportunities.
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Client Information</h2>

          <div className="grid gap-4">
            {[
              ['clientName', 'Client Name'],
              ['businessName', 'Business Name'],
              ['clientEmail', 'Client Email'],
              ['assessmentDate', 'Assessment Date']
            ].map(([key, label]) => (
              <div key={key}>
                <label className="block text-zinc-300 font-medium mb-2">{label}</label>
                <input
                  type="text"
                  value={clientInfo[key as keyof typeof clientInfo]}
                  onChange={(e) =>
                    setClientInfo({ ...clientInfo, [key]: e.target.value })
                  }
                  className="w-full rounded-2xl bg-zinc-900 border border-zinc-700 p-4 text-white"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                <span className="text-zinc-500 text-sm uppercase tracking-widest">
                  Section {index + 1}
                </span>
              </div>

              <div className="space-y-6">
                {section.questions.map((question, qIndex) => {
                  const key = `${section.title}-${qIndex}`;

                  return (
                    <div key={key} className="space-y-2">
                      <label className="block text-zinc-300 font-medium">
                        {question}
                      </label>
                      <textarea
                        value={answers[key] || ''}
                        onChange={(e) => updateAnswer(key, e.target.value)}
                        placeholder="Type notes, observations, and client responses here..."
                        className="w-full min-h-[120px] rounded-2xl bg-zinc-900 border border-zinc-700 p-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
          <h2 className="text-3xl font-semibold mb-6">Strategic Summary</h2>

          <div className="grid gap-6">
            {summaryFields.map((item) => (
              <div key={item}>
                <label className="block text-zinc-300 font-medium mb-2">
                  {item}
                </label>
                <textarea
                  value={summary[item] || ''}
                  onChange={(e) => updateSummary(item, e.target.value)}
                  placeholder={`Enter ${item.toLowerCase()}...`}
                  className="w-full min-h-[120px] rounded-2xl bg-zinc-900 border border-zinc-700 p-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            onClick={handleSubmit}
            className="bg-white text-black px-10 py-4 rounded-2xl font-bold text-lg hover:bg-zinc-300 transition"
          >
            Submit Report
          </button>

          {status && <p className="text-zinc-400">{status}</p>}
        </div>

        <div className="mt-10 text-center text-zinc-500 text-sm tracking-widest uppercase">
          Presence Over Pressure
        </div>
      </div>
    </main>
  );
}