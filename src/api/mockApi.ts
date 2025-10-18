const mockScenario = "atProfessionalLimit" 

export const fetchUsageData = async (): Promise<any> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Fetch data from sample-data.json
  const response = await fetch('/sample-data.json');
  const data = await response.json();
  
  // Return usage data from specific scenario
  return data.scenarios[mockScenario].usage;
};

export const fetchAccountData = async (): Promise<any> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Fetch data from sample-data.json
  const response = await fetch('/sample-data.json');
  const data = await response.json();

  // Return account data from specific scenario
  return data.scenarios[mockScenario].account;
};

