export const fetchUsageData = async (): Promise<any> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Fetch data from sample-data.json
  const response = await fetch('/sample-data.json');
  const data = await response.json();
  
  // Return usage data from "approachingLimit" scenario
  return data.scenarios.approachingLimit.usage;
};

export const fetchAccountData = async (): Promise<any> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Fetch data from sample-data.json
  const response = await fetch('/sample-data.json');
  const data = await response.json();
  
  // Return account data from "approachingLimit" scenario
  return data.scenarios.approachingLimit.account;
};

