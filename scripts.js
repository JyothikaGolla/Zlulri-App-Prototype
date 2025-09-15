const appGrid = document.getElementById('app-grid');
const categoryFilter = document.getElementById('categoryFilter');
const myAppsBtn = document.getElementById('myAppsBtn');

let allApps = [];
let myAppsView = false;
let requestedAppIds = [];

// Fetch all apps
async function fetchApps() {
  const res = await fetch('https://zlulri-app-prototype.onrender.com/api/apps');
  allApps = await res.json();
  renderApps(allApps);
}

// Fetch user requests
async function fetchMyRequests() {
  const res = await fetch('https://zlulri-app-prototype.onrender.com/api/requests?userId=1');
  const requests = await res.json();
  requestedAppIds = requests.map(r => r.appId);
}

// Render apps with optional requestedAppIds for Pending status
function renderApps(apps) {
  appGrid.innerHTML = '';
  apps.forEach(a => {
    const isRequested = requestedAppIds.includes(a._id);
    const node = document.createElement('div');
    node.className = 'app-card';
    node.innerHTML = `
      <h3>${a.name}</h3>
      <p>${a.description}</p>
      <p>Category: ${a.category}</p>
      <a class="details" href="app.html?id=${a._id}">Details</a>
      <button class="request-btn ${isRequested ? 'pending' : ''}">${isRequested ? 'Pending Request' : 'Request Access'}</button>
    `;
    appGrid.appendChild(node);

    // Only attach click if not pending
    if (!isRequested) {
      node.querySelector('.request-btn').addEventListener('click', async () => {
        const res = await fetch('https://zlulri-app-prototype.onrender.com/api/requests', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: '1', appId: a._id, status: 'Pending' })
        });
        const data = await res.json();
        alert(data.message);
        await fetchMyRequests();
        renderApps(filteredApps());
      });
    }
  });
}

// Filter apps based on category and My Apps view
function filteredApps() {
  let apps = allApps;
  const selected = categoryFilter.value;
  if (selected) apps = apps.filter(a => a.category === selected);
  if (myAppsView) apps = apps.filter(a => requestedAppIds.includes(a._id));
  return apps;
}

// Event: Category change
categoryFilter.addEventListener('change', () => {
  renderApps(filteredApps());
});

// Event: My Apps button
myAppsBtn.addEventListener('click', async () => {
  myAppsView = !myAppsView;
  myAppsBtn.textContent = myAppsView ? 'All Apps' : 'My Apps';
  await fetchMyRequests();
  renderApps(filteredApps());
});

fetchApps();
