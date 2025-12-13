import {  useState } from "react";
import {
  FolderKanban,
  Clock,
  CheckCircle2,
  FileCheck,
  Bell,
  DollarSign,
} from "lucide-react";
import { Modal } from "antd";
import "./landing.css";

export default function DashboardOverview() {
  
  const [stats] = useState([
    {
      label: "Total Projects Posted",
      value: "12",
      icon: FolderKanban,
      trend: "+2 this month",
      color: "stat-orange",
    },
    {
      label: "Projects in Progress",
      value: "5",
      icon: Clock,
      trend: "On schedule",
      color: "stat-blue",
    },
    {
      label: "Completed Projects",
      value: "7",
      icon: CheckCircle2,
      trend: "58% success rate",
      color: "stat-green",
    },
    {
      label: "Pending Bids",
      value: "8",
      icon: FileCheck,
      trend: "Requires review",
      color: "stat-purple",
    },
  ]);


  const [recentActivity] = useState([
    {
      id: 1,
      type: "bid",
      title: "New bid received",
      description:
        "Sarah Williams submitted a bid of $26,000 for Bathroom Remodel",
      time: "30 minutes ago",
      iconColor: "green",
    },
    {
      id: 2,
      type: "update",
      title: "Progress update",
      description:
        "Mike Johnson updated Kitchen Renovation - Cabinet installation started",
      time: "2 hours ago",
      iconColor: "blue",
    },
    {
      id: 3,
      type: "bid",
      title: "New bid received",
      description:
        "David Brown submitted a bid of $23,800 for Bathroom Remodel",
      time: "5 hours ago",
      iconColor: "green",
    },
    {
      id: 4,
      type: "status",
      title: "Project status changed",
      description: "Deck Construction marked as In Progress",
      time: "1 day ago",
      iconColor: "orange",
    },
    {
      id: 5,
      type: "accepted",
      title: "Bid accepted",
      description: "You accepted Mike Johnson’s bid for Kitchen Renovation",
      time: "2 days ago",
      iconColor: "green",
    },
  ]);

 
  const [recentProjects] = useState([
    {
      id: 1,
      name: "Kitchen Renovation",
      contractor: "Mike Johnson",
      budget: "$25,000",
      due: "12/30/2025",
      progress: 65,
      status: "In Progress",
      statusColor: "progress-blue",
    },
    {
      id: 2,
      name: "Bathroom Remodel",
      contractor: "Sarah Williams",
      budget: "$15,000",
      due: "2/1/2026",
      progress: 0,
      status: "Bidding",
      statusColor: "progress-yellow",
    },
    {
      id: 3,
      name: "Deck Construction",
      contractor: "Tom Anderson",
      budget: "$12,000",
      due: "12/20/2025",
      progress: 40,
      status: "In Progress",
      statusColor: "progress-blue",
    },
    {
      id: 4,
      name: "Garage Door Installation",
      contractor: "Lisa Chen",
      budget: "$3,500",
      due: "11/15/2025",
      progress: 100,
      status: "Completed",
      statusColor: "progress-green",
    },
  ]);

  
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // -----------------------------------------
  // API PLACEHOLDERS (READY FOR BACKEND)
  // -----------------------------------------
  /*
  useEffect(() => {
    // fetchStats();
    // fetchProjects();
    // fetchRecentActivity();
  }, []);
  */

  return (
    <div className="dashboard-layout">

      
      <h2>Dashboard</h2>
      <p className="sub-heading">Welcome back! Here's what's happening with your projects.</p>

     
      <div className="stats-row">
        {stats.map((item, i) => (
          <div key={i} className="stat-box">
            <div className={`stat-icon ${item.color}`}>
              <item.icon size={22} color="#fff" />
            </div>

            <div className="stat-value">{item.value}</div>
            <div className="stat-label">{item.label}</div>
            <div className="stat-trend">{item.trend}</div>
          </div>
        ))}
      </div>

      <div className="content-grid">

       
        <div className="activity-box">
          <h3>Recent Activity</h3>

          {recentActivity.map((item) => (
            <div key={item.id} className="activity-item">
              <div className={`activity-icon ${item.iconColor}`}>
                <Bell size={16} color="#fff" />
              </div>

              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <span className="activity-time">{item.time}</span>
              </div>
            </div>
          ))}
        </div>

        
        <div className="projects-box">
          <div className="projects-header">
            <h3>Recent Projects</h3>
            <button className="view-all-btn">View All</button>
          </div>

          {recentProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-top">
                <div>
                  <h4>{project.name}</h4>
                  <p>👤 {project.contractor} • <DollarSign size={12} /> {project.budget}</p>
                </div>

                <span className={`project-status ${project.statusColor}`}>
                  {project.status}
                </span>
              </div>

              
              <div className="progress-section">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className="progress-percent">{project.progress}%</div>
              </div>

              
              <div className="project-footer">
                <span className="due-date">📅 Due {project.due}</span>
                <button className="details-btn" onClick={() => openModal(project)}>
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <Modal
        title="Project Details"
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        {selectedProject && (
          <div className="modal-content">
            <h3>{selectedProject.name}</h3>
            <p><strong>Contractor:</strong> {selectedProject.contractor}</p>
            <p><strong>Budget:</strong> {selectedProject.budget}</p>
            <p><strong>Status:</strong> {selectedProject.status}</p>
            <p><strong>Due Date:</strong> {selectedProject.due}</p>

            
            <p className="modal-note">
              🔌 <strong>API Placeholder:</strong> When backend is ready, load full project details here.
            </p>
          </div>
        )}
      </Modal>

    </div>
  );
}
