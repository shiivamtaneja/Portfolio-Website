const calculateDateOfBirth = (dob: string) => {
  const today = new Date();
  const birthday = new Date(dob);

  let age = today.getFullYear() - birthday.getFullYear();

  const monthDiff = today.getMonth() - birthday.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }

  return age;
};

export default calculateDateOfBirth;