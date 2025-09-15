const mongoose = require('mongoose');
const App = require('./backend/models/App');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');

    // Delete existing apps first
    await App.deleteMany({});

    const apps = [
      { name: "Slack", description: "Team communication tool", category: "Communication", status: "Active" },
      { name: "Zoom", description: "Video conferencing app", category: "Communication", status: "Active" },
      { name: "Jira", description: "Project management and issue tracking", category: "Productivity", status: "Active" },
      { name: "Confluence", description: "Team wiki and documentation tool", category: "Productivity", status: "Active" },
      { name: "GitHub", description: "Source code management and collaboration", category: "Development", status: "Active" },
      { name: "Google Workspace", description: "Email, Docs, Drive and Collaboration tools", category: "Productivity", status: "Active" },
      { name: "Microsoft Teams", description: "Team collaboration and chat tool", category: "Communication", status: "Active" },
      { name: "Salesforce", description: "Customer relationship management (CRM)", category: "Sales", status: "Active" },
      { name: "Asana", description: "Project and task management tool", category: "Productivity", status: "Active" },
      { name: "ZoomInfo", description: "Business intelligence and data platform", category: "Sales", status: "Active" }
    ];

    await App.insertMany(apps);
    console.log("Sample apps added!");
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
