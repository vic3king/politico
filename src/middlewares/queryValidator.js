const validCandidateQueryString = (query) => {
  let valid = true;
  const searchableCandidateField = ['approved', 'pending', 'rejected'];

  Object.values(query).forEach((item) => {
    if (!searchableCandidateField.includes(item)) {
      valid = false;
    }
  });

  return valid;
};

export default validCandidateQueryString;
