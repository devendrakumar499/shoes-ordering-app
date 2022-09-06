import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClothSection } from "../../components/home/ClothSection";
import { ShoeSection } from "../../components/home/ShoeSection";
import { Error } from "../../components/loading/Error";
import { Loading } from "../../components/loading/Loading";
import { getClothData, getShoeData } from "../../redux/features/home/actions";
import { setNavbarPath } from "../../redux/features/path/actions";
import { setItemSession } from "../../utils/sessionStorage";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, clothData, shoeData } = useSelector(
    (state) => state.homeReducer
  );

  const handleSection = (gender) => {
    dispatch(setNavbarPath(gender));
    setItemSession("path", gender);
    navigate(`/${gender}`);
  };

  useEffect(() => {
    dispatch(getClothData());
    dispatch(getShoeData());
  }, [dispatch]);

  return loading ? (
    <Loading />
  ) : error ? (
    <Error />
  ) : (
    <>
      {shoeData?.map((data, index) => (
        <ShoeSection handleSection={handleSection} key={index} {...data} />
      ))}

      {clothData?.map((data, index) => (
        <ClothSection handleSection={handleSection} key={index} {...data} />
      ))}
    </>
  );
};
