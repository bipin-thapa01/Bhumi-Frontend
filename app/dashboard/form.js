import { showSnackbar } from '@/utils/snackbar';
import { useState } from 'react';

export default function Form({ isFormOpen, setIsFormOpen }) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '',
    address: '', latitude: '', longitude: '',
    deadline: '', area: '', ownership: '', ownerNumber: '', price: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const setPrev = () => setPage(p => p - 1);
  const setNext = () => setPage(p => p + 1);

  const submitPost = async () => {
    setLoading(true);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 100000);

      const res = await fetch('http://localhost:8000/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        body: JSON.stringify(formData),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!res.ok) {
        const err = await res.json();
        showSnackbar({ type: 'error', title: 'Error', message: err.message || 'Submission failed' });
        return;
      }

      showSnackbar({ type: 'success', title: 'Success', message: 'Land listed successfully!' });
      setIsFormOpen(false);
    } catch (err) {
      if (err.name === 'AbortError') {
        showSnackbar({ type: 'error', title: 'Timeout', message: 'Request took too long. Try again.' });
      } else {
        showSnackbar({ type: 'error', title: 'Error', message: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      w-[80%] max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-xl
      transition-all duration-300
      ${isFormOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">List your land</h2>
        <button onClick={() => setIsFormOpen(false)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer">
          ✕
        </button>
      </div>

      <div>
        {page === 1 && (
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-2">
              <label className="text-sm text-gray-500">Title</label>
              <input name="title" value={formData.title} onChange={handleChange}
                placeholder="4 Aana land in Satungal"
                className="outline-0 p-2 border border-border rounded-lg" />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-sm text-gray-500">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange}
                placeholder="Description goes here..."
                className="outline-0 p-2 border border-border rounded-lg resize-none" />
            </div>
          </div>
        )}

        {page === 2 && (
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-2">
              <label className="text-sm text-gray-500">Address</label>
              <input name="address" value={formData.address} onChange={handleChange}
                placeholder="e.g. X basti, Budanilkantha-7, Kathmandu"
                className="outline-0 p-2 border border-border rounded-lg" />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-sm text-gray-500">Latitude</label>
              <input name="latitude" value={formData.latitude} onChange={handleChange}
                placeholder="e.g. 27.7839"
                className="outline-0 p-2 border border-border rounded-lg" />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-sm text-gray-500">Longitude</label>
              <input name="longitude" value={formData.longitude} onChange={handleChange}
                placeholder="e.g. 85.3612"
                className="outline-0 p-2 border border-border rounded-lg" />
            </div>
          </div>
        )}

        {page === 3 && (
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-2">
              <label className="text-sm text-gray-500">Deadline</label>
              <input name="deadline" type="date" value={formData.deadline} onChange={handleChange}
                className="outline-0 p-2 border border-border rounded-lg" />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-sm text-gray-500">Area</label>
              <input name="area" value={formData.area} onChange={handleChange}
                placeholder="4 aana"
                className="outline-0 p-2 border border-border rounded-lg" />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-sm text-gray-500">Ownership</label>
              <input name="ownership" value={formData.ownership} onChange={handleChange}
                placeholder="XYZ"
                className="outline-0 p-2 border border-border rounded-lg" />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-sm text-gray-500">Owner Number</label>
              <input name="ownerNumber" value={formData.ownerNumber} onChange={handleChange}
                placeholder="98/97XXXXXXXX"
                className="outline-0 p-2 border border-border rounded-lg" />
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-sm text-gray-500">Price</label>
              <input name="price" value={formData.price} onChange={handleChange}
                placeholder="400000"
                className="outline-0 p-2 border border-border rounded-lg" />
            </div>
          </div>
        )}
      </div>

      <div className="flex mt-4 gap-x-6 justify-center">
        {[1, 2, 3].map(n => (
          <div key={n} className={`text-sm w-5 h-5 rounded-full text-center
            ${page === n ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
            {n}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2 mt-6">
        {page === 1
          ? <button onClick={() => setIsFormOpen(false)}
            className="px-4 py-2 text-sm rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
            Cancel
          </button>
          : <button onClick={setPrev}
            className="px-4 py-2 text-sm rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
            Prev
          </button>
        }
        {page !== 3
          ? <button onClick={setNext}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer">
            Next
          </button>
          : <button
            onClick={submitPost}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Submitting...' : 'Confirm'}
          </button>
        }
      </div>
    </div>
  );
}