const mongoose = require('mongoose')



const connectWithRetry = async (retries=5,delay=5000) => {
    while(retries){
        try{
            await mongoose.connect("mongodb+srv://kartick:UgrUAN564IBpw0Fp@cluster0.3c8y9.mongodb.net/",{
                serverSelectionTimeoutMS: 5000, // Time to wait for connection
                socketTimeoutMS: 45000,         // Time for inactivity
                maxPoolSize: 10,                // Max number of connections in pool
                minPoolSize: 2,                 // Min connections
            })
            console.log("✅ MongoDB connected");
             // Mongoose Events If you want to monitor connection events in real-time:
             mongoose.connection.on('connected',()=>{
                console.log('✅ Mongoose event: connected');
             })
             mongoose.connection.on('error', err => {
                console.error('❌ Mongoose event: connection error', err);
              });
        
             mongoose.connection.on('disconnected', () => {
                console.warn('⚠️ Mongoose event: disconnected');
              });
              // Handle termination or To gracefully close the connection when app shuts down
            process.on('SIGINT', async () => {
                await mongoose.connection.close();
                console.log('💀 Mongoose disconnected on app termination');
                process.exit(0);
            });
            break;
        }catch(error){
             console.error(`❌ MongoDB Connection failed: ${error.message}`);
             retries--
             if (!retries) {
                console.error('💣 All retries failed. Exiting...');
                process.exit(1);
              }
              console.log(`🔁 Retrying in ${delay / 1000}s... (${retries} attempts left)`);
             await new Promise((res)=> setTimeout(res,delay))
        }
    }
   
}

module.exports = connectWithRetry

// ✅ Connection pooling
// ✅ Retry logic
// ✅ Event listeners
// ✅ Centralized error handling
// ✅ Clean separation of concerns
// ✅ automatically retry connecting to MongoDB if there's a temporary failure  (e.g., server is slow to start, internet delay, etc.).
