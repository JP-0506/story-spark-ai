import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Preferences {
  aiProvider: string;
  defaultGenre: string;
  targetLength: string;
  emailNotifications: boolean;
  autoSave: boolean;
}

const SettingComponent = () => {
  // Load preferences from localStorage with defaults
  const [preferences, setPreferences] = useState<Preferences>({
    aiProvider: localStorage.getItem("pref_aiProvider") || "gemini",
    defaultGenre: localStorage.getItem("pref_defaultGenre") || "🎭 Drama",
    targetLength: localStorage.getItem("pref_targetLength") || "Medium (~600)",
    emailNotifications: localStorage.getItem("pref_emailNotifications") !== "false",
    autoSave: localStorage.getItem("pref_autoSave") === "true",
  });

  const [saving, setSaving] = useState(false);

  const genres = [
    "🎭 Drama",
    "😂 Comedy",
    "😱 Horror",
    "💕 Romance",
    "🚀 Sci-Fi",
    "🧙 Fantasy",
    "🔍 Mystery",
    "🌟 Adventure",
  ];

  const lengths = ["Short (~300)", "Medium (~600)", "Long (~1000)"];

  const handleToggle = (key: keyof Pick<Preferences, "emailNotifications" | "autoSave">) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelect = (key: keyof Preferences, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    setSaving(true);
    
    // Save settings to localStorage
    Object.entries(preferences).forEach(([key, value]) => {
      localStorage.setItem(`pref_${key}`, String(value));
    });

    setTimeout(() => {
      setSaving(false);
      toast.success("Preferences updated successfully! ✨", {
        style: {
          background: "#1e293b",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      });
    }, 800);
  };

  const cardClass = "bg-slate-900/60 border border-slate-700/30 rounded-xl p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-indigo-500/30 flex flex-col justify-between";
  const labelClass = "block text-sm font-semibold text-gray-300 mb-2";
  const selectClass = "w-full px-4 py-2 bg-slate-800/80 border border-slate-700/50 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all";

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 min-h-screen text-gray-200">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center border-b border-slate-700/30 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
              <i className="fas fa-sliders text-indigo-400"></i> Settings & Preferences
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Customize your creative workspace and AI assistant behavior.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-105 ${
              saving ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {saving ? (
              <>
                <i className="fas fa-spinner animate-spin"></i> Saving...
              </>
            ) : (
              <>
                <i className="fas fa-check"></i> Save Changes
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Settings Card */}
          <div className={cardClass}>
            <div>
              <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2 border-b border-slate-800 pb-3">
                <i className="fas fa-brain text-purple-400"></i> AI Preferences
              </h2>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Default AI Writing Model</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleSelect("aiProvider", "gemini")}
                      className={`py-3 px-4 rounded-lg border text-sm font-semibold flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                        preferences.aiProvider === "gemini"
                          ? "bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-500/10"
                          : "bg-slate-800/40 border-slate-700/50 text-gray-400 hover:bg-slate-800/80 hover:text-gray-200"
                      }`}
                    >
                      <i className="fas fa-sparkles text-lg"></i>
                      <span>Google Gemini (Free)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelect("aiProvider", "openai")}
                      className={`py-3 px-4 rounded-lg border text-sm font-semibold flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                        preferences.aiProvider === "openai"
                          ? "bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-500/10"
                          : "bg-slate-800/40 border-slate-700/50 text-gray-400 hover:bg-slate-800/80 hover:text-gray-200"
                      }`}
                    >
                      <i className="fas fa-bolt text-lg"></i>
                      <span>OpenAI GPT-4 (Premium)</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Default Story Genre</label>
                  <select
                    value={preferences.defaultGenre}
                    onChange={(e) => handleSelect("defaultGenre", e.target.value)}
                    className={selectClass}
                  >
                    {genres.map((g) => (
                      <option key={g} value={g} className="bg-slate-900 text-gray-300">
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Default Story Length</label>
                  <div className="grid grid-cols-3 gap-2">
                    {lengths.map((length) => (
                      <button
                        key={length}
                        type="button"
                        onClick={() => handleSelect("targetLength", length)}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all duration-200 ${
                          preferences.targetLength === length
                            ? "bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-md shadow-indigo-500/10"
                            : "bg-slate-800/40 border-slate-700/50 text-gray-400 hover:bg-slate-800/80 hover:text-gray-200"
                        }`}
                      >
                        {length}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Workspace & Notification Settings Card */}
          <div className={cardClass}>
            <div>
              <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2 border-b border-slate-800 pb-3">
                <i className="fas fa-sliders text-blue-400"></i> App & Notification Preferences
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-slate-800/30 p-4 rounded-lg border border-slate-700/10">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-200">Auto-Save Drafts</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Automatically save story progress in background</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle("autoSave")}
                    className={`w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none flex items-center p-0.5 relative ${
                      preferences.autoSave ? "bg-indigo-500" : "bg-slate-700"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                        preferences.autoSave ? "translate-x-5" : "translate-x-0"
                      }`}
                    ></span>
                  </button>
                </div>

                <div className="flex items-center justify-between bg-slate-800/30 p-4 rounded-lg border border-slate-700/10">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-200">Email Notifications</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Receive account activity and creative trend alerts</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle("emailNotifications")}
                    className={`w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none flex items-center p-0.5 relative ${
                      preferences.emailNotifications ? "bg-indigo-500" : "bg-slate-700"
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                        preferences.emailNotifications ? "translate-x-5" : "translate-x-0"
                      }`}
                    ></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default SettingComponent;
