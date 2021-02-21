import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { UserContext, signout } from "./UserProvider";

export function UserStatus() {
  const { user, profile } = useContext(UserContext);
  console.log("UserStatus::user", user);
  console.log("UserStatus::profile", profile);

  const handleClick = async (e) => {
    await signout();
  };

  return (
    <div>
      {user && profile && profile.fname && (
        <>
          <span>Hello {profile.fname}!</span>
          <Button variant="info" className="ml-2" onClick={handleClick}>
            Sign out
          </Button>
        </>
      )}
    </div>
  );
}

export default UserStatus;
