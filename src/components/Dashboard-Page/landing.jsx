"use client"

import { useEffect, useState } from "react"
import { Briefcase, CheckCircle2, Clock, UserCheck } from "lucide-react"
import "./landing.css"

const iconMap = {
  total: Briefcase,
  progress: Clock,
  completed: CheckCircle2,
  attendance: UserCheck,
}

export default function Landing() {
  const [stats, setStats] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // 🔹 TODO: Replace with actual API endpoint
      // const response = await fetch('/api/dashboard', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      // const data = await response.json();
      // setStats(data.stats);
      // setActivities(data.activities);

      // 🔹 TEMP: Mock data for development
      await new Promise((resolve) => setTimeout(resolve, 500))

      setStats([
        {
          id: 1,
          title: "Total Jobs Assigned",
          value: 12,
          icon: "total",
          color: "orange",
          bgColor: "orangeBg",
        },
        {
          id: 2,
          title: "Jobs In Progress",
          value: 5,
          icon: "progress",
          color: "blue",
          bgColor: "blueBg",
        },
        {
          id: 3,
          title: "Jobs Completed",
          value: 7,
          icon: "completed",
          color: "green",
          bgColor: "greenBg",
        },
        {
          id: 4,
          title: "Attendance This Month",
          value: "22/24",
          icon: "attendance",
          color: "red",
          bgColor: "redBg",
        },
      ])

      setActivities([
        {
          id: 1,
          title: "New Job Assigned",
          description: "City Plaza Construction - Phase 2",
          time: "2 hours ago",
          icon: "total",
          color: "orange",
          bgColor: "orangeBg",
        },
        {
          id: 2,
          title: "Job Status Updated",
          description: "Residential Tower Project marked as In Progress",
          time: "5 hours ago",
          icon: "progress",
          color: "blue",
          bgColor: "blueBg",
        },
        {
          id: 3,
          title: "Attendance Recorded",
          description: "Check-in at 8:00 AM - Check-out at 5:00 PM",
          time: "Today",
          icon: "attendance",
          color: "green",
          bgColor: "greenBg",
        },
      ])
    } catch (err) {
      setError(err.message || "Failed to load dashboard data")
      console.error("Dashboard fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard loading-state">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard error-state">
        <p className="error-message">{error}</p>
        <button onClick={fetchDashboardData} className="retry-btn">
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="dashboard">
      {/* Stats Grid */}
      <div className="statsGrid">
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon]
          return (
            <div key={stat.id} className="statCard">
              <div className="statContent">
                <div>
                  <p className="statTitle">{stat.title}</p>
                  <p className="statValue">{stat.value}</p>
                </div>
                <div className={`iconBox ${stat.bgColor} ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="activityCard">
        <h3 className="sectionTitle">Recent Activity</h3>
        <div className="activityList">
          {activities.length > 0 ? (
            activities.map((activity) => {
              const Icon = iconMap[activity.icon]
              return (
                <div key={activity.id} className="activityItem">
                  <div className={`iconBox small ${activity.bgColor} ${activity.color}`}>
                    <Icon size={20} />
                  </div>
                  <div className="activityInfo">
                    <p className="activityTitle">{activity.title}</p>
                    <p className="activityDesc">{activity.description}</p>
                  </div>
                  <span className="activityTime">{activity.time}</span>
                </div>
              )
            })
          ) : (
            <p className="emptyState">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  )
}
