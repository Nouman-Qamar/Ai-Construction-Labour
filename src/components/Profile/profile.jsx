"use client"

import { useState, useRef } from "react"
import { User, Upload, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import "./profile.css"

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "Ahmed Hassan",
    phone: "+92 300 1234567",
    cnic: "12345-6789012-3",
    skillType: "Mason",
    experience: "8 years",
  })

  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [cnicFile, setCnicFile] = useState(null)
  const [certFile, setCertFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const photoRef = useRef()
  const cnicRef = useRef()
  const certRef = useRef()

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // API ready structure
      const formData = new FormData()
      Object.entries(profileData).forEach(([key, value]) => formData.append(key, value))
      if (photo) formData.append("photo", photo)
      if (cnicFile) formData.append("cnicDocument", cnicFile)
      if (certFile) formData.append("certificate", certFile)

      // 🔹 TODO: Replace with actual API endpoint
      // const response = await fetch('/api/profile/update', {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: formData
      // });
      // const data = await response.json();

      // 🔹 TEMP: Mock API call
      console.log("Submitting profile data:", Object.fromEntries(formData))
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setMessage({ type: "success", text: "Profile updated successfully!" })
    } catch (error) {
      console.error("Profile update error:", error)
      setMessage({ type: "error", text: error.message || "Failed to update profile" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="profile-wrapper" onSubmit={handleSubmit}>
      <div className="header">
        <h2>Profile</h2>
        
      </div>

      {message && (
        <div className={`message ${message.type}`}>
          {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="profile-grid">
        {/* PROFILE INFO */}
        <div className="card large">
          <div className="card-title">
            <User size={20} /> Profile Information
          </div>

          {/* Avatar */}
          <div className="avatar-row">
            <div className="avatar">
              {photoPreview ? (
                <img src={photoPreview || "/placeholder.svg"} alt="Profile" />
              ) : (
                <span className="avatar-initials">{profileData.name.charAt(0).toUpperCase()}</span>
              )}
            </div>

            <div>
              <button type="button" className="outline-btn" onClick={() => photoRef.current.click()}>
                <Upload size={16} /> Upload Photo
              </button>
              <input ref={photoRef} type="file" hidden accept="image/*" onChange={handlePhotoChange} />
              <p className="help-text">JPG, PNG or WEBP. Max 5MB.</p>
            </div>
          </div>

          {/* Inputs */}
          <div className="form-grid">
            <div className="input-group">
              <label>Full Name</label>
              <input
                name="name"
                value={profileData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="input-group">
              <label>Phone</label>
              <input
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                required
                placeholder="+92 300 1234567"
              />
            </div>

            <div className="input-group">
              <label>CNIC Number</label>
              <input
                name="cnic"
                value={profileData.cnic}
                onChange={handleChange}
                required
                placeholder="12345-6789012-3"
              />
            </div>

            <div className="input-group">
              <label>Skill Type</label>
              <input
                name="skillType"
                value={profileData.skillType}
                onChange={handleChange}
                required
                placeholder="e.g., Mason, Electrician"
              />
            </div>

            <div className="input-group full">
              <label>Experience</label>
              <input
                name="experience"
                value={profileData.experience}
                onChange={handleChange}
                required
                placeholder="e.g., 5 years"
              />
            </div>
          </div>

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>

        {/* DOCUMENTS */}
        <div className="card">
          <div className="card-title">
            <FileText size={20} /> Documents
          </div>

          {/* CNIC Upload */}
          <div className="upload-section">
            <label className="upload-label">CNIC Document</label>
            <div className="upload-box" onClick={() => cnicRef.current.click()}>
              <Upload size={24} />
              <p>{cnicFile ? cnicFile.name : "Click to upload CNIC"}</p>
              <span className="upload-hint">PDF, JPG or PNG</span>
              <input
                ref={cnicRef}
                type="file"
                hidden
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setCnicFile(e.target.files[0])}
              />
            </div>

            {cnicFile && (
              <div className="status success">
                <CheckCircle2 size={16} /> Uploaded
              </div>
            )}
          </div>

          {/* Certificate Upload */}
          <div className="upload-section">
            <label className="upload-label">Skill Certificates</label>
            <div className="upload-box" onClick={() => certRef.current.click()}>
              <Upload size={24} />
              <p>{certFile ? certFile.name : "Upload Skill Certificates"}</p>
              <span className="upload-hint">PDF, JPG or PNG</span>
              <input
                ref={certRef}
                type="file"
                hidden
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setCertFile(e.target.files[0])}
              />
            </div>

            {certFile ? (
              <div className="status success">
                <CheckCircle2 size={16} /> Uploaded
              </div>
            ) : (
              <div className="status pending">
                <Clock size={16} /> Pending Upload
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}
