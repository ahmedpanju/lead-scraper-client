const getColorOfQualityText = (quality) => {
  if (quality <= 30) {
    return "red";
  }
  if (quality > 30 && quality <= 70) {
    return "orange";
  }
  return "green";
};

export default getColorOfQualityText;
