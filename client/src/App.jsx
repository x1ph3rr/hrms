import { useState, useEffect } from "react";
import { getEmployees, addEmployee, deleteEmployee, markAttendance } from "./api";
import { Trash2, CheckCircle, XCircle, Users, UserPlus, History, ChevronDown, ChevronUp } from "lucide-react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [view, setView] = useState("list"); 
  const [loading, setLoading] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  
  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  // load data
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend. Is Django running?");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee(formData);
      alert("Employee Added Successfully!");
      setFormData({ employee_id: "", full_name: "", email: "", department: "" });
      setView("list");
      fetchEmployees();
    } catch (err) {
      alert("Error adding employee. ID or Email might be a duplicate.");
    }
  };

  const handleAttendance = async (empId, status) => {
    const date = new Date().toISOString().split("T")[0];
    try {
     
      await markAttendance({ employee: empId, date, status });
      alert(`Marked ${status} for today!`);
      fetchEmployees();
    } catch (err) {
      alert("Attendance already marked for today.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (err) {
      alert("Failed to delete.");
    }
  };

  const toggleHistory = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* navbar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <Users className="w-8 h-8" /> HRMS Lite
          </h1>
          <button
            onClick={() => setView(view === "list" ? "add" : "list")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            {view === "list" ? <><UserPlus size={18} /> Add Employee</> : "View List"}
          </button>
        </div>
      </nav>

      {/* main */}
      <main className="max-w-5xl mx-auto p-6">
        {view === "add" ? (
          /* add employee form */
          <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-sm border mt-10">
            <h2 className="text-xl font-semibold mb-6">Register New Employee</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                <input required type="text" placeholder="e.g. EMP001" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.employee_id} onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input required type="text" placeholder="e.g. John Doe" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input required type="email" placeholder="john@example.com" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input required placeholder="e.g. Engineering" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
              </div>
              <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                Save Employee
              </button>
            </form>
          </div>
        ) : (
          /* employee list */
          <div className="bg-white shadow-sm rounded-xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                  <tr>
                    <th className="p-4 border-b font-semibold">ID</th>
                    <th className="p-4 border-b font-semibold">Employee</th>
                    <th className="p-4 border-b font-semibold">Department</th>
                    <th className="p-4 border-b font-semibold">Today's Action</th>
                    <th className="p-4 border-b font-semibold text-center">History</th>
                    <th className="p-4 border-b font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan="6" className="p-8 text-center text-gray-500">Loading employees...</td></tr>
                  ) : employees.length === 0 ? (
                    <tr><td colSpan="6" className="p-8 text-center text-gray-500">No employees found. Click "Add Employee" to start.</td></tr>
                  ) : employees.map((emp) => (
                    <>
                      <tr key={emp.id} className="hover:bg-blue-50 transition duration-150">
                        <td className="p-4 font-mono text-sm text-gray-500">{emp.employee_id}</td>
                        <td className="p-4">
                          <div className="font-medium text-gray-900">{emp.full_name}</div>
                          <div className="text-xs text-gray-500">{emp.email}</div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">{emp.department}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button onClick={() => handleAttendance(emp.id, 'Present')} 
                              className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-200 transition">
                              <CheckCircle size={14} /> Present
                            </button>
                            <button onClick={() => handleAttendance(emp.id, 'Absent')} 
                              className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-200 transition">
                              <XCircle size={14} /> Absent
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                           <button onClick={() => toggleHistory(emp.id)} className="text-gray-400 hover:text-blue-600 transition">
                             {expandedRow === emp.id ? <ChevronUp size={20} /> : <History size={20} />}
                           </button>
                        </td>
                        <td className="p-4 text-right">
                          <button onClick={() => handleDelete(emp.id)} className="text-gray-400 hover:text-red-600 transition p-2 rounded-full hover:bg-red-50">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                      {/* history row */}
                      {expandedRow === emp.id && (
                        <tr className="bg-gray-50">
                          <td colSpan="6" className="p-4">
                            <div className="max-w-2xl mx-auto">
                                <h4 className="text-sm font-bold text-gray-700 mb-2">Attendance History for {emp.full_name}</h4>
                                {emp.attendance_history && emp.attendance_history.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {emp.attendance_history.map(record => (
                                            <span key={record.id} className={`text-xs px-2 py-1 rounded border ${record.status === 'Present' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                                                {record.date}: {record.status}
                                            </span>
                                        ))}
                                    </div>
                                ) : <span className="text-xs text-gray-400 italic">No attendance records yet.</span>}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;