import Link from "next/link";
import css from "./ProfilePage.module.css"
import { getServerMe } from "@/lib/api/serverApi";

export default async function ProfilePage() {
  try {
    const user = await getServerMe();

    return (
      <section>
        <div>
          <h1>My Profile</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
  Edit profile
</Link>
        </div>
        <div>
          <p>Name: {user.username ?? user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      </section>
    );
  } catch {
    return <div>Please log in to view profile</div>;
  }
}