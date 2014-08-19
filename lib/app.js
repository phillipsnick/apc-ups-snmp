var snmp = require('net-snmp');

/**
 * Create the SNMP session
 *
 * @param   object  options
 */
function ups(options) {
  this.options = options;

  if (typeof options.host === "undefined") {
    throw "Please define a host";
  }

  this.session = snmp.createSession(this.options.host, "private", {
    version: snmp.Version1,
    timeout: 1000
  });

  // beginning of all oid's
  this.oid = "1.3.6.1.4.1.318.";
}

module.exports = ups;

/**
 * Battery status' int to string
 */
ups.batteryStatus = {
  1: 'unknown',
  2: 'batteryNormal',
  3: 'batteryLow',
  4: 'batteryInFaultCondition'
}

/**
 * Reasons for last fail cause
 */
ups.failCause = {
  1: 'noTransfer',
  2: 'highLineVoltage',
  3: 'brownout',
  4: 'blackout',
  5: 'smallMomentarySag',
  6: 'deepMomentarySag',
  7: 'smallMomentarySpike',
  8: 'largeMomentarySpike',
  9: 'selfTest',
  10: 'rateOfVoltageChange'
}

/**
 * Battery indicator
 */
ups.batteryIndicator = {
  1: 'noBatteryNeedsReplacing',
  2: 'batteryNeedsReplacing'
}

/**
 * Diagnostics test results
 */
ups.testResult = {
  1: 'ok',
  2: 'failed',
  3: 'invalidTest',
  4: 'testInProgress'
}

/**
 * Get single parameter by oid
 *
 * @param   string    oid
 * @param   function  callback
 * @param   string    errorStr
 */
ups.prototype.getByOid = function(oid, callback, errStr) {
  oid = this.oid + oid;

  this.session.get([oid], function(err, varbinds) {
    if (err) {
      callback(err);
      return;
    }

    if (typeof varbinds[0] === "undefined") {
      if (typeof errStr === "undefined") {
        errStr = new Error('Invalid response from SNMP');
      }

      callback(errStr);
      return;
    }

    callback(null, varbinds[0].value.toString());
  });
}

/**
 * Get the UPS model name (e.g. 'APC Smart-UPS 600')
 *
 * @param   function  callback
 */
ups.prototype.getModel = function(callback) {
  // Using PowerNet-MIB::upsBasicIdentModel.0
  this.getByOid('1.1.1.1.1.1.0', callback, 'Unable to get model number');
}

/**
 * Get the current internal UPS temperature expressed in Celsius.
 *
 * @param   function  callback
 */
ups.prototype.getTemperature = function(callback) {
  // Using PowerNet-MIB::upsAdvBatteryTemperature.0
  this.getByOid('1.1.1.2.2.2.0', callback, 'Unable to get temperature');
}

/**
 * Get the current utility line voltage in VAC
 *
 * @param   function  callback
 */
ups.prototype.getInputVoltage = function(callback) {
  // Using PowerNet-MIB::upsAdvInputLineVoltage.0
  this.getByOid('1.1.1.3.2.1.0', callback, 'Unable to get input voltage');
}

/**
 * Get the current input frequency to the UPS system in Hz.
 *
 * @param   function  callback
 */
ups.prototype.getInputFrequency = function(callback) {
  // Using PowerNet-MIB::upsAdvInputFrequency.0
  this.getByOid('1.1.1.3.2.4.0', callback, 'Unable to get input frequency');
}

/**
 * Get the output voltage of the UPS system in VAC.
 *
 * @param   function  callback
 */
ups.prototype.getOutputVoltage = function(callback) {
  // Using PowerNet-MIB::upsAdvOutputVoltage.0
  this.getByOid('1.1.1.4.2.1.0', callback, 'Unable to get output voltage');
}

/**
 * Get the current output frequency to the UPS system in Hz.
 *
 * @param   function  callback
 */
ups.prototype.getOutputFrequency = function(callback) {
  // Using PowerNet-MIB::upsAdvOutputFrequency.0
  this.getByOid('1.1.1.4.2.2.0', callback, 'Unable to get output frequency');
}

/**
 * Get the current UPS load expressed in percent of rated capacity.
 *
 * @param   function  callback
 */
ups.prototype.getOutputLoadPercentage = function(callback) {
  // Using PowerNet-MIB::upsAdvOutputLoad.0
  this.getByOid('1.1.1.4.2.3.0', callback, 'Unable to get current output load as a percentage');
}

/**
 * Get the current in amperes drawn by the load on the UPS
 *
 * @param   function  callback
 */
ups.prototype.getOutputLoad = function(callback) {
  // Using PowerNet-MIB::upsAdvOutputCurrent.0
  this.getByOid('1.1.1.4.2.4.0', callback, 'Unable to get current load in amps');
}

/**
 * Get the remaining battery capacity expressed in percent of full capacity.
 *
 * @param   function  callback
 */
ups.prototype.getBatteryCapacity = function(callback) {
  // Using PowerNet-MIB::upsAdvBatteryCapacity.0.0
  this.getByOid('1.1.1.2.2.1.0', callback, 'Unable to get current battery capacity');
}

/**
 * Get the UPS battery status
 *
 * The status of the UPS batteries. A batteryLow(3) value
 * indicates the UPS will be unable to sustain the current
 * load, and its services will be lost if power is not restored.
 * The amount of run time in reserve at the time of low battery
 * can be configured by the upsAdvConfigLowBatteryRunTime.
 * A batteryInFaultCondition(4)value indicates that a battery
 * installed has an internal error condition."
 */
ups.prototype.getBatteryStatus = function(callback) {
  // Using PowerNet-MIB::upsBasicBatteryStatus.0
  this.getByOid('1.1.1.2.1.1.0', callback, 'Unable to get battery status');
}

/**
 * Get the UPS battery run time remaining before battery exhaustion (in minutes)
 */
ups.prototype.getBatteryRunTime = function(callback) {
  // Using PowerNet-MIB::upsAdvBatteryRunTimeRemaining.0
  oid = this.oid + '1.1.1.2.2.3.0';

  this.session.get([oid], function(err, varbinds) {
    if (err) {
      callback(err);
      return;
    }

    if (typeof varbinds[0] === "undefined") {
      callback(new Error('Unable to get battery run time'));
      return;
    }

    var timeticks = varbinds[0].value;
    var minutes = timeticks / 6000;

    callback(null, minutes);
  });
}

/**
 * The reason for the occurrence of the last transfer to UPS battery power.
 */
ups.prototype.getLastFailCause = function(callback) {
  // Using PowerNet-MIB::upsAdvInputLineFailCause.0
  this.getByOid('1.1.1.3.2.5.0', callback, 'Unable to get last fail cause');
}

/**
 * Indicates whether the UPS batteries need replacing.
 */
ups.prototype.getBatteryReplaceIndicator = function(callback) {
  // Using PowerNet-MIB::upsAdvBatteryReplaceIndicator.0
  this.getByOid('1.1.1.2.2.4.0', callback, 'Unable to get battery status');
};

/**
 * Get the date the last UPS diagnostics test was performed in mm/dd/yy format.
 */
ups.prototype.getLastDiagnosticsTestDate = function(callback) {
  // Using PowerNet-MIB::upsAdvTestLastDiagnosticsDate.0
  this.getByOid('1.1.1.7.2.4.0', callback, 'Unable to get last diagnostics test date');
}

/**
 * Get the results of the last UPS diagnostics test performed
 */
ups.prototype.getLastDiagnosticsTestResult = function(callback) {
  // Using PowerNet-MIB::upsAdvTestDiagnosticsResults.0
  this.getByOid('1.1.1.7.2.3.0', callback, 'Unable to get last diagnostics test result');
}

/**
 * Get the SNMP session as created by net-snmp library
 */
ups.prototype.getSnmpSession = function() {
  return this.session;
}

/**
 * Close the SNMP session as provided by net-snmp library
 */
ups.prototype.close = function() {
  this.session.close();
}