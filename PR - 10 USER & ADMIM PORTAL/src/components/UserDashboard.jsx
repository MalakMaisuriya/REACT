import { useMemo, useState } from "react";
import DashboardShell from "./DashboardShell";
import { currentSession } from "../utils/auth";

const tabs = [
  { id: "projects", label: "Projects", title: "Project workspace", icon: "bi-folder2-open" },
  { id: "tasks", label: "Tasks", title: "Task center", icon: "bi-check2-square" },
  { id: "analytics", label: "Analytics", title: "Productivity analytics", icon: "bi-pie-chart" },
  { id: "support", label: "Support", title: "Support desk", icon: "bi-chat-dots" },
];

const initialTasks = [
  { id: 1, text: "Complete authentication flow integration", status: "in-progress", due: "Tomorrow" },
  { id: 2, text: "Design user profile state schema", status: "completed", due: "Completed" },
  { id: 3, text: "Configure deployment environment variables", status: "todo", due: "3 days left" },
];

function UserDashboard() {
  const session = currentSession();
  const [activeTab, setActiveTab] = useState("projects");
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [newStatus, setNewStatus] = useState("todo");
  const [supportMessage, setSupportMessage] = useState("");
  const [ticketSent, setTicketSent] = useState(false);

  const completedCount = useMemo(
    () => tasks.filter((task) => task.status === "completed").length,
    [tasks],
  );

  const addTask = (event) => {
    event.preventDefault();
    if (!newTask.trim()) return;

    setTasks((current) => [
      ...current,
      { id: Date.now(), text: newTask.trim(), status: newStatus, due: "Pending" },
    ]);
    setNewTask("");
  };

  const updateTaskStatus = (taskId, status) => {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, status } : task)),
    );
  };

  const submitTicket = (event) => {
    event.preventDefault();
    if (!supportMessage.trim()) return;

    setTicketSent(true);
    setSupportMessage("");
  };

  return (
    <DashboardShell
      activeTab={activeTab}
      role="user"
      setActiveTab={setActiveTab}
      tabs={tabs}
      user={session}
    >
      {activeTab === "projects" && (
        <>
          <section className="hero-panel">
            <div>
              <p className="eyebrow">Good to see you</p>
              <h2>{session.name}, your workspace is moving well.</h2>
              <p>Track project progress, update tasks, and keep support close by.</p>
            </div>
            <div className="health-ring">
              <strong>85%</strong>
              <span>complete</span>
            </div>
          </section>

          <section className="stats-grid">
            <article className="stat-card info">
              <div><span>Total projects</span><strong>12</strong><small>3 active workspaces</small></div>
              <i className="bi bi-kanban" aria-hidden="true" />
            </article>
            <article className="stat-card success">
              <div><span>Completed tasks</span><strong>{completedCount}</strong><small>{tasks.length} total tasks</small></div>
              <i className="bi bi-check-circle" aria-hidden="true" />
            </article>
            <article className="stat-card warning">
              <div><span>Open tasks</span><strong>{tasks.length - completedCount}</strong><small>Needs attention</small></div>
              <i className="bi bi-hourglass-split" aria-hidden="true" />
            </article>
          </section>

          <section className="cards-grid">
            {[
              ["Auth CRUD Integration", "Development", 70],
              ["Redux State Polish", "UI/UX Review", 100],
            ].map(([title, label, progress]) => (
              <article className="panel project-card" key={title}>
                <span className="status-pill">{label}</span>
                <h3>{title}</h3>
                <p>Focused improvements for auth state, validation, and interface quality.</p>
                <div className="meter-row">
                  <div><span>Milestone</span><strong>{progress}%</strong></div>
                  <meter max="100" value={progress} />
                </div>
              </article>
            ))}
          </section>
        </>
      )}

      {activeTab === "tasks" && (
        <>
          <form className="panel task-form" onSubmit={addTask}>
            <input
              onChange={(event) => setNewTask(event.target.value)}
              placeholder="Add a clear task description"
              value={newTask}
            />
            <select onChange={(event) => setNewStatus(event.target.value)} value={newStatus}>
              <option value="todo">To do</option>
              <option value="in-progress">In progress</option>
              <option value="completed">Completed</option>
            </select>
            <button className="btn primary" type="submit">
              <i className="bi bi-plus-lg" aria-hidden="true" />
              Add task
            </button>
          </form>

          <section className="kanban-grid">
            {[
              ["todo", "To do", "bi-circle"],
              ["in-progress", "In progress", "bi-arrow-repeat"],
              ["completed", "Completed", "bi-check-circle"],
            ].map(([status, label, icon]) => (
              <article className="panel kanban-column" key={status}>
                <div className="panel-heading">
                  <h3><i className={`bi ${icon}`} aria-hidden="true" /> {label}</h3>
                  <span className="status-pill">
                    {tasks.filter((task) => task.status === status).length}
                  </span>
                </div>
                {tasks.filter((task) => task.status === status).map((task) => (
                  <div className="task-card" key={task.id}>
                    <p>{task.text}</p>
                    <div>
                      <small>{task.due}</small>
                      {status !== "completed" ? (
                        <button
                          onClick={() =>
                            updateTaskStatus(task.id, status === "todo" ? "in-progress" : "completed")
                          }
                          type="button"
                        >
                          {status === "todo" ? "Start" : "Finish"}
                        </button>
                      ) : (
                        <button onClick={() => updateTaskStatus(task.id, "todo")} type="button">
                          Reopen
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </article>
            ))}
          </section>
        </>
      )}

      {activeTab === "analytics" && (
        <>
          <section className="stats-grid two">
            <article className="stat-card info">
              <div><span>Work score</span><strong>92/100</strong><small>Top 5% this month</small></div>
              <i className="bi bi-stars" aria-hidden="true" />
            </article>
            <article className="stat-card success">
              <div><span>Efficiency ratio</span><strong>99.1%</strong><small>Before due date</small></div>
              <i className="bi bi-speedometer2" aria-hidden="true" />
            </article>
          </section>
          <article className="panel">
            <div className="panel-heading"><h3>Monthly task delivery</h3></div>
            <div className="bar-chart">
              {[12, 18, 15, 24, 30, 22, 35].map((value, index) => (
                <div className="bar-column" key={value + index}>
                  <span>{value}</span>
                  <div style={{ height: `${value * 2.4}%` }} />
                  <small>{["W1", "W2", "W3", "W4", "W5", "W6", "Now"][index]}</small>
                </div>
              ))}
            </div>
          </article>
        </>
      )}

      {activeTab === "support" && (
        <section className="content-grid">
          <article className="panel wide">
            {ticketSent ? (
              <div className="empty-state">
                <i className="bi bi-send-check" aria-hidden="true" />
                <h3>Ticket sent</h3>
                <p>Support has your message and will respond shortly.</p>
                <button className="btn secondary" onClick={() => setTicketSent(false)} type="button">
                  Send another
                </button>
              </div>
            ) : (
              <form className="support-form" onSubmit={submitTicket}>
                <label className="field">
                  <span>Message</span>
                  <textarea
                    onChange={(event) => setSupportMessage(event.target.value)}
                    placeholder="Describe the issue or question"
                    required
                    rows="6"
                    value={supportMessage}
                  />
                </label>
                <button className="btn primary" type="submit">Submit ticket</button>
              </form>
            )}
          </article>
          <article className="panel">
            <div className="panel-heading"><h3>Support desk</h3></div>
            <div className="status-row"><span className="dot" /><div><strong>Avg response</strong><small>1 hour 42 minutes</small></div></div>
            <div className="status-row"><span className="dot info" /><div><strong>Email</strong><small>support@authportal.dev</small></div></div>
          </article>
        </section>
      )}
    </DashboardShell>
  );
}

export default UserDashboard;
