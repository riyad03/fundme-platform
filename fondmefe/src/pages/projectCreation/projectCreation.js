
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ImageIcon, Video, DollarSign, Info, Plus } from "lucide-react"
import { Link } from "react-router-dom"
import axios from 'axios';

// Status options for the project
const statusOptions = ["Draft", "Pending Review", "Active", "Completed", "Cancelled"]

export default function CreateProject() {
  const [tagOptions, setTagOptions] = useState([
    "Renewable Energy",
    "Solar",
    "Wind",
    "Hydro",
    "Biomass",
    "Geothermal",
    "Conservation",
    "Education",
    "Research",
    "Community",
  ])
  const [showNewTagInput, setShowNewTagInput] = useState(false)
  const [newTag, setNewTag] = useState("")

  const [formStep, setFormStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    slogan: "",
    description: "",
    videoFile: null,
    imageFile: null,
    imagethumbnail: null,
    donationsGoal: "",
    status: "Draft",
    tag: "",
    creatorId: 1, // This would typically come from the authenticated user
  })

  // File preview states
  const [mainImagePreview, setMainImagePreview] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) {
      // Store the file in state
      setFormData((prev) => ({ ...prev, [name]: files[0] }))

      // Create preview URL
      const previewUrl = URL.createObjectURL(files[0])

      if (name === "imagefileupload") {
        setMainImagePreview(previewUrl)
      } else if (name === "imagethumbnail") {
        setThumbnailPreview(previewUrl)
      } else if (name === "videofileupload") {
        setVideoPreview(previewUrl)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Project form submitted:", formData)

    // In a real application, you would use FormData to handle file uploads
    const projectFormData = new FormData()
    projectFormData.append("name", formData.name)
    projectFormData.append("title", formData.title)
    projectFormData.append("slogan", formData.slogan)
    projectFormData.append("description", formData.description)
    projectFormData.append("donationsGoal", formData.donationsGoal)
    projectFormData.append("status", formData.status)
    projectFormData.append("tag", formData.tag)
    projectFormData.append("creatorId", formData.creatorId)

    if (formData.videofileupload) {
      projectFormData.append("videoFile", formData.videofileupload) // <- IMPORTANT: Use "videoFile" here
    }
    
    if (formData.imagefileupload) {
      projectFormData.append("imageFile", formData.imagefileupload) 
    }

    /*if (formData.imagethumbnail) {
      projectFormData.append("thumbnailFile", formData.imagethumbnail)
    }*/

    /*for (const key in formData) {
      projectFormData.append(key, formData[key])
    }*/

    try {
      const response = await axios.post(
        'http://localhost:8080/api/projects/uploads/',
        projectFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // Then send projectFormData to your API
      alert("Project created successfully!");
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Error uploading project');
    }
  }

  const nextStep = () => {
    if (formStep < 2) setFormStep(formStep + 1)
  }

  const prevStep = () => {
    if (formStep > 0) setFormStep(formStep - 1)
  }

  const addNewTag = () => {
    if (newTag.trim()) {
      // Add the new tag to the options
      setTagOptions([...tagOptions, newTag.trim()])

      // Select the new tag
      setFormData((prev) => ({ ...prev, tag: newTag.trim() }))

      // Reset the input
      setNewTag("")
      setShowNewTagInput(false)
    }
  }

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      if (mainImagePreview) URL.revokeObjectURL(mainImagePreview)
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview)
      if (videoPreview) URL.revokeObjectURL(videoPreview)
    }
  }, [mainImagePreview, thumbnailPreview, videoPreview])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
 
      

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create New Project</h1>
            <p className="text-gray-400">Share your clean energy initiative with the world</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`rounded-full h-10 w-10 flex items-center justify-center ${
                    formStep >= 0 ? "bg-green-500 text-black" : "bg-gray-700 text-gray-300"
                  }`}
                >
                  1
                </div>
                <div className={`h-1 w-12 ${formStep >= 1 ? "bg-green-500" : "bg-gray-700"}`}></div>
                <div
                  className={`rounded-full h-10 w-10 flex items-center justify-center ${
                    formStep >= 1 ? "bg-green-500 text-black" : "bg-gray-700 text-gray-300"
                  }`}
                >
                  2
                </div>
                <div className={`h-1 w-12 ${formStep >= 2 ? "bg-green-500" : "bg-gray-700"}`}></div>
                <div
                  className={`rounded-full h-10 w-10 flex items-center justify-center ${
                    formStep >= 2 ? "bg-green-500 text-black" : "bg-gray-700 text-gray-300"
                  }`}
                >
                  3
                </div>
              </div>
              <div className="text-sm text-gray-400">Step {formStep + 1} of 3</div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 shadow-xl">
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {formStep === 0 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Project Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        placeholder="Enter project name"
                      />
                    </div>

                    <div>
                      <label htmlFor="title" className="block text-sm font-medium mb-1">
                        Project Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        placeholder="Enter a catchy title"
                      />
                    </div>

                    <div>
                      <label htmlFor="slogan" className="block text-sm font-medium mb-1">
                        Slogan
                      </label>
                      <input
                        type="text"
                        id="slogan"
                        name="slogan"
                        value={formData.slogan}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        placeholder="A short, memorable phrase"
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium mb-1">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        rows={6}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none"
                        placeholder="Describe your project in detail"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={nextStep}
                      className="w-full bg-green-500 hover:bg-green-600 text-black font-medium py-3 px-4 rounded-md transition-all flex items-center justify-center mt-6"
                    >
                      Continue <ChevronRight size={18} className="ml-1" />
                    </motion.button>
                  </motion.div>
                )}

                {formStep === 1 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h2 className="text-xl font-semibold mb-4">Media & Visuals</h2>

                    <div>
                      <label htmlFor="imagefileupload" className="block text-sm font-medium mb-1">
                        Main Project Image
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          {mainImagePreview ? (
                            <div>
                              <img
                                src={mainImagePreview || "/placeholder.svg"}
                                alt="Main project image preview"
                                className="mx-auto h-64 w-auto object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setMainImagePreview(null)
                                  setFormData((prev) => ({ ...prev, imagefileupload: null }))
                                }}
                                className="mt-2 text-sm text-red-500 hover:text-red-400"
                              >
                                Remove image
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="flex text-sm text-gray-400">
                                <label
                                  htmlFor="imagefileupload"
                                  className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-green-500 hover:text-green-400 focus-within:outline-none"
                                >
                                  <span className="flex items-center justify-center p-4">
                                    <ImageIcon className="mx-auto h-12 w-12 text-gray-500" />
                                    <span className="ml-2">Upload main image</span>
                                  </span>
                                  <input
                                    id="imagefileupload"
                                    name="imagefileupload"
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                  />
                                </label>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="imagethumbnail" className="block text-sm font-medium mb-1">
                        Thumbnail Image
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          {thumbnailPreview ? (
                            <div>
                              <img
                                src={thumbnailPreview || "/placeholder.svg"}
                                alt="Thumbnail preview"
                                className="mx-auto h-32 w-auto object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setThumbnailPreview(null)
                                  setFormData((prev) => ({ ...prev, imagethumbnail: null }))
                                }}
                                className="mt-2 text-sm text-red-500 hover:text-red-400"
                              >
                                Remove thumbnail
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="flex text-sm text-gray-400">
                                <label
                                  htmlFor="imagethumbnail"
                                  className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-green-500 hover:text-green-400 focus-within:outline-none"
                                >
                                  <span className="flex items-center justify-center p-4">
                                    <ImageIcon className="mx-auto h-12 w-12 text-gray-500" />
                                    <span className="ml-2">Upload thumbnail</span>
                                  </span>
                                  <input
                                    id="imagethumbnail"
                                    name="imagethumbnail"
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                  />
                                </label>
                              </div>
                              <p className="text-xs text-gray-500">Small image for previews</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="videofileupload" className="block text-sm font-medium mb-1">
                        Project Video
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          {videoPreview ? (
                            <div>
                              <video src={videoPreview} controls className="mx-auto h-64 w-auto rounded-md" />
                              <button
                                type="button"
                                onClick={() => {
                                  setVideoPreview(null)
                                  setFormData((prev) => ({ ...prev, videofileupload: null }))
                                }}
                                className="mt-2 text-sm text-red-500 hover:text-red-400"
                              >
                                Remove video
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="flex text-sm text-gray-400">
                                <label
                                  htmlFor="videofileupload"
                                  className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-green-500 hover:text-green-400 focus-within:outline-none"
                                >
                                  <span className="flex items-center justify-center p-4">
                                    <Video className="mx-auto h-12 w-12 text-gray-500" />
                                    <span className="ml-2">Upload video</span>
                                  </span>
                                  <input
                                    id="videofileupload"
                                    name="videofileupload"
                                    type="file"
                                    className="sr-only"
                                    accept="video/*"
                                    onChange={handleFileChange}
                                  />
                                </label>
                              </div>
                              <p className="text-xs text-gray-500">MP4, WebM, AVI up to 100MB</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={prevStep}
                        className="w-1/3 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-md transition-all"
                      >
                        Back
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={nextStep}
                        className="w-2/3 bg-green-500 hover:bg-green-600 text-black font-medium py-3 px-4 rounded-md transition-all"
                      >
                        Continue
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {formStep === 2 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h2 className="text-xl font-semibold mb-4">Project Details</h2>

                    <div>
                      <label htmlFor="donationsGoal" className="block text-sm font-medium mb-1">
                        Donations Goal <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="donationsGoal"
                          name="donationsGoal"
                          required
                          min="0"
                          step="0.01"
                          value={formData.donationsGoal}
                          onChange={handleChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                          placeholder="Enter funding goal amount"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="status" className="block text-sm font-medium mb-1">
                        Project Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="tag" className="block text-sm font-medium mb-1">
                        Project Category <span className="text-red-500">*</span>
                      </label>
                      <div className="flex space-x-2">
                        <div className="w-full">
                          <select
                            id="tag"
                            name="tag"
                            required
                            value={formData.tag}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                          >
                            <option value="" disabled>
                              Select a category
                            </option>
                            {tagOptions.map((tag) => (
                              <option key={tag} value={tag}>
                                {tag}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowNewTagInput(true)}
                          className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-md transition-all flex items-center justify-center"
                          title="Add new category"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    </div>

                    {showNewTagInput && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 p-4 bg-gray-800 rounded-md border border-gray-700"
                      >
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="Enter new category name"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                          />
                          <button
                            type="button"
                            onClick={addNewTag}
                            disabled={!newTag.trim()}
                            className={`px-3 py-2 rounded-md transition-all ${
                              newTag.trim()
                                ? "bg-green-500 hover:bg-green-600 text-black"
                                : "bg-gray-600 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowNewTagInput(false)
                              setNewTag("")
                            }}
                            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}

                    <div className="bg-gray-800 p-4 rounded-md mt-4">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <p className="text-sm text-gray-300">
                          By submitting this project, you agree to our terms and conditions. Your project will be
                          reviewed by our team before it goes live.
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={prevStep}
                        className="w-1/3 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-md transition-all"
                      >
                        Back
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-2/3 bg-green-500 hover:bg-green-600 text-black font-medium py-3 px-4 rounded-md transition-all"
                      >
                        Create Project
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-500 text-sm">
        <p>© 2025 Clean Energy for Tomorrow. All rights reserved.</p>
      </footer>
    </div>
  )
}
