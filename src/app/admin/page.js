import Link from 'next/link';

export default function AdminHome() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      <p>Use the links below to manage the system.</p>
      <ul>
        <li>
          <Link href="/admin/candidates">Search Candidates</Link>
        </li>
        <li>
          <Link href="/admin/invite">Send Invitations</Link>
        </li>
      </ul>
    </div>
  );
}
