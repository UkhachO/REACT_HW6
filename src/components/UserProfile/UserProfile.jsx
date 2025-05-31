import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://randomuser.me/api");
      setUser(response.data.results[0]);
    } catch (err) {
      setError("Ошибка при загрузке пользователя.");
      console.error("Ошибка:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <p className={styles.loading}>Загрузка...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.card}>
      <img src={user.picture.large} alt="User" className={styles.avatar} />
      <h2>{`${user.name.first} ${user.name.last}`}</h2>
      <p>Email: {user.email}</p>
      <p>Город: {user.location.city}</p>

      <button onClick={fetchUser} className={styles.button}>
        Далее
      </button>
    </div>
  );
};

export default UserProfile;
