"use client"

import { useState, useEffect } from "react"
import { MapPin, Calendar, Eye, Filter, X } from "lucide-react"
import "./myJobs.css"

export default function MyJobsPage() {
  const [filter, setFilter] = useState("All")
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      setError(null)

      // 🔹 TODO: Replace with actual API endpoint
      // const response = await fetch('/api/jobs', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      // const data = await response.json();
      // setJobs(data.jobs);

      // 🔹 TEMP: Mock data for development
      await new Promise((resolve) => setTimeout(resolve, 500))

      setJobs([
        {
          id: 1,
          title: "City Plaza Construction - Phase 2",
          contractor: "BuildTech Solutions",
          location: "Downtown Area, Block 5",
          startDate: "2024-12-01",
          endDate: "2024-12-31",
          status: "In Progress",
        },
        {
          id: 2,
          title: "Residential Tower Project",
          contractor: "Skyline Constructors",
          location: "North District, Plot 12",
          startDate: "2024-11-15",
          endDate: "2025-01-15",
          status: "In Progress",
        },
        {
          id: 3,
          title: "Green Valley Apartments - Foundation",
          contractor: "Foundation Masters",
          location: "East Valley, Sector 8",
          startDate: "2024-11-01",
          endDate: "2024-11-30",
          status: "Completed",
        },
        {
          id: 4,
          title: "Shopping Mall Renovation",
          contractor: "Metro Builders",
          location: "Central Plaza, Unit 4",
          startDate: "2024-12-15",
          endDate: "2025-02-15",
          status: "Assigned",
        },
      ])
    } catch (err) {
      setError(err.message || "Failed to load jobs")
      console.error("Jobs fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  const filteredJobs = filter === "All" ? jobs : jobs.filter((job) => job.status === filter)

  const handleViewDetails = (jobId) => {
    const job = jobs.find((j) => j.id === jobId)
    setSelectedJob(job)
  }

  const handleCloseModal = () => {
    setSelectedJob(null)
  }

  if (loading) {
    return (
      <div className="jobs-wrapper loading-state">
        <div className="spinner"></div>
        <p>Loading jobs...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="jobs-wrapper error-state">
        <p className="error-message">{error}</p>
        <button onClick={fetchJobs} className="retry-btn">
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="jobs-wrapper">
      {/* Header */}
      <div className="jobs-header">
        <div>
          <h2>My Jobs</h2>
          <p>View and manage your assigned construction jobs</p>
        </div>

        {/* Filters */}
        <div className="filters">
          <Filter size={18} className="filter-icon" />
          {["All", "Assigned", "In Progress", "Completed"].map((item) => (
            <button
              key={item}
              className={`filter-btn ${filter === item ? "active" : ""}`}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Job Cards */}
      <div className="jobs-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-info">
                <div className="job-top">
                  <div>
                    <h4>{job.title}</h4>
                    <p className="contractor">{job.contractor}</p>
                  </div>
                  <span className={`status ${job.status.replace(" ", "").toLowerCase()}`}>{job.status}</span>
                </div>

                <div className="job-meta">
                  <div className="meta-item">
                    <MapPin size={16} /> {job.location}
                  </div>
                  <div className="meta-item">
                    <Calendar size={16} /> {job.startDate} – {job.endDate}
                  </div>
                </div>
              </div>

              <button className="view-btn" onClick={() => handleViewDetails(job.id)}>
                <Eye size={16} />
                View Details
              </button>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No jobs found for the selected filter</p>
          </div>
        )}
      </div>

      {selectedJob && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Job Details</h3>
              <button className="close-btn" onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-row">
                <strong>Job Title:</strong>
                <span>{selectedJob.title}</span>
              </div>
              <div className="detail-row">
                <strong>Contractor:</strong>
                <span>{selectedJob.contractor}</span>
              </div>
              <div className="detail-row">
                <strong>Location:</strong>
                <span>{selectedJob.location}</span>
              </div>
              <div className="detail-row">
                <strong>Start Date:</strong>
                <span>{selectedJob.startDate}</span>
              </div>
              <div className="detail-row">
                <strong>End Date:</strong>
                <span>{selectedJob.endDate}</span>
              </div>
              <div className="detail-row">
                <strong>Status:</strong>
                <span className={`status ${selectedJob.status.replace(" ", "").toLowerCase()}`}>
                  {selectedJob.status}
                </span>
              </div>
              <div className="detail-row full">
                <strong>Description:</strong>
                <p>
                  This is a detailed description of the job. Additional information such as scope of work, materials
                  required, team members, safety protocols, and progress updates will be displayed here when fetched
                  from the API.
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-btn secondary" onClick={handleCloseModal}>
                Close
              </button>
              <button className="modal-btn primary">Mark Complete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
