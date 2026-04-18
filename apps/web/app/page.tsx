import { prismaClient, type User } from "db/client";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function Home() {
  const users: User[] = await prismaClient.user.findMany({
    orderBy: { username: "asc" },
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.heading}>Users</h1>
        {users.length === 0 ? (
          <p>No users yet.</p>
        ) : (
          <ul className={styles.userList}>
            {users.map((user) => (
              <li key={user.id}>
                <span className={styles.userName}>{user.username}</span>
                <span className={styles.userId}>{user.id}</span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}


