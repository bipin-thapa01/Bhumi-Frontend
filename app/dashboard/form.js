export default function Form({isFormOpen, setIsFormOpen}) {
  return <div
    className={`fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-xl
    transition-all duration-300
    ${isFormOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
  >
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Title</h2>
      <button
        onClick={() => setIsFormOpen(false)}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
      >
        ✕
      </button>
    </div>

    <p className="text-sm text-gray-500 dark:text-gray-400">
      Your popup content goes here.
    </p>

    <div className="flex justify-end gap-2 mt-6">
      <button
        onClick={() => setIsFormOpen(false)}
        className="px-4 py-2 text-sm rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={() => setIsFormOpen(false)}
        className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        Confirm
      </button>
    </div>
  </div>;
}