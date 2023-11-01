import { useSelector } from "react-redux";

const useAuthData = () => {
  const authData = useSelector((state) => state.local.userReducer.userData);

  return authData;
};

export default useAuthData;
