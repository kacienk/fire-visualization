// has number
const hasNumber = (val: string) => new RegExp(/[0-9]/).test(val);

// has mix of small and capitals
const hasMixed = (val: string) => new RegExp(/[a-z]/).test(val) && new RegExp(/[A-Z]/).test(val);

// has special chars
const hasSpecial = (val: string) => new RegExp(/[!#@$%^&*)(+=._-]/).test(val);

// set color based on password strength
export const strengthColor = (count: number) => {
  if (count < 2) return { label: 'Poor', color: 'error.main' };
  if (count < 3) return { label: 'Weak', color: 'warning.main' };
  if (count < 4) return { label: 'Normal', color: 'warning.dark' };
  if (count < 5) return { label: 'Good', color: 'success.main' };
  if (count < 6) return { label: 'Strong', color: 'success.dark' };
  return { label: 'Poor', color: 'error.main' };
};

// password strength indicator
export const strengthIndicator = (val: string) => {
  let strengths = 0;
  if (val.length > 5) strengths += 1;
  if (val.length > 7) strengths += 1;
  if (hasNumber(val)) strengths += 1;
  if (hasSpecial(val)) strengths += 1;
  if (hasMixed(val)) strengths += 1;
  return strengths;
};
