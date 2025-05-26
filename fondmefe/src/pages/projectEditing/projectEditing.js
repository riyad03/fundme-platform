import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";

export default function UserProjectManagement({
  onProjectUpdate = (project) => console.log("Project updated:", project),
  onProjectDelete = (projectId) => console.log("Project deleted:", projectId),
  onProjectCreate = (project) => console.log("Project created:", project),
}) {
  const location = useLocation();
  const userloc=location.state?.user;
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  

  
  const [user] = useState(userloc)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [editingProject, setEditingProject] = useState(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Planning",
    dueDate: "",
    thumbnail: "",
  })

  

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true)
      try {
        const res = await fetch("http://localhost:8080/api/projects")
        if (!res.ok) throw new Error("Failed to fetch projects")
        const data = await res.json()
        setProjects(data)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  if (!isLoggedIn) {
    return <h1>Not allowed</h1>
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditProject = (project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      status: project.status,
      dueDate: project.dueDate,
      thumbnail: project.thumbnail,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateProject = async () => {
    const updatedProject = { ...editingProject, ...formData }
    try {
      const res = await fetch(`http://localhost:8080/api/projects/${updatedProject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProject),
      })
      if (!res.ok) throw new Error("Failed to update project")
      const data = await res.json()

      setProjects((prev) =>
        prev.map((p) => (p.id === data.id ? data : p))
      )
      onProjectUpdate(data)
      setIsEditDialogOpen(false)
    } catch (err) {
      alert(err.message)
    }
  }

  const handleCreateProject = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error("Failed to create project")
      const data = await res.json()

      setProjects((prev) => [...prev, data])
      onProjectCreate(data)
      setFormData({
        title: "",
        description: "",
        status: "Planning",
        dueDate: "",
        thumbnail: "",
      })
      setIsCreateDialogOpen(false)
    } catch (err) {
      alert(err.message)
    }
  }

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return
    try {
      const res = await fetch(`http://localhost:8080/api/projects/delete/${projectId}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete project")

      setProjects((prev) => prev.filter((p) => p.id !== projectId))
      onProjectDelete(projectId)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">Project Dashboard</h1>
        {/* Optional: add a toggle or remove this space */}
      </div>

      {loading && <p>Loading projects...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <div className="space-y-4">
          {/* Here you can render tabs or just render your projects list directly */}
          <div>
            {/* Render project cards or a list here */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="border rounded-xl p-4 shadow bg-white dark:bg-gray-800">
                  <h2 className="text-xl font-semibold dark:text-white">{project.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{project.description}</p>
                  <p className="text-sm mt-2">
                    <strong>Status:</strong> {project.status}
                  </p>
                  <p className="text-sm">
                    <strong>Due:</strong> {project.dueDate}
                  </p>
                  {project.thumbnail && (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-40 object-cover rounded mt-2"
                    />
                  )}
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      onClick={() => handleEditProject(project)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
