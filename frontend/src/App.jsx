import { useEffect, useState } from 'react';

function App() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('http://127.0.0.1:8000/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, code, description: 'Sample course description' }),
      });
      setTitle('');
      setCode('');
      fetchCourses();
    } catch (err) {
      console.error('Error creating course:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <header className="max-w-4xl mx-auto mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-slate-800">E-gertonLMS</h1>
        <p className="text-slate-600">Institutional Learning Management System Prototype</p>
      </header>

      <main className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 h-fit">
          <h2 className="text-xl font-semibold text-slate-800">Add New Course</h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Course Code</label>
            <input
              type="text"
              placeholder="e.g. COMP 311"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border border-slate-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Course Title</label>
            <input
              type="text"
              placeholder="e.g. Object-Oriented Programming"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-slate-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Course'}
          </button>
        </form>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Course Catalog</h2>
          {courses.length === 0 ? (
            <p className="text-slate-500 italic">No courses created yet.</p>
          ) : (
            <ul className="divide-y divide-slate-200">
              {courses.map((course) => (
                <li key={course.id} className="py-3">
                  <span className="font-bold text-blue-600 mr-2">{course.code}:</span>
                  <span className="text-slate-800">{course.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
