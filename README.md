# This is part of a course on Hyperledger Fabric
# http://ACloudFan.com

# NOTE:May 13-2018: Composer 0.19.3 and above are breaking the code due to incompatibility
# with latest version of grpc (0.11.1) I have hardcoded the version of grpc
# to (0.10.1) ... will fix once the issue has been resolved by the developers

# NOTE: Composer 0.19.0 have introduced breaking changes. 
# April 2018 : I am in the process of updating code 
#              If you see an issue please send me a note raj at ACloudFan.com
#              Files that have been updated/tested for 0.19.0 has a comment ontop

How to use this?
Most of the files may be executed against a local fabric insallation.
Some samples are coded to work with embedded runtime.
Lectures in the course refer to the samples and describe how to launch the samples

0. Install    > npm install
1. Launch your local fabric runtime
2. Deploy the App against which you would like to test the API (airlinev7 by default)
       1.   > composer network start -a .\airlinev7@0.0.1.bna -c PeerAdmin@hlfv1 -A admin -S adminpw
       2.   > composer network start -a .\airlinev7@0.0.1.bna -c PeerAdmin@hlfv1 -A admin -S adminpw
       3.   > composer card delete admin@airlinev7
       4.   > composer card import -f ./admin@airlinev7.card
3. Samples are using airlinev7. If you would like to use some other you need to change the code
4. On terminal prompt   >  node code-sample-file.js
