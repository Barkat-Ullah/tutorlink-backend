import { District } from "./zilla.model";


const getAllDistricts = async () => {
  const districts = await District.find();
  return districts;
};

export const districtService = {  getAllDistricts};
