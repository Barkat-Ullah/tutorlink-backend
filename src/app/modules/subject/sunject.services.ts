import { Subject } from "./subject.model";

const getAllSubjects = async () => {
  const subject = await Subject.find();
  return subject;
};

export const subjectService = { getAllSubjects };
