# APC UPS SNMP 

Library for reading values of APC UPS battery via the network


## Installation

```
npm install apc-ups-snmp --save
```


## Usage

```javascript
var apcUps = require('apc-ups-snmp');

var ups = new apcUps({
  host: 'IP Address/Hostname'
});
```

A full range of examples can be found within the [examples directory](https://github.com/phillipsnick/apc-ups-snmp/tree/master/examples)


## Notes

Have only implemented a few basic values to begin with, have plans for a few more just need to find some time to add these in.

All the MIBs have been hard coded into this module, for more details see the PowerNet-MIB at ftp://ftp.apc.com/apc/public/software/pnetmib/mib/411/powernet411.mib


## Licence

[The MIT License (MIT)](https://github.com/phillipsnick/apc-ups-snmp/blob/master/LICENCE)
