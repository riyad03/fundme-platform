import { useState, useEffect } from "react";

export default function CampaignForm() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    campaignName: "",
    description: "",
    status: "Active",
    startDate: "",
    endDate: "",
    projectId: null, // Keep as number/null in state
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/projects")
      .then((res) => res.json())
      .then(setProjects)
      .catch((err) => {
        console.error("Error fetching projects:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for projectId to convert to number
    if (name === "projectId") {
      setFormData((prev) => ({ 
        ...prev, 
        [name]: value === "" ? null : Number(value) 
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    try {
      // Convert projectId to string for HTTP request
      const requestData = {
        ...formData,
        projectId: formData.projectId ? String(formData.projectId) : ""
      };

      const response = await fetch("http://localhost:8080/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const newCampaign = await response.json();
        alert("Campaign created successfully!");
        console.log("Created:", newCampaign);
        
        // Reset form
        setFormData({
          campaignName: "",
          description: "",
          status: "Active",
          startDate: "",
          endDate: "",
          projectId: null,
        });
      } else {
        alert("Failed to create campaign");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-900 rounded-xl text-white shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-6">Create Campaign</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="campaignName"
          placeholder="Campaign Name"
          value={formData.campaignName}
          onChange={handleChange}
          className="w-full bg-slate-800 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full bg-slate-800 border border-gray-600 rounded px-4 py-2 text-white resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="bg-slate-800 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="bg-slate-800 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full bg-slate-800 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          name="projectId"
          value={formData.projectId || ""}
          onChange={handleChange}
          className="w-full bg-slate-800 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        >
          <option value="" disabled>Select a Project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Create Campaign
        </button>
      </form>
    </div>
  );
}