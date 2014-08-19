# APC UPS SNMP 

Library for reading values of APC UPS battery via the network.


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


## Methods

Note that in the web GUI a number of values are reported with 1-2 decimal places. The SNMP implementation by APC does not support decimals.


### UPS Model number

Example of returned model number 'Smart-UPS 2200 RM'

```javascript
ups.getModel(function(err, model) {{});
```


### Internal temperature

```javascript
ups.getTemperature(function(err, temp) {});
```


### Input voltage

```javascript
ups.getInputVoltage(function(err, voltage) {});
```


### Input frequency

```javascript
ups.getInputFrequency(function(err, hz) {});
```


### Output voltage

```javascript
ups.getOutputVoltage(function(err, voltage) {});
```


### Output frequency

```javascript
ups.getOutputFrequency(function(err, hz) {});
```


### Output load percentage

```javascript
ups.getOutputLoadPercentage(function(err, percentage) {});
```


### Output in amps

```javascript
ups.getOutputLoad(function(err, amps) {});
```


### Battery capacity percentage

```javascript
ups.getBatteryCapacity(function(err, capacity) {});
```


### Battery status

```javascript
ups.getBatteryStatus(function(err, status) {});
```

The status returned will be an integer:

* 1: unknown
* 2: batteryNormal
* 3: batteryLow
* 4: batteryInFaultCondition

The translated key is available within the library as shown in the example below 
 
```javascript
console.log(ups.batteryStats[1]);
```


### Battery runtime remaining in minutes

```javascript
ups.getBatteryRunTime(function(err, minutes) {});
```


### Reason for last transfer to battery power

```javascript
ups.getLastFailCause(function(err, failCause) {});
```

The fail cause returned will be an integer:

* 1: noTransfer
* 2: highLineVoltage
* 3: brownout
* 4: blackout
* 5: smallMomentarySag
* 6: deepMomentarySag
* 7: smallMomentarySpike
* 8: largeMomentarySpike
* 9: selfTest
* 10: rateOfVoltageChange

The translated key is available within the library as shown in the example below 

```javascript
console.log(apcUps.failCause[result]);
```


### Battery replacement indicator

```javascript
ups.getBatteryReplaceIndicator(function(err, indicator) {});
```

The returned indicator will be an integer:

* 1: noBatteryNeedsReplacing
* 2: batteryNeedsReplacing

The translated key is available within the library as shown in the example below 

```javascript
console.log(apcUps.batteryIndicator[result]);
```


### Self diagnostics last run date

The date will be formatted as mm/dd/yy

```javascript
ups.getLastDiagnosticsTestDate(function(err, date) {});
```


### Self diagnostics last run result

```javascript
ups.getLastDiagnosticsTestResult(function(err, result) {});
```

The result will be an integer

* 1: ok
* 2: failed
* 3: invalidTest
* 4: testInProgress

The translated key is available within the library as shown in the example below 

```javascript
console.log(apcUps.testResult[result]);
```


## Notes

Have only implemented a few basic values to begin with, have plans for a few more just need to find some time to add these in.

All the MIBs have been hard coded into this module, for more details see the PowerNet-MIB at ftp://ftp.apc.com/apc/public/software/pnetmib/mib/411/powernet411.mib


## Licence

[The MIT License (MIT)](https://github.com/phillipsnick/apc-ups-snmp/blob/master/LICENSE)
