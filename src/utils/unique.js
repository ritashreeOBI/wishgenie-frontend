

export function generateUniqueID() {
    // Generate a timestamp to ensure uniqueness
    const timestamp = new Date().getTime();
  
    // Generate a random number to further ensure uniqueness
    const random = Math.floor(Math.random()/Math.random() * 1000000);
  
    // Combine the timestamp and random number to create a unique ID
    const uniqueID = `${timestamp}${random}`;
  
    return uniqueID;
  }
  

  