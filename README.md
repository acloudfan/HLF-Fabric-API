# This is part of a course on Hyperledger Fabric
# http://ACloudFan.com

# NOTE:  December 21, 2018

# 0.20.3 introduced changes that led to issues for some students
# All issues stand resolved at this time.

# Code has been tested with 0.20.5
# Please update your composer components to v0.20.5

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
