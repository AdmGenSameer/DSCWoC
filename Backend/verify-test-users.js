import mongoose from 'mongoose';
import User from './src/models/User.model.js';

mongoose.connect('mongodb://localhost:27017/dscwoc').then(async () => {
  const testUsers = await User.find({ 
    email: { $in: ['test.contributor@example.com', 'test.admin@example.com'] } 
  }).lean();
  
  console.log('\n🧪 Test Users Ready for ID Card Testing\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  testUsers.forEach((u, i) => {
    console.log(`\nTest User ${i+1}:`);
    console.log(`  Name: ${u.fullName}`);
    console.log(`  Email: ${u.email}`);
    console.log(`  GitHub: ${u.github_username}`);
    console.log(`  Role: ${u.role}`);
    console.log(`  ID Generations Used: ${u.idGeneratedCount || 0}/2`);
  });

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n✅ Ready to Test!\n');

  mongoose.disconnect();
}).catch(e => console.error(e));
