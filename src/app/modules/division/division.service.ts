// division.service.js
import { Division } from "./division.model";

const getAllDivisions = async () => {
  const divisions = await Division.find();
  return divisions;
};

export const divisionService = { getAllDivisions };
