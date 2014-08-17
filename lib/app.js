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
  this.oid = "1.3.6.1.4.1.318";
}

module.exports = ups;

/**
 * Get the UPS model name (e.g. 'APC Smart-UPS 600')
 *
 * @param   function  callback
 */
ups.prototype.getModel = function(callback) {
  // Using PowerNet-MIB::upsBasicIdentModel.0
  var oid = this.oid + '.1.1.1.1.1.1.0';

  this.session.get([oid], function(err, varbinds) {
    if (err) {
      callback(err);
      return;
    }

    if (typeof varbinds[0] === "undefined") {
      callback(new Error('Unable to get model number'));
      return;
    }

    callback(null, varbinds[0].value.toString());
  });
}

/**
 * Get the current internal UPS temperature expressed in Celsius.
 *
 * @param   function  callback
 */
ups.prototype.getTemperature = function(callback) {
  // Using PowerNet-MIB::upsAdvBatteryTemperature.0
  var oid = this.oid + '.1.1.1.2.2.2.0';

  this.session.get([oid], function(err, varbinds) {
    if (err) {
      callback(err);
      return;
    }

    if (typeof varbinds[0] === "undefined") {
      callback(new Error('Unable to get temperature'));
      return;
    }

    callback(null, varbinds[0].value);
  });
}

/**
 * Get the current utility line voltage in VAC
 *
 * @param   function  callback
 */
ups.prototype.getInputVoltage = function(callback) {
  // Using PowerNet-MIB::upsAdvInputLineVoltage.0
  var oid = this.oid + '.1.1.1.3.2.1.0';

  this.session.get([oid], function(err, varbinds) {
    if (err) {
      callback(err);
      return;
    }

    if (typeof varbinds[0] === "undefined") {
      callback(new Error('Unable to get input voltage'));
      return;
    }

    callback(null, varbinds[0].value);
  });
}

/**
 * Get the current input frequency to the UPS system in Hz.
 *
 * @param   function  callback
 */
ups.prototype.getInputFrequency = function(callback) {
  // Using PowerNet-MIB::upsAdvInputFrequency.0
  var oid = this.oid + '.1.1.1.3.2.4.0';

  this.session.get([oid], function(err, varbinds) {
    if (err) {
      callback(err);
      return;
    }

    if (typeof varbinds[0] === "undefined") {
      callback(new Error('Unable to get input frequency'));
      return;
    }

    callback(null, varbinds[0].value);
  });
}

/**
 * Get the output voltage of the UPS system in VAC.
 *
 * @param   function  callback
 */
ups.prototype.getOutputVoltage = function(callback) {
  // Using PowerNet-MIB::upsAdvOutputVoltage.0
  var oid = this.oid + '.1.1.1.4.2.1.0';

  this.session.get([oid], function(err, varbinds) {
    if (err) {
      callback(err);
      return;
    }

    if (typeof varbinds[0] === "undefined") {
      callback(new Error('Unable to get output voltage'));
      return;
    }

    callback(null, varbinds[0].value);
  });
}

/**
 * Get the current output frequency to the UPS system in Hz.
 *
 * @param   function  callback
 */
ups.prototype.getOutputFrequency = function(callback) {
  // Using PowerNet-MIB::upsAdvOutputFrequency.0
  var oid = this.oid + '.1.1.1.4.2.2.0';

  this.session.get([oid], function(err, varbinds) {
    if (err) {
      callback(err);
      return;
    }

    if (typeof varbinds[0] === "undefined") {
      callback(new Error('Unable to get output frequency'));
      return;
    }

    callback(null, varbinds[0].value);
  });
}

/**
 * Get the current UPS load expressed in percent of rated capacity.
 *
 * @param   function  callback
 */
ups.prototype.getOutputLoadPercentage = function(callback) {
  // Using PowerNet-MIB::upsAdvOutputLoad.0
  var oid = this.oid + '.1.1.1.4.2.3.0';

  this.session.get([oid], function(err, varbinds) {
    if (err) {
      callback(err);
      return;
    }

    if (typeof varbinds[0] === "undefined") {
      callback(new Error('Unable to get current output load as a percentage'));
      return;
    }

    callback(null, varbinds[0].value);
  });
}

/**
 * Get the current in amperes drawn by the load on the UPS
 *
 * @param   function  callback
 */
ups.prototype.getOutputLoad = function(callback) {
  // Using PowerNet-MIB::upsAdvOutputCurrent.0
  var oid = this.oid + '.1.1.1.4.2.4.0';

  this.session.get([oid], function(err, varbinds) {
    if (err) {
      callback(err);
      return;
    }

    if (typeof varbinds[0] === "undefined") {
      callback(new Error('Unable to get current load in amps'));
      return;
    }

    callback(null, varbinds[0].value);
  });
}

/**
 * Get the remaining battery capacity expressed in percent of full capacity.
 *
 * @param   function  callback
 */
ups.prototype.getBatteryCapacity = function(callback) {
  // Using PowerNet-MIB::upsAdvBatteryCapacity.0.0
  var oid = this.oid + '.1.1.1.2.2.1.0';

  this.session.get([oid], function(err, varbinds) {
    if (err) {
      callback(err);
      return;
    }

    if (typeof varbinds[0] === "undefined") {
      callback(new Error('Unable to get current battery capacity'));
      return;
    }

    callback(null, varbinds[0].value);
  });
}