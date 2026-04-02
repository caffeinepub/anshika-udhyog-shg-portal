import { useApp } from "../context/AppContext";

export function VacancyPage() {
  const { state, setCurrentPage } = useApp();
  const activeVacancies = state.vacancies.filter((v) => v.active);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div
        className="py-10 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",
        }}
      >
        <div className="text-4xl mb-3">💼</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Jobs & Vacancies
        </h1>
        <p className="text-gray-800 text-sm">
          अंशिका उद्योग में कैरियर देखें - Current Job Openings
        </p>
      </div>

      <div className="px-4 py-6 max-w-3xl mx-auto">
        {activeVacancies.length === 0 ? (
          <div className="text-center py-16" data-ocid="vacancy.empty_state">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              No Current Openings
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              अभी कोई vacancy नहीं है। नई vacancies के लिए बाद में आएं।
            </p>
            <button
              type="button"
              onClick={() => setCurrentPage("contact")}
              className="px-5 py-2 rounded-lg text-gray-900 font-semibold text-sm"
              style={{ background: "#FFC107" }}
              data-ocid="vacancy.secondary_button"
            >
              📞 Contact for Inquiries
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 font-medium">
              {activeVacancies.length} Opening
              {activeVacancies.length > 1 ? "s" : ""} Available
            </p>
            {activeVacancies.map((vacancy, idx) => (
              <div
                key={vacancy.id}
                className="bg-white rounded-xl shadow p-4 border-l-4 border-amber-400"
                data-ocid={`vacancy.item.${idx + 1}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-base mb-1">
                      {vacancy.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-2">
                      <span>📍 {vacancy.location}</span>
                      {vacancy.salary && <span>💰 {vacancy.salary}</span>}
                      {vacancy.lastDate && (
                        <span className="text-red-600 font-medium">
                          📅 Last Date: {vacancy.lastDate}
                        </span>
                      )}
                    </div>
                    {vacancy.description && (
                      <p className="text-sm text-gray-700 mb-2">
                        {vacancy.description}
                      </p>
                    )}
                    {vacancy.qualification && (
                      <div className="bg-amber-50 rounded px-3 py-1.5 text-xs text-gray-700">
                        <span className="font-medium">🎓 Qualification:</span>{" "}
                        {vacancy.qualification}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => setCurrentPage("contact")}
                    className="px-4 py-1.5 rounded-lg text-gray-900 font-semibold text-xs transition-opacity hover:opacity-80"
                    style={{ background: "#FFC107" }}
                    data-ocid={`vacancy.primary_button.${idx + 1}`}
                  >
                    Apply Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
