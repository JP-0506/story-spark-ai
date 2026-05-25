import { FC, FormEvent } from "react";

interface HelpSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resultCount?: number;
}

const HelpSearchBar: FC<HelpSearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search help articles, FAQs, and troubleshooting...",
  resultCount,
}) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-3xl mx-auto">
      <label htmlFor="help-search" className="sr-only">
        Search help center
      </label>
      <div className="relative before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-r before:from-purple-500/20 before:via-indigo-500/20 before:to-blue-500/20 before:blur-xl before:rounded-2xl">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <i className="fas fa-search text-gray-400" aria-hidden="true"></i>
        </div>
        <input
          id="help-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl py-4 pl-12 pr-12 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
        )}
      </div>
      {value && resultCount !== undefined && (
        <p className="mt-3 text-sm text-gray-500 text-center" aria-live="polite">
          {resultCount === 0
            ? "No results found — try different keywords"
            : `${resultCount} result${resultCount === 1 ? "" : "s"} found`}
        </p>
      )}
    </form>
  );
};

export default HelpSearchBar;
