import { useState } from "react";
import UserProjectManagement from "./projectEditing";
import CampaignManager from "./campaignEditing";

export default function ProjectManagementTabs() {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === "projects" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "campaigns" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("campaigns")}
        >
          Campaigns
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "projects" && <UserProjectManagement />}
        {activeTab === "campaigns" && <CampaignManager />}
      </div>
    </div>
  );
}
