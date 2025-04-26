import React, { useState, useEffect } from 'react';
import userService from '../../api/userService';

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.list().then(setUsers);
  }, []);

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}