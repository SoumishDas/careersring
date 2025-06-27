export default function AdminHome() {
  return (
    <div style={{padding: '2rem'}}>
      <h1>Admin Dashboard</h1>
      <p>Use the links below to manage the system.</p>
      <ul>
        <li><a href="/admin/candidates">Search Candidates</a></li>
        <li><a href="/admin/invite">Send Invitations</a></li>
      </ul>
    </div>
  );
}
