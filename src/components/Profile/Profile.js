import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/users/userSlice";

import style from "../../styles/Profile.module.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
    avatar: "",
  });
  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(values));
  };

  useEffect(() => {
    if (!currentUser.username) return;
    setValues({ ...currentUser, password: "" });
  }, [currentUser]);

  return (
    <section className={style.section}>
      {!currentUser.username ? (
        <span>You need to log in</span>
      ) : (
        <form className={style.userForm} onSubmit={onSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={values.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={values.username}
            onChange={handleChange}
          />
          <input
            type="text"
            name="avatar"
            placeholder="Avatar"
            required
            value={values.avatar}
            onChange={handleChange}
          />

          <button style={{ marginTop: 40 }}>Update an account</button>
        </form>
      )}
    </section>
  );
};

export default Profile;
