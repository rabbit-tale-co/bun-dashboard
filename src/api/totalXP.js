const fetchTotalXPData = async () => {
   const response = await fetch('https://api.rabbittale.co/api/leaderboard/totalXp'); // Adjust the URL as necessary
   if (!response.ok) {
     throw new Error('Failed to fetch total XP');
   }
   const data = await response.json();
   return data.totalXp;
 };
 
 export { fetchTotalXPData };
 