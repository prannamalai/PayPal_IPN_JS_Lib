/**
 * Library for PayPal IPN with node.js
 * 
 * Depends on node.js fs, querystring and underscore.js
 * 
 */
var fs = require('fs');
var qs = require('querystring');
var _ = require('./underscore');

/*
 * TODO Remove the following variable when the Initial Version is ready
 * Test String for Unit Testing
 */

var sampleQueryString = 'mc_gross[1]=19.95&mc_gross=19.95&protection_eligibility=Eligible&address_status=confirmed&payer_id=LPLWNMTBWMFAY&tax=0.00&address_street=1+Main+St&payment_date=20%3A12%3A59+Jan+13%2C+2009+PST&payment_status=Completed&charset=windows-1252&address_zip=95131&first_name=Test&mc_fee=0.88&address_country_code=US&address_name=Test+User&notify_version=2.6&custom=&payer_status=verified&address_country=United+States&address_city=San+Jose&quantity=1&verify_sign=AtkOfCXbDm2hu0ZELryHFjY-Vb7PAUvS6nMXgysbElEn9v-1XcmSoGtf&payer_email=gpmac_1231902590_per%40paypal.com&txn_id=61E67681CH3238416&payment_type=instant&last_name=User&address_state=CA&receiver_email=gpmac_1231902686_biz%40paypal.com&payment_fee=0.88&receiver_id=S8XGHLYDW9T3S&txn_type=express_checkout&item_name=&mc_currency=USD&item_number=&residence_country=US&test_ipn=1&handling_amount=0.00&transaction_subject=&payment_gross=19.95&shipping=0.00';

/*
 * The below var should be ideally retrieved from the node.js 
 * http / https module response object
 */

var param = qs.parse(sampleQueryString);

/*
 * Load the parameters JSON file from file system
 * The above file has comma separated list of allowed parameters for 
 * each of the type like payer, transaction, merchant etc.,   
 */

var configJSON = fs.readFileSync("params.json");
var params = JSON.parse(configJSON.toString());

var queryParamValue = "";

var ipnMessage = new IPNMessage();

_.keys(ipnMessage).map(function(key) {
	if (_.has(params, key)) {
		_.chain(params).pick(params, key).values().map(function(str) {
			var parameters = str.split(",");
			_.map(parameters, function(propValue) {
				queryParamValue = param[propValue];
				if (typeof queryParamValue === "undefined") {
					queryParamValue = null;
				}
				ipnMessage[key][propValue] = queryParamValue;

			});
		});
		console.log(_.pick(ipnMessage, key));
	}
});

// console.log(merchant instanceof Merchant);

function IPNMessage() {
	this.merchant = new Merchant();
	this.payer = new Payer();
	this.transaction = new Transaction();
};

function Merchant() {
	// Empty
};

function Payer() {
	// Empty
};

function Transaction() {
	// Empty
};

