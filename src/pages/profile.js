import React, { useEffect, useState } from 'react';
import { userService } from '../services';
import { getCookie } from '../utils/cookie';

const Profile = () => {
  const [name, setName] = useState('');
  const [userDataLoading, setUserDataLoading] = useState(false);

  const userId = JSON.parse(getCookie('userData')).id;

  useEffect(() => {
    setUserDataLoading(true);
    userService
      .getUserById(userId)
      .then((res) => {
        setName(res.username);
      })
      .catch((err) => {
        return console.log(err);
      })
      .finally(() => {
        setUserDataLoading(false);
      });
  }, [userId]);

  return (
    <div>
      <h1> My Profile!</h1>
      {userDataLoading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <p>{`name : ${name}`}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
